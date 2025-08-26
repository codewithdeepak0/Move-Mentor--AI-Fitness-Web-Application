// src/components/TutorialDetails.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./TutorialDetails.css";

const TutorialDetails = () => {
  const { id } = useParams();
  const [tutorial, setTutorial] = useState(null);

  useEffect(() => {
    const fetchTutorialDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/tutorials/${id}`);
        const data = await response.json();
        setTutorial(data);
      } catch (error) {
        console.error("Error fetching tutorial details:", error);
      }
    };

    fetchTutorialDetails();
  }, [id]);

  if (!tutorial) {
    return <div>Loading...</div>;
  }

  return (
    <div className="tutorial-details">
      <img
        src={tutorial.image}
        alt={tutorial.title}
        className="tutorial-details__image"
      />
      <h1 className="tutorial-details__title">{tutorial.title}</h1>
      <p className="tutorial-details__author fw-bold ">By {tutorial.author}</p>
      <p className="tutorial-details__category fw-bold ">Category: {tutorial.category}</p>
      <p className="tutorial-details__category  fw-bold">difficulty: {tutorial.difficulty}</p>
      <p className="tutorial-details__category fw-bold">duration: {tutorial.duration}</p>
      <p className="tutorial-details__content">{tutorial.content}</p>
    </div>
  );
};

export default TutorialDetails;
