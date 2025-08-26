import React from "react";
import { Link } from 'react-router-dom';

const AboutSection = () => {
  return (
    <section 
      className="about-section py-5" 
      style={{ 
        backgroundColor: "#f9f9f9", 
        overflowY: "auto",  // Ensures scrolling
        maxHeight: "100vh"  // Prevents content from overflowing the screen height
      }}
    >
      <div className="container">
        {/* Header Section */}
        <div className="text-center mb-5">
          <h1 style={{ color: "#3A6351", fontWeight: "bold" }}>About Movementor</h1>
          <p className="lead" style={{ color: "#555" }}>
            Transform your fitness journey with Movementor—your AI-powered fitness companion for tracking progress, gaining insights, and staying motivated every day.
          </p>
        </div>

        {/* Main Section */}
        <div className="row align-items-center mb-5">
          <div className="col-md-6">
            <img
              src="https://img.freepik.com/premium-photo/web-dashboard-health-fitness-workout-logs-progress-tracking-nutrit-concept-idea-design-art_655090-1700271.jpg"
              alt="Movementor Overview"
              className="img-fluid rounded shadow"
            />
          </div>
          <div className="col-md-6">
            <h2 style={{ color: "#3A6351" }}>What is Movementor?</h2>
            <p style={{ lineHeight: "1.8", color: "#555" }}>
              <strong>Movementor</strong> is an intelligent fitness tracking platform designed to help users monitor their progress, track calories, and build healthy habits. With AI-driven analytics and personalized suggestions, it’s your personal trainer in the palm of your hand.
            </p>
            <p style={{ color: "#555" }}>
              The platform also introduces gamified elements like streaks to boost motivation and consistency, ensuring long-term success.
            </p>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="mb-5">
          <h2 className="text-center mb-4" style={{ color: "#3A6351" }}>How It Works</h2>
          <div className="row">
            <div className="col-md-4">
              <div className="card shadow text-center p-4">
                <h5 style={{ color: "#3A6351" }}>1. Track & Analyze</h5>
                <p style={{ color: "#555" }}>
                  Use Movementor to log your workouts, calories, and progress effortlessly. Monitor trends with interactive charts powered by Chart.js.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow text-center p-4">
                <h5 style={{ color: "#3A6351" }}>2. AI Insights</h5>
                <p style={{ color: "#555" }}>
                  Get AI-powered recommendations and insights to optimize your fitness journey and achieve goals faster.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow text-center p-4">
                <h5 style={{ color: "#3A6351" }}>3. Stay Motivated</h5>
                <p style={{ color: "#555" }}>
                  Keep your streaks alive and get daily motivation with challenges and rewards for consistency.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Developer Details Section */}
        <div className="text-center mt-5">
          <h2 style={{ color: "#3A6351", fontWeight: "bold" }}>Meet the Developer</h2>
          <p className="lead" style={{ color: "#555" }}>
            Hi, I'm Dikshit, a passionate full-stack software engineer and a 3rd-year Computer Science student with expertise in the MERN stack. I built Movementor to simplify fitness tracking and make it more interactive and engaging.
          </p>
          <p style={{ color: "#555" }}>
            Connect with me on social media and stay updated with new features and enhancements.
          </p>
          <div className="social-links mt-3">
            <a href="https://www.linkedin.com/in/dikshit" target="_blank" rel="noopener noreferrer" className="btn btn-outline-success m-2">LinkedIn</a>
            <a href="https://github.com/dikshit" target="_blank" rel="noopener noreferrer" className="btn btn-outline-success m-2">GitHub</a>
            <a href="https://twitter.com/dikshit" target="_blank" rel="noopener noreferrer" className="btn btn-outline-success m-2">Twitter</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;


