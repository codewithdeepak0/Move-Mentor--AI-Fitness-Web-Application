// src/components/TutorialCard.js
import React from "react";
import "./TutorialCard.css"; // Add custom CSS for styling
import { useNavigate } from "react-router-dom";

const TutorialCard = ({ tutorial }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/tutorial/${tutorial._id}`);
  };

  return (
    <div className="tutorial-card" onClick={handleCardClick}>
      <img
        src={tutorial.image}
        alt={tutorial.title}
        className="tutorial-card__image"
      />
      <div className="tutorial-card__content">
        <h3 className="tutorial-card__title">{tutorial.title}</h3>
        <p className="tutorial-card__author">By {tutorial.author}</p>
        <p className="tutorial-card__description">{tutorial.description}</p>
      </div>
    </div>
  );
};

export default TutorialCard;
