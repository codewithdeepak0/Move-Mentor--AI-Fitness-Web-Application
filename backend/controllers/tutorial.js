const Tutorial = require("../models/Tutorial");

// Get all tutorials
const getAllTutorials = async (req, res) => {
  try {
    const tutorials = await Tutorial.find();
    res.status(200).json(tutorials);
  } catch (error) {
    console.error("Error fetching tutorials:", error);
    res.status(500).json({ error: "Error fetching tutorials" });
  }
};

// Get tutorial by ID
const getTutorialById = async (req, res) => {
  try {
    const tutorial = await Tutorial.findById(req.params.id);
    if (!tutorial) {
      return res.status(404).json({ error: "Tutorial not found" });
    }
    res.status(200).json(tutorial);
  } catch (error) {
    console.error("Error fetching tutorial:", error);
    res.status(500).json({ error: "Error fetching tutorial" });
  }
};

// Add a new tutorial
const addTutorial = async (req, res) => {

 
  try {
      console.log("this is tutorial method");
    
    const tutorialData = req.body.data ? JSON.parse(req.body.data) : null;


    if (!tutorialData) {
      return res.status(400).json({ error: "Invalid tutorial data" });
    }

    const { title, author, description, content, category, duration, difficulty } = tutorialData;

    if (!title || !author || !description || !content || !category  || !duration || !difficulty) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const newTutorial = new Tutorial({
      title,
      author,
      description,
      content,
      category,
      image: req.url,
      duration,
      difficulty,
    });

    await newTutorial.save();
    res.status(201).json({ message: "Tutorial added successfully", tutorial: newTutorial });
  }  catch (error) {
    console.error("Backend error:", error); // Logs the exact issue
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};


// Export controllers
module.exports = {
  getAllTutorials,
  getTutorialById,
  addTutorial,
};
