const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { createError } = require("../error.js");
const User = require("../models/UserModel.js");
const Workout = require("../models/Workout.js");

dotenv.config();

const UserRegister = async (req, res, next) => {
  try {
    const { email, password, name, img } = req.body;

    // Check if the email is in use
    const existingUser = await User.findOne({ email }).exec();
    if (existingUser) {
      return next(createError(409, "Email is already in use."));
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      img,
    });
    const createdUser = await user.save();
    const token = jwt.sign({ id: createdUser._id }, process.env.JWT, {
      expiresIn: "60m",
    });
    
    console.log("this is the token in backend " + token);
    return res.status(200).json({ token, user });
  } catch (error) {
    return next(error);
  }
};

const UserLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
      return next(createError(404, "User not found"));
    }

    const isPasswordCorrect = bcrypt.compareSync(password, user.password);
    if (!isPasswordCorrect) {
      return next(createError(403, "Incorrect password"));
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT, {
      expiresIn: "7days",
    });

    
    console.log("this is the token in login at  backend :" , token )

    return res.status(200).json({ token, user });
  } catch (error) {
    return next(error);
  }
};

const getUserDashboard = async (req, res, next) => {
  try {
    const userId = req.user && req.user.id;
    const user = await User.findById(userId);
    if (!user) {
      return next(createError(404, "User not found"));
    }

    const currentDateFormatted = new Date();
    const startToday = new Date(
      currentDateFormatted.getFullYear(),
      currentDateFormatted.getMonth(),
      currentDateFormatted.getDate()
    );
    const endToday = new Date(
      currentDateFormatted.getFullYear(),
      currentDateFormatted.getMonth(),
      currentDateFormatted.getDate() + 1
    );

    const totalCaloriesBurnt = await Workout.aggregate([
      { $match: { user: user._id, date: { $gte: startToday, $lt: endToday } } },
      {
        $group: {
          _id: null,
          totalCaloriesBurnt: { $sum: "$caloriesBurned" },
        },
      },
    ]);

    const totalWorkouts = await Workout.countDocuments({
      user: userId,
      date: { $gte: startToday, $lt: endToday },
    });

    const avgCaloriesBurntPerWorkout =
      totalCaloriesBurnt.length > 0
        ? totalCaloriesBurnt[0].totalCaloriesBurnt / totalWorkouts
        : 0;

    const categoryCalories = await Workout.aggregate([
      { $match: { user: user._id, date: { $gte: startToday, $lt: endToday } } },
      {
        $group: {
          _id: "$category",
          totalCaloriesBurnt: { $sum: "$caloriesBurned" },
        },
      },
    ]);

    const pieChartData = categoryCalories.map((category, index) => ({
      id: index,
      value: category.totalCaloriesBurnt,
      label: category._id,
    }));

    const weeks = [];
    const caloriesBurnt = [];
    let streak = 0;
    let lastWorkoutDate = null;

    for (let i = 6; i >= 0; i--) {
      const date = new Date(
        currentDateFormatted.getTime() - i * 24 * 60 * 60 * 1000
      );
      weeks.push(`${date.getDate()}th`);

      const startOfDay = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
      );
      const endOfDay = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() + 1
      );

      const weekData = await Workout.aggregate([
        {
          $match: {
            user: user._id,
            date: { $gte: startOfDay, $lt: endOfDay },
          },
        },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
            totalCaloriesBurnt: { $sum: "$caloriesBurned" },
          },
        },
        { $sort: { _id: 1 } },
      ]);

      caloriesBurnt.push(
        weekData[0]?.totalCaloriesBurnt ? weekData[0]?.totalCaloriesBurnt : 0
      );

      // Update streak logic
      if (weekData.length > 0) {
        if (
          lastWorkoutDate === null ||
          (lastWorkoutDate &&
            startOfDay.getTime() - lastWorkoutDate.getTime() ===
              24 * 60 * 60 * 1000)
        ) {
          streak++;
        }
        lastWorkoutDate = startOfDay;
      }
    }

    return res.status(200).json({
      totalCaloriesBurnt:
        totalCaloriesBurnt.length > 0
          ? totalCaloriesBurnt[0].totalCaloriesBurnt
          : 0,
      totalWorkouts,
      avgCaloriesBurntPerWorkout,
      totalWeeksCaloriesBurnt: {
        weeks,
        caloriesBurned: caloriesBurnt,
      },
      streak, // Return streak information
      pieChartData,
    });
  } catch (err) {
    next(err);
  }
};

