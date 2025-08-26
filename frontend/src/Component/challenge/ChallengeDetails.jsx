import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ChallengeDetails = () => {
  const { id } = useParams();
  const [challenge, setChallenge] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/api/challenges/${id}`)
      .then(res => setChallenge(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const joinChallenge = () => {
    axios.post(`http://localhost:3000/api/challenges/${id}/join`)
      .then(res => alert('Joined Successfully!'))
      .catch(err => console.error(err));
  };

  if (!challenge) return <p>Loading...</p>;

  return (
    <div>
      <h1>{challenge.title}</h1>
      <p>{challenge.description}</p>
      <p>Difficulty: {challenge.difficulty}</p>
      <button onClick={joinChallenge}>Join Challenge</button>
    </div>
  );
};

export default ChallengeDetails;
