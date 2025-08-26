// import React, { useState } from "react";
// import styles from "./AddCommentForm.module.css";

// const AddCommentForm = ({ onAddComment, userId }) => {
//   const [commentText, setCommentText] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!userId) {
//       alert("User ID is required.");
//       return;
//     }

//     const newComment = {
//       comment: commentText,
//       user: userId, // Use the userId passed from BlogDetails
//     };

//     onAddComment(newComment);
//     setCommentText("");
//   };

//   return (
//     <form className={styles.commentForm} onSubmit={handleSubmit}>
//       <textarea
//         value={commentText}
//         onChange={(e) => setCommentText(e.target.value)}
//         placeholder="Write a comment..."
//         required
//       />
//       <button type="submit" className="btn btn-primary">
//         Submit
//       </button>
//     </form>
//   );
// };

// export default AddCommentForm;
import React, { useState } from "react";
import { useSelector } from "react-redux";

const AddCommentForm = ({ blogId, onAddComment }) => {
  const [comment, setComment] = useState("");

  const currentUser = useSelector((state) => state.user); // Accessing user state from Redux

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.trim() === "") return; // Prevent empty comments

    const newComment = {
      comment,
      user: currentUser._id, // Use current user ID
    };

    onAddComment(newComment); // Pass the new comment to the parent component

    setComment(""); // Clear the form after submission
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add your comment here"
          rows="4"
          required
        ></textarea>
        <button type="submit">Add Comment</button>
      </form>
    </div>
  );
};

export default AddCommentForm;
