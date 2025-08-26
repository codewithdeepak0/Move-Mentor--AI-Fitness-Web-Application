const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Tutorial = require("./models/Tutorial");

dotenv.config();

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Dummy tutorial data
const dummyTutorials = [
  {
    title: "Mental Health and Fitness: A Holistic Approach",
    author: "John Doe",
    description: "Learn how to balance mental health and physical fitness for a better life.",
    content: "In this tutorial, we explore the relationship between mental health and physical fitness...",
    category: "Mental Health",
    image: "https://res.cloudinary.com/demo/image/upload/v1699999999/tutorial1.jpg", // Replace with actual Cloudinary demo/test URL
  },
  {
    title: "The Ultimate Guide to Nutrition for Fitness",
    author: "Jane Smith",
    description: "Discover the essential nutrients to fuel your workouts and improve performance.",
    content: "This guide covers the basics of nutrition, including protein, carbs, and fats...",
    category: "Nutrition",
    image: "https://res.cloudinary.com/demo/image/upload/v1699999999/tutorial2.jpg", // Replace with actual Cloudinary demo/test URL
  },
  {
    title: "How to Build Your First Workout Plan",
    author: "Chris Evans",
    description: "A step-by-step guide to creating an effective workout plan for beginners.",
    content: "Starting a workout routine can be intimidating, but this guide makes it simple...",
    category: "Workout",
    image: "https://res.cloudinary.com/demo/image/upload/v1699999999/tutorial3.jpg", // Replace with actual Cloudinary demo/test URL
  },
  {
    title: "Top 5 Stretching Exercises to Improve Flexibility",
    author: "Emily Johnson",
    description: "Simple stretches you can do daily to enhance your flexibility and reduce injury risk.",
    content: "Stretching is an essential part of any fitness routine. These five exercises...",
    category: "Workout",
    image: "https://res.cloudinary.com/demo/image/upload/v1699999999/tutorial4.jpg", // Replace with actual Cloudinary demo/test URL
  },
  {
    title: "How to Build Biceps in 2 Weeks",
    author: "Alex Brown",
    description: "Quick and effective exercises to build strong and defined biceps in no time.",
    content: "Follow this targeted biceps workout plan to see results in just 14 days...",
    category: "Arms",
    image: "https://res.cloudinary.com/demo/image/upload/v1699999999/tutorial5.jpg", // Replace with actual Cloudinary demo/test URL
  },
];

// Add dummy data to the database
const addDummyData = async () => {
  try {
    await Tutorial.insertMany(dummyTutorials);
    console.log("Dummy tutorials added successfully!");
  } catch (error) {
    console.error("Error adding dummy tutorials:", error);
  } finally {
    mongoose.connection.close();
  }
};

// Run the function
addDummyData();
