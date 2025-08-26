import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './CreateClub.module.css';

const CreateClub = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleCreateClub = async (e) => {
    e.preventDefault();

    console.log(localStorage.getItem('fittrack-app-token'));
   

    try {
      const response = await axios.post('http://localhost:3000/api/clubs', {
        name,
        description,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('fittrack-app-token')}` // Ensure user is authenticated
        }
      });

      if (response.status === 201) {
        setSuccess('Club created successfully!');
        setTimeout(() => navigate('/clubs'), 2000); // Redirect to clubs list
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create club. Please try again.');
    }
  };

  return (
    <div className={styles.createClubContainer}>
      <h1>Create New Club</h1>
      <form onSubmit={handleCreateClub} className={styles.createClubForm}>
        <input
          type="text"
          placeholder="Club Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
        <button type="submit">Create Club</button>
      </form>
      {error && <p className={styles.error}>{error}</p>}
      {success && <p className={styles.success}>{success}</p>}
    </div>
  );
};

export default CreateClub;
