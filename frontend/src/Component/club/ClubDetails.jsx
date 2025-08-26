// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";

// const ClubDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [club, setClub] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [username, setUsername] = useState("");
//   const [success, setSuccess] = useState("");
//   const [members, setMembers] = useState([]);

//   const token = localStorage.getItem("fittrack-app-token");

//   useEffect(() => {
//     const fetchClubDetails = async () => {
//       try {
//         const response = await axios.get(`http://localhost:3000/api/clubs/${id}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setClub(response.data);
//       } catch (err) {
//         setError("Failed to load club details.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     const fetchMembers = async () => {
//       try {
//         const response = await axios.get(`http://localhost:3000/api/clubs/${id}/members`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setMembers(response.data);
//       } catch (err) {
//         console.error("Failed to fetch members:", err);
//       }
//     };

//     fetchClubDetails();
//     fetchMembers();
//   }, [id, token]);

//   const handleJoinClub = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.put(
//         `http://localhost:3000/api/clubs/${id}/join`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.status === 200) {
//         setSuccess("Successfully joined the club!");
//         setMembers((prev) => [...prev, username]);
//       }
//     } catch (err) {
//       setError("Failed to join the club.");
//     }
//   };

//   const handleLeaveClub = async () => {
//     try {
//       const response = await axios.put(
//         `http://localhost:3000/api/clubs/${id}/leave`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.status === 200) {
//         setSuccess("You have left the club.");
//         setMembers((prev) => prev.filter((m) => m !== username));
//       }
//     } catch (err) {
//       setError("Failed to leave the club.");
//     }
//   };

//   const handleDeleteClub = async () => {
//     try {
//       const response = await axios.delete(`http://localhost:3000/api/clubs/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       if (response.status === 200) {
//         navigate("/clubs");
//       }
//     } catch (err) {
//       setError("Failed to delete the club.");
//     }
//   };

//   if (loading) return <p>Loading club details...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div className="container mt-5">
//       <div className="card shadow p-4">
//         <h1 className="text-primary text-center">{club.name}</h1>
//         <p className="text-secondary text-center">{club.description}</p>

//         <div className="row mt-4">
//           <div className="col-md-6">
//             <form onSubmit={handleJoinClub} className="mb-3">
//               <h3>Join this Club</h3>
//               <div className="input-group">
//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder="Enter your username"
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                   required
//                 />
//                 <button className="btn btn-primary" type="submit">
//                   Join Club
//                 </button>
//               </div>
//             </form>

//             <button
//               onClick={() => navigate(`/edit-club/${club._id}`)}
//               className="btn btn-success w-100 mb-2"
//             >
//               Edit Club
//             </button>
//             <button
//               onClick={handleDeleteClub}
//               className="btn btn-danger w-100 mb-2"
//             >
//               Delete Club
//             </button>
//           </div>

//           <div className="col-md-6">
//             <h3>Members:</h3>
//             {members.length > 0 ? (
//               <ul className="list-group">
//                 {members.map((member, index) => (
//                   <li className="list-group-item" key={index}>
//                     {member}
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <p>No members have joined yet.</p>
//             )}
//             <button
//               onClick={handleLeaveClub}
//               className="btn btn-warning w-100 mt-3"
//             >
//               Leave Club
//             </button>
//           </div>
//         </div>

//         {success && (
//           <div className="alert alert-success mt-3">{success}</div>
//         )}
//         {error && <div className="alert alert-danger mt-3">{error}</div>}
//       </div>
//     </div>
//   );
// };

// export default ClubDetails;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ClubDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [club, setClub] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [members, setMembers] = useState([]);

  const token = localStorage.getItem("fittrack-app-token");
  const loggedInUser = localStorage.getItem("fittrack-app-username");

  useEffect(() => {
    const fetchClubDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/clubs/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setClub(response.data);
        setMembers(response.data.members); // Store members directly from populated data
      } catch (err) {
        setError("Failed to load club details.");
      } finally {
        setLoading(false);
      }
    };

    fetchClubDetails();
  }, [id, token]);

  const handleJoinClub = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/clubs/${id}/join`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setSuccess("Successfully joined the club!");
        setMembers((prev) => [...prev, { name: loggedInUser }]); // Add new member with name
      }
    } catch (err) {
      setError("Failed to join the club.");
    }
  };

  const handleLeaveClub = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/clubs/${id}/leave`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setSuccess("You have left the club.");
        setMembers((prev) =>
          prev.filter((m) => m.name !== loggedInUser) // Remove member by name
        );
      }
    } catch (err) {
      setError("Failed to leave the club.");
    }
  };

  const handleDeleteClub = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/clubs/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        navigate("/clubs");
      }
    } catch (err) {
      setError("Failed to delete the club.");
    }
  };

  if (loading) return <p>Loading club details...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h1 className="text-primary text-center">{club.name}</h1>
        <p className="text-secondary text-center">{club.description}</p>

        <div className="row mt-4">
          <div className="col-md-6">
            <h3>Join this Club</h3>
            <button
              className="btn btn-primary w-100 mb-2"
              onClick={handleJoinClub}
            >
              Join Club
            </button>

            <button
              onClick={() => navigate(`/edit-club/${club._id}`)}
              className="btn btn-success w-100 mb-2"
            >
              Edit Club
            </button>
            <button
              onClick={handleDeleteClub}
              className="btn btn-danger w-100 mb-2"
            >
              Delete Club
            </button>
          </div>

          <div className="col-md-6">
            <h3>Members:</h3>
            {members.length > 0 ? (
              <ul className="list-group">
                {members.map((member, index) => (
                  <li className="list-group-item" key={index}>
                    {member.name} {/* Display member's name */}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No members have joined yet.</p>
            )}
            <button
              onClick={handleLeaveClub}
              className="btn btn-warning w-100 mt-3"
            >
              Leave Club
            </button>
          </div>
        </div>

        {success && (
          <div className="alert alert-success mt-3">{success}</div>
        )}
        {error && <div className="alert alert-danger mt-3">{error}</div>}
      </div>
    </div>
  );
};

export default ClubDetails;
