const mongoose = require("mongoose");

const TutorialSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String, // URL to the image
    required: true,
  },
  content: {
    type: String, // Detailed tutorial content
    required: true,
  },
  category: {
    type: String, // Category of the tutorial
    required: true,
  },
  difficulty: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced"], // Restrict to specific values
    required: true,
  },
  duration: {
    type: Number, // Number is appropriate for minutes
    required: true,
    min: 1, // Minimum duration must be 1 minute
  },
}, { timestamps: true });

const Tutorial = mongoose.model("Tutorial", TutorialSchema);

module.exports = Tutorial;
