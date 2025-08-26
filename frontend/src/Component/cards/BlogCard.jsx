import React from "react";
import styles from "./BlogCard.module.css"; // Import CSS Module for styling
import { useNavigate } from "react-router-dom";

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/blogs/${blog._id}`); // Change to appropriate route for viewing blog details
  };

  return (
    <div className={styles.blogCard} onClick={handleCardClick}>
      <img
        src={blog.image}
        alt={blog.title}
        className={styles.blogCard__image}
      />
      <div className={styles.blogCard__content}>
        <h3 className={styles.blogCard__title}>{blog.title}</h3>
        <p className={styles.blogCard__author}>By {blog.author}</p>
        <p className={styles.blogCard__description}>{blog.description}</p>
      </div>
    </div>
  );
};

export default BlogCard;
