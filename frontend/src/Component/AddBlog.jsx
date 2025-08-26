import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./AddTutorial.module.css"; // Importing module CSS

const AddBlog = () => {
  const navigate = useNavigate();
  const [blog, setblog] = useState({
    title: "",
    author: "",
    content: "",
    category: "",
     tags : "",
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setblog((prev) => ({ ...prev, [name]: value }));
  }; 

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!image) {
      alert("Please select an image.");
      return;
    }
  
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("image", image); // Attach the image
      formData.append("data", JSON.stringify(blog)); // Attach other data
     
  
      const response = await axios.post(
        "http://localhost:3000/api/blogs",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
  
      alert("Tutorial added successfully!");
      navigate("/blogs");
  
      // Reset form
      setTutorial({
        title: "",
        author: "",
        content: "",
        category: "",
        difficulty: "",
        duration: "",
      });
      setImage(null);
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || error.response?.statusText || "An unknown error occurred.";
      console.error("Error adding blog :", errorMessage);
      alert(`Failed to add blog. Reason: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className={styles.addTutorial}>
      <h2>Add New blog</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={blog.title}
            onChange={handleChange}
            placeholder="Enter tutorial title"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            name="author"
            value={blog.author}
            onChange={handleChange}
            placeholder="Enter author name"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            value={blog.content}
            onChange={handleChange}
            placeholder="Enter tutorial content"
            required
          ></textarea>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="category">Category</label>
          <input
            type="text"
            id="category"
            name="category"
            value={blog.category}
            onChange={handleChange}
            placeholder="Enter category"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="tags">tags</label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={blog.tags}
            onChange={handleChange}
            placeholder="for should be #arms"
            required
          />
        </div>
        
       
        <div className={styles.formGroup}>
          <label htmlFor="image">Image</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Add blog"}
        </button>
      </form>
    </div>
  );
};

export default AddBlog;
