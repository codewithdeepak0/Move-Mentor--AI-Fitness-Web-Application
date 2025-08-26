import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./BlogDetail.module.css"; // Use CSS Modules for styling
import CommentList from "./CommentList";
import AddCommentForm from "./AddCommentForm";
import { useSelector } from "react-redux";

const BlogDetails = () => {
  const { id } = useParams(); // Extract the blog ID from the URL
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]); // Store comments separately
  const navigate = useNavigate();

  // accesss currrentUser friom redux store. 
  const currentUser = JSON.parse(localStorage.getItem("fittrack-app-user"));
  console.log(currentUser)
  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/blogs/${id}`); // Fetch blog details using the blog ID
        const data = await response.json();
        setBlog(data); // Set the blog details
        setComments(data.comments || []); // Set the initial comments, ensure empty array if comments are undefined
        console.log(data.comments);
      } catch (error) {
        console.error("Error fetching blog details:", error);
      }
    };

    fetchBlogDetails();
  }, [id]);

  const handleAddComment = async (newComment) => {
    if (!currentUser) {
      alert("You must be logged in to add a comment.");
      return;
    }
    
    const token = localStorage.getItem("fittrack-app-token");
    console.log(token);



    try {

      
      const response = await fetch(`http://localhost:3000/api/blogs/${id}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...newComment,
          user: currentUser._id, // Pass user ID from currentUser
          blogId: blog._id,
        }),
      });

      if (response.ok) {
        const savedComment = await response.json();
        setComments([...comments, savedComment]);
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }


  }


  const handleDelete = async () => {
    if (!currentUser) {
      alert("You must be logged in to delete the blog.");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this blog?")) {
      return;
    }

    try {
      const token = localStorage.getItem("fittrack-app-token");

      console.log("token for deleting the blog : "  , token)

      const response = await fetch(`http://localhost:3000/api/blogs/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        alert("Blog deleted successfully!");
        navigate("/blogs"); // Redirect to home or blogs list after deletion
      } else {
        const data = await response.json();
        alert(`Failed to delete blog: ${data.message}`);
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };



  if (!blog) {
    return <div>Loading...</div>;
  }

  console.log(blog)

  return (
    <div className={styles.blogDetails}>
      <img
        src={blog.image}
        alt={blog.title}
        className={styles.blogDetails__image}
      />
      <h1 className={styles.blogDetails__title}>{blog.title}</h1>
      <p className={`${styles.blogDetails__author} ${styles.boldText}`}>
        By {blog.author}
      </p>
      <p className={`${styles.blogDetails__category} ${styles.boldText}`}>
        Category: {blog.category}
      </p>
      <p className={`${styles.blogDetails__category} ${styles.boldText}`}>
        Tags: {blog.tags.join(", ")} {/* Ensure tags are properly displayed */}
      </p>
      <p className={styles.blogDetails__content}>{blog.content}</p>

      <button
        className="btn btn-primary"
        style={{ width: "12rem" }}
        onClick={() =>
          navigate(`/edit-blog/${id}`, {
            state: { blog },
          })
        }
      >
        Edit
      </button>
     
      {currentUser && currentUser.name === blog.author && (
        <button className="btn btn-danger ms-5 "  onClick={handleDelete} style={{width : "12rem"}}>
          Delete Blog
        </button>
      )}


      
      <CommentList comments={comments} />

      
      {currentUser ? (
        <AddCommentForm onAddComment={handleAddComment} blogId={id} />
      ) : (
        <p>Please log in to add a comment.</p>
      )}
    </div>
  );
};

export default BlogDetails;
