import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./AddTutorial.module.css"; // Importing module CSS

const AddTutorial = () => {
  const navigate = useNavigate();
  const [tutorial, setTutorial] = useState({
    title: "",
    author: "",
    description: "",
    content: "",
    category: "",
    difficulty: "",
    duration: "",
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTutorial((prev) => ({ ...prev, [name]: value }));
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
      formData.append("data", JSON.stringify(tutorial)); // Attach other data
     
  
      const response = await axios.post(
        "http://localhost:3000/api/tutorials",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
  
      alert("Tutorial added successfully!");
      navigate("/tutorials");
  
      // Reset form
      setTutorial({
        title: "",
        author: "",
        description: "",
        content: "",
        category: "",
        difficulty: "",
        duration: "",
      });
      setImage(null);
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || error.response?.statusText || "An unknown error occurred.";
      console.error("Error adding tutorial:", errorMessage);
      alert(`Failed to add tutorial. Reason: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className={styles.addTutorial}>
      <h2>Add New Tutorial</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={tutorial.title}
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
            value={tutorial.author}
            onChange={handleChange}
            placeholder="Enter author name"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={tutorial.description}
            onChange={handleChange}
            placeholder="Enter tutorial description"
            required
          ></textarea>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            value={tutorial.content}
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
            value={tutorial.category}
            onChange={handleChange}
            placeholder="Enter category"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="difficulty">Difficulty</label>
          <select
            id="difficulty"
            name="difficulty"
            value={tutorial.difficulty}
            onChange={handleChange}
            required
          >
            <option value="">Select difficulty</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="duration">Duration</label>
          <input
            type="text"
            id="duration"
            name="duration"
            value={tutorial.duration}
            onChange={handleChange}
            placeholder="Enter duration (e.g., 30 mins)"
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
          {loading ? "Uploading..." : "Add Tutorial"}
        </button>
      </form>
    </div>
  );
};

export default AddTutorial;
