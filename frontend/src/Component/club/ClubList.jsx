// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './ClubList.css'; // Import the updated CSS
// import axios from 'axios';

// const ClubList = () => {
//   const [clubs, setClubs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchClubs = async () => {
//       try {
//         const token = localStorage.getItem('token'); // Retrieve JWT token
//         const response = await axios.get('http://localhost:3000/api/clubs', {
//           headers: { Authorization: `Bearer ${token}` }, // Provide token in header
//         });
//         setClubs(response.data);
//       } catch (err) {
//         setError('Failed to load clubs.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchClubs();
//   }, []);

//   const handleClubClick = (id) => {
//     navigate(`/clubs/${id}`);
//   };

//   if (loading) return <p>Loading clubs...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div className="pageContainer">
//       <section className="aboutClubsSection">
//         <div className="aboutClubsContainer">
//           <h1 className="aboutClubsHeading">About Clubs</h1>
//           <p className="aboutClubsText">
//             Discover and connect with various clubs through our platform. Clubs
//             provide a community for individuals with shared interests, offering
//             opportunities for collaboration, networking, and personal growth.
//             Whether you're passionate about sports, technology, art, or
//             anything else, there's a club waiting for you!
//           </p>
//           <p className="aboutClubsText">
//             By joining a club, you can enhance your skills, meet like-minded
//             people, and contribute to a shared vision. Explore the clubs below
//             and find the perfect fit for you!
//           </p>
//         </div>
//       </section>
//       <section className="clubListSection">
//         <div className="clubsHeader">
//           <h2 className="clubsHeading text-center">Clubs</h2>
//           <button
//             className="addClubButton mb-5"
//             onClick={() => navigate('/create-club')} // Change path if needed
//           >
//             + Add Club
//           </button>
//         </div>
//         <div className="clubsGrid">
//           {clubs.map((club) => (
//             <div
//               key={club._id}
//               className="clubCard"
//               onClick={() => handleClubClick(club._id)}
//             >
//               <div className="cardContent">
//                 <h3 className="clubTitle">{club.name}</h3>
//                 <p className="clubAdmin">By {club.adminName}</p>
//                 <p className="clubDescription">{club.description}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// };

// export default ClubList;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ClubList.css'; // Import the updated CSS
import axios from 'axios';

const ClubList = () => {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve JWT token
        const response = await axios.get('http://localhost:3000/api/clubs', {
          headers: { Authorization: `Bearer ${token}` }, // Provide token in header
        });

        setClubs(response.data);
      } catch (err) {
        setError('Failed to load clubs.');
      } finally {
        setLoading(false);
      }
    };

    fetchClubs();
  }, []);

  const handleClubClick = (id) => {
    navigate(`/clubs/${id}`);
  };

  if (loading) return <p>Loading clubs...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="pageContainer">
      <section className="aboutClubsSection">
        <div className="aboutClubsContainer">
          <h1 className="aboutClubsHeading">About Clubs</h1>
          <p className="aboutClubsText">
            Discover and connect with various clubs through our platform. Clubs
            provide a community for individuals with shared interests, offering
            opportunities for collaboration, networking, and personal growth.
          </p>
        </div>
      </section>
      <section className="clubListSection">
        <div className="clubsHeader">
          <h2 className="clubsHeading text-center">Clubs</h2>
          <button
            className="addClubButton mb-5"
            onClick={() => navigate('/create-club')}
          >
            + Add Club
          </button>
        </div>
        <div className="clubsGrid">
          {clubs.map((club) => (
            <div
              key={club._id}
              className="clubCard"
              onClick={() => handleClubClick(club._id)}
            >
              <div className="cardContent">
                <h3 className="clubTitle">{club.name}</h3>
                <p className="clubAdmin">
                  <strong>Admin:</strong> {club.admin?.name || 'Unknown'}
                </p>
                <p className="clubDescription">{club.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ClubList;
