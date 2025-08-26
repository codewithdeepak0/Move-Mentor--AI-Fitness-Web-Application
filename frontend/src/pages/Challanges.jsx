import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ChallengeList = () => {
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/challenges')
      .then(res => setChallenges(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Challenges</h1>
      {challenges.map(challenge => (
        <div key={challenge._id}>
          <h3>{challenge.title}</h3>
          <p>{challenge.description}</p>
          <p>Difficulty: {challenge.difficulty}</p>
          <p>Created By: {challenge.createdBy.username}</p>
          <a href={`/challenges/${challenge._id}`}>View Details</a>
        </div>
      ))}
    </div>
  );
};

export default ChallengeList;
