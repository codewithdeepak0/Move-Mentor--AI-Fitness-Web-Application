import React from "react";
import styles from "./CommentList.module.css";

const CommentList = ({ comments ,  }) => {
  if (!comments || comments.length === 0) {
    return <p className={styles.noComments}>No comments yet. Be the first to comment!</p>;
  }

  return (
    <div className={styles.commentList}>
      <h3>Comments</h3>
      <ul>
        {comments.map((comment) => (
          <li key={comment._id} className={styles.commentItem}>
            <p className={styles.commentText}>{comment.comment}</p>
            <p className={styles.commentMeta}>
              <span className={styles.commentUser}>By: {comment.user.name || "Anonymous"}</span>
              <span className={styles.commentDate}>
                {new Date(comment.date).toLocaleDateString()}
              </span>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentList;

