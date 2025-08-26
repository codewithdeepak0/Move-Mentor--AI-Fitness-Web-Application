const express = require("express");
const { getAllTutorials, getTutorialById, addTutorial } = require("../controllers/tutorial.js");
const {  createMulterUpload,processimages,} = require("../middlewere/multer.js");

const router = express.Router();

// Get all tutorials
router.get("/", getAllTutorials);

// Get a single tutorial by ID
router.get("/:id", getTutorialById);

// Add a new tutorial with image upload
router.post("/",createMulterUpload(),processimages, addTutorial);

module.exports = router;
