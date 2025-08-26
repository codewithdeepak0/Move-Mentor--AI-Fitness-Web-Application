import React, { useEffect, useState } from "react";
import BlogCard from "../Component/cards/BlogCard";  // Ensure you create a BlogCard component
import   "./Blogs.css"; // Import the CSS module
import { useNavigate } from "react-router-dom";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/blogs"); // Update with your backend URL
        const data = await response.json();
        setBlogs(data.blogs);  // Assuming the response structure is { blogs: [] }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="blogsContainer  container">
    
      <div className="blogsHeader">
      <h1 className="blogsHeading text-center">Blogs</h1>
        <button
          className="addBlogButton mb-5 "
          onClick={() => navigate("/add-blog")} // Change path if needed
        >
          + Add Blog
        </button>
      </div>
      <div className="blogsGrid">
        {blogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default Blogs;
