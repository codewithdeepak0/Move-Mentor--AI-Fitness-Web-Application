const Blog = require("../models/Blogs.js");
const {verifyToken} = require("../middlewere/VerifyToken.js");
const User =  require("../models/UserModel.js")

exports.getAllBlogs = async (req, res) => {
  const { page = 1, limit = 20, category, tags } = req.query;

  const query = {};
  if (category) query.category = category;
  if (tags) query.tags = { $in: tags.split(",") };

  try {
    const blogs = await Blog.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });
    const total = await Blog.countDocuments(query);

    res.status(200).json({ blogs, total, page: parseInt(page), limit: parseInt(limit) });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch blogs.", message: err.message });
  }
};

// Get a single blog by ID
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate({
      path: "comments.user",
      select: "name email",
    });
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: "Error fetching blog", error });
  }
};

// Create a new blog
exports.createBlog = async (req, res) => {

  const blogData = req.body.data ? JSON.parse(req.body.data) : null;

  const { title, content, author, category, tags } = blogData;

  try {
    const newBlog = new Blog({
      title,
      content,
      author,
      category, 
      tags: Array.isArray(tags) ? tags : tags ? tags.split(",") : [],
      image: req.url || null, // Cloudinary URL
    });

    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (err) {
    res.status(500).json({ error: "Failed to create the blog.", message: err.message });
  }
};

// Update a blog by ID
exports.updateBlog = async (req, res) => {

 
  const { title, content, author, category, tags } = req.body;

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      {
        title,
        content,
        author,
        category,
        tags: Array.isArray(tags) ? tags : tags ? tags.split(",") : [],
        image: req.url || undefined, // Update image if provided
      },
      { new: true } // Return the updated blog
    );

    if (!updatedBlog) return res.status(404).json({ error: "Blog not found." });

    res.status(200).json(updatedBlog);
  } catch (err) {
    res.status(500).json({ error: "Failed to update the blog.", message: err.message });
  }
};

// Delete a blog by ID
exports.deleteBlog = async (req, res) => {
  try {
    console.log("hey i am console before deleting the blog");

    const { id } = req.params;
    const userId = req.user.id; // Extract user ID from token
    console.log("User ID:", userId);

    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const user = await User.findById(userId); // Ensure it's awaited
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log("User:", user);

    // Find the blog by ID
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    console.log("Blog author:", blog.author, "Logged in user:", user.username);
    
    // Check if the current user is the author of the blog
    if (blog.author !== user.name) {
      return res.status(403).json({ message: "You are not authorized to delete this blog" });
    }

    // Delete the blog
    await Blog.deleteOne({ _id: id });

    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({ message: "Error deleting blog", error });
  }
};






// Add a comment to a blog
exports.addCommentToBlog = async (req, res) => {
  const { blogId, comment, user } = req.body;
  
  try {
    if (!comment || !user || !blogId) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    
    const newComment = {
      user,
      comment,
      date: new Date(),
    };

    
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    blog.comments.push(newComment);
    await blog.save();

    
    res.status(201).json(newComment); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


