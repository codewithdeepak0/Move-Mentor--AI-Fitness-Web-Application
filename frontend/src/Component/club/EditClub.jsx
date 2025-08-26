import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './EditClub.module.css';

const EditClub = () => {
  const { id } = useParams(); // Get club ID from URL
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchClubDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/clubs/${id}`);
        setName(response.data.name);
        setDescription(response.data.description);
      } catch (err) {
        setError('Failed to load club details.');
      }
    };
    fetchClubDetails();
  }, [id]);

  const handleEditClub = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:3000/api/clubs/${id}`,
        { name, description },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.status === 200) {
        setSuccess('Club updated successfully!');
        setTimeout(() => navigate('/clubs'), 2000); // Redirect after success
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update club.');
    }
  };

  return (
    <div className={styles.editClubContainer}>
      <h1>Edit Club</h1>
      <form onSubmit={handleEditClub} className={styles.editClubForm}>
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
        <button type="submit">Update Club</button>
      </form>
      {error && <p className={styles.error}>{error}</p>}
      {success && <p className={styles.success}>{success}</p>}
    </div>
  );
};

export default EditClub;
