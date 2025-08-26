import axios from "axios"; // Import axios for making HTTP requests
import React, { useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";

const EditBlog = () => {
  const { state } = useLocation(); // Access state passed from the previous page
  const navigate = useNavigate();
  const { id } = useParams(); // Get blog ID from URL parameters

  // Initialize form state with existing blog data
  const [formData, setFormData] = useState({
    title: state.blog.title,
    content: state.blog.content,
    image: state.blog.image, // Existing image URL
    author: state.blog.author,
    category: state.blog.category,
    tags: state.blog.tags,
  });

  const [newImage, setNewImage] = useState(null); // State to store the new image file

  // Handle changes in text inputs
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle image file selection
  const handleImageChange = (e) => {
    setNewImage(e.target.files[0]); // Store the selected image file
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData(); // Create a new FormData object
      formDataToSend.append("title", formData.title);
      formDataToSend.append("content", formData.content);
      formDataToSend.append("author", formData.author);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("tags", formData.tags);

      // If a new image is selected, append it to the FormData
      if (newImage) {
        formDataToSend.append("image", newImage);
      } else {
        formDataToSend.append("image", formData.image); // Keep the existing image if no new one is uploaded
      }

      // Make a PATCH request to update the blog post
      const response = await axios.patch(
        `http://localhost:3000/api/blogs/${id}`, // API endpoint with blog ID
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set appropriate headers
          },
        }
      );

      if (response.status === 200) {
        navigate(`/blogs/${id}`); // Navigate back to blog details after successful update
      } else {
        console.error("Failed to update the blog");
      }
    } catch (error) {
      console.error("Error updating the blog:", error);
    }
  };

  return (
    <div className="container overflow-auto">
      <h1>Edit Blog</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Content</label>
          <textarea
            className="form-control"
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Current Image</label>
          <div>
            <img src={formData.image} alt="Current Blog" width="200" />
          </div>
        </div>

        <div className="form-group">
          <label>Upload New Image</label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={handleImageChange}

            required 
          />
        </div>

        <div className="form-group">
          <label>Author</label>
          <input
            type="text"
            className="form-control"
            name="author"
            value={formData.author}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <input
            type="text"
            className="form-control"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>Tags</label>
          <input
            type="text"
            className="form-control"
            name="tags"
            value={formData.tags}
            onChange={handleInputChange}
          />
        </div>

        <button type="submit" className="btn btn-success mt-3">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditBlog;
