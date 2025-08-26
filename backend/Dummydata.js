const mongoose = require("mongoose");
const Tutorial = require("./models/Tutorial"); // Adjust the path if needed
const User =  require("./models/UserModel");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const dummyTutorials = [
  {
    title: "Beginner Yoga Poses",
    author: "John Doe",
    description: "Learn the basics of yoga with these beginner poses.",
    image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...", // Replace with actual Base64 image
    content: "Step-by-step guide for beginner yoga poses.",
    category: "Yoga",
    difficulty: "Beginner",
    duration: 20,
  },
  {
    title: "Advanced Yoga Techniques",
    author: "Jane Smith",
    description: "Master advanced yoga techniques to deepen your practice.",
    image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...",
    content: "Advanced yoga poses and breathing exercises.",
    category: "Yoga",
    difficulty: "Advanced",
    duration: 45,
  },
  {
    title: "Cardio Blast Workout",
    author: "Emily Johnson",
    description: "Burn calories quickly with this cardio-focused workout.",
    image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...",
    content: "High-intensity interval training for cardio.",
    category: "Cardio",
    difficulty: "Intermediate",
    duration: 30,
  },
  {
    title: "Meditation for Stress Relief",
    author: "Michael Lee",
    description: "Relax and clear your mind with guided meditation.",
    image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...",
    content: "Breathing techniques and mindfulness practices.",
    category: "Meditation",
    difficulty: "Beginner",
    duration: 15,
  },
  {
    title: "HIIT Workout Plan",
    author: "David Miller",
    description: "Intense workouts for maximum calorie burn.",
    image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...",
    content: "Intervals of high-intensity and rest periods.",
    category: "HIIT",
    difficulty: "Intermediate",
    duration: 25,
  },
  {
    title: "Strength Training Basics",
    author: "Olivia Brown",
    description: "Build strength with foundational exercises.",
    image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...",
    content: "Learn basic strength training routines.",
    category: "Strength Training",
    difficulty: "Beginner",
    duration: 40,
  },
  {
    title: "Pilates for Core Strength",
    author: "Sophia Green",
    description: "Enhance your core strength with pilates routines.",
    image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...",
    content: "Pilates exercises to strengthen core muscles.",
    category: "Pilates",
    difficulty: "Intermediate",
    duration: 35,
  },
  {
    title: "Full Body Stretching Routine",
    author: "Daniel White",
    description: "Improve flexibility with this stretching guide.",
    image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...",
    content: "Stretching exercises for all muscle groups.",
    category: "Flexibility",
    difficulty: "Beginner",
    duration: 15,
  },
  {
    title: "Powerlifting Essentials",
    author: "Liam Black",
    description: "Learn the techniques for powerlifting exercises.",
    image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...",
    content: "Guidelines for squats, deadlifts, and bench press.",
    category: "Strength Training",
    difficulty: "Advanced",
    duration: 50,
  },
  {
    title: "Outdoor Bootcamp Workout",
    author: "Ella Brown",
    description: "Train outdoors with this full-body workout plan.",
    image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...",
    content: "Circuit-based exercises for strength and cardio.",
    category: "Bootcamp",
    difficulty: "Intermediate",
    duration: 40,
  },
  {
    title: "Swimming Techniques for Beginners",
    author: "Noah Wilson",
    description: "Learn swimming basics to improve your skills.",
    image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...",
    content: "Step-by-step guide to freestyle and backstroke.",
    category: "Swimming",
    difficulty: "Beginner",
    duration: 30,
  }
];

const seedDB = async () => {
  try {
    await Tutorial.deleteMany();
    await Tutorial.insertMany(dummyTutorials);
    await User.deleteMany();
    console.log("Dummy tutorials added successfully!");
    await Tutorial.deleteMany();
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.disconnect();
  }
};

seedDB();
