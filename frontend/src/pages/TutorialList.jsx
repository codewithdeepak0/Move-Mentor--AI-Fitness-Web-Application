// src/components/Tutorials.js
import React, { useEffect, useState } from "react";
import TutorialCard from "../Component/TutorialCard";
import "./TutorialList.css";
import { useNavigate } from "react-router-dom";

const TutorialList = () => {
  const [tutorials, setTutorials] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchTutorials = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/tutorials"); 
        const data = await response.json();
        setTutorials(data);
      } catch (error) {
        console.error("Error fetching tutorials:", error);
      }
    };

    fetchTutorials();
  }, []);

  return (
    <div className="tutorials-container">
      <div className="tutorials-header">
      <h1 className="tutorials-heading">Tutorials</h1>
      <button
          className="add-tutorial-button mb-5"
          onClick={() => navigate("/add-tutorial")}
        >
          + Add Tutorial
        </button>
      </div>
      <div className="tutorials-grid">
        {tutorials.map((tutorial) => (
          <TutorialCard key={tutorial._id} tutorial={tutorial} />
        ))}
      </div>
    </div>
  );
};

export default TutorialList;