const getWorkoutsByDate = async (req, res, next) => {
  try {
    const userId = req.user && req.user.id;
    const user = await User.findById(userId);
    let date = req.query.date ? new Date(req.query.date) : new Date();
    if (!user) {
      return next(createError(404, "User not found"));
    }
    const startOfDay = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
    const endOfDay = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + 1
    );

    const todaysWorkouts = await Workout.find({
      user: userId, // Ensure consistency here
      date: { $gte: startOfDay, $lt: endOfDay },
    });
    const totalCaloriesBurnt = todaysWorkouts.reduce(
      (total, workout) => total + workout.caloriesBurned,
      0
    );
    console.log("todays workout", todaysWorkouts);
    console.log(totalCaloriesBurnt);
    return res.status(200).json({ todaysWorkouts, totalCaloriesBurnt });
  } catch (err) {
    next(err);
  }
};


const addWorkout = async (req, res, next) => {
  try {
    const userId = req.user && req.user.id;
    const { workoutString } = req.body;
    if (!workoutString) {
      return next(createError(400, "Workout string is missing"));
    }

    const eachworkout = workoutString.split(";").map((line) => line.trim());
    const categories = eachworkout.filter((line) => line.startsWith("#"));
    if (categories.length === 0) {
      return next(createError(400, "No categories found in workout string"));
    }

    const parsedWorkouts = [];
    let currentCategory = "";
    let count = 0;

    eachworkout.forEach((line) => {
      count++;
      if (line.startsWith("#")) {
        const parts = line.split("\n").map((part) => part.trim());
        if (parts.length < 5) {
          return next(
            createError(400, `Workout string is missing for ${count}th workout`)
          );
        }

        currentCategory = parts[0].substring(1).trim();
        const workoutDetails = parseWorkoutLine(parts);
        if (workoutDetails == null) {
          return next(createError(400, "Please enter in proper format "));
        }

        if (workoutDetails) {
          workoutDetails.category = currentCategory;
          parsedWorkouts.push(workoutDetails);
        }
      } else {
        return next(
          createError(400, `Workout string is missing for ${count}th workout`)
        );
      }
    });

    parsedWorkouts.forEach(async (workout) => {
      workout.caloriesBurned = parseFloat(calculateCaloriesBurnt(workout));
      await Workout.create({ ...workout, user: userId });
    });

    // Update streak after adding a workout
    const today = new Date();
    const startToday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    const endToday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 1
    );

    const todayWorkouts = await Workout.find({
      user: userId,
      date: { $gte: startToday, $lt: endToday },
    });

    if (todayWorkouts.length > 0) {
      let user = await User.findById(userId);
      if (user) {
        const lastWorkoutDate = user.lastWorkoutDate || null;
        const streak = user.streak || 0;

        if (
          lastWorkoutDate &&
          new Date(lastWorkoutDate).getTime() + 24 * 60 * 60 * 1000 ===
            startToday.getTime()
        ) {
          user.streak = streak + 1;
        } else {
          user.streak = 1;
        }

        user.lastWorkoutDate = startToday;
        await user.save();
      }
    }

    return res.status(201).json({
      message: "Workouts added successfully",
      workouts: parsedWorkouts,
    });
  } catch (err) {
    next(err);
  }
};

const parseWorkoutLine = (parts) => {
  const details = {};
  if (parts.length >= 5) {
    details.workoutName = parts[1].substring(1).trim();
    details.sets = parseInt(parts[2].split("sets")[0].substring(1).trim());
    details.reps = parseInt(
      parts[2].split("sets")[1].split("reps")[0].substring(1).trim()
    );
    details.weight = parseFloat(parts[3].split("weight")[0].trim());
    details.time = parseFloat(parts[4].split("time")[0].trim());
  }
  return details;
};

const calculateCaloriesBurnt = (workout) => {
  return (
    (workout.sets + workout.reps + workout.weight + workout.time) *
    1.5 // You can adjust the calorie burn rate as needed
  );
};

module.exports = {
  UserRegister,
  UserLogin,
  addWorkout,
  getWorkoutsByDate,
  getUserDashboard,
};
