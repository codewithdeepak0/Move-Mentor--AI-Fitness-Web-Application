const express = require("express");
const router = express.Router();
const {createMulterUpload , processimages} = require("../middlewere/multer.js");

const {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  addCommentToBlog, 
} = require("../controllers/blogs.js");
const { verifyToken } = require("../middlewere/VerifyToken.js");

// Get all blogs with pagination and filters
router.get("/", getAllBlogs);

// Get a single blog by ID
router.get("/:id", getBlogById);

// Create a new blog (with image upload)
router.post("/",createMulterUpload(),processimages, createBlog);

// Update a blog by ID (with image upload)
router.patch("/:id",createMulterUpload(),processimages, updateBlog);

// Delete a blog by ID
router.delete("/:id", verifyToken ,deleteBlog);

router.post("/:id/comments", verifyToken  ,addCommentToBlog);

module.exports = router;
