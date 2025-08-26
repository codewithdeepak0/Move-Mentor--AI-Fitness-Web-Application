const mongoose = require("mongoose");

const WorkoutSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    workoutName: {
      type: String,
      required: true,
      unique: false, // Ensure that this field is not unique
      index: false,  // Do not index the field if no uniqueness is required
    },
    sets: {
      type: Number,
    },
    reps: {
      type: Number,
    },
    weight: {
      type: Number,
    },
    duration: {
      type: Number,
    },
    caloriesBurned: {
      type: Number,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    // New fields for Streak feature
    currentStreak: {
      type: Number,
      default: 0,
    },
    lastWorkoutDate: {
      type: Date,
    },
    highestStreak: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Workout", WorkoutSchema);
