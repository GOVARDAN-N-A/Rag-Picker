// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import { Card, Spinner, Row, Col } from 'react-bootstrap'; // Import Bootstrap components

// const SearchedUserProfilePage = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const { city } = useParams(); // Use useParams to access URL parameters

//   useEffect(() => {
//     const fetchUsersByCity = async () => {
//       try {
//         if (!city) {
//           console.error('City not found in URL parameter');
//           return;
//         }
//         setLoading(true);
//         const response = await axios.get(`http://localhost:3001/search?city=${city}`);
//         setUsers(response.data.users);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching users:', error);
//         setLoading(false);
//       }
//     };

//     fetchUsersByCity();
//   }, [city]); 

//   return (
//     <div className="container mt-5">
//       <h2 className="text-center mb-4">Players in {city}</h2>
//       {loading ? (
//         <div className="text-center mt-5">
//           <Spinner animation="border" role="status">
//             <span className="visually-hidden">Loading...</span>
//           </Spinner>
//         </div>
//       ) : (
//         <Row className="justify-content-center">
//           {users.length > 0 ? (
//             users.map(user => (
//               <Col key={user._id} xs={12} sm={6} md={4} lg={3} className="mb-4">
//                 <div className="card">
//                   <div className="upper">
//                     <img src={`http://localhost:3001/profile-picture/${user._id}`} alt="Profile" className="img-fluid" />
//                   </div>
//                   <div className="user text-center">
//                     <div className="profile">
//                       <img src={`http://localhost:3001/profile-picture/${user._id}`} alt="Profile" className="rounded-circle" width="80" />
//                     </div>
//                   </div>
//                   <div className="mt-5 text-center">
//                     <h4 className="mb-0">{user.fullName}</h4>
//                     <span className="text-muted d-block mb-2">{user.city}</span>
//                     <button className="btn btn-primary btn-sm follow">Follow</button>
//                   </div>
//                 </div>
//               </Col>
//             ))
//           ) : (
//             <p className="text-center mt-5">No players found in {city}</p>
//           )}
//         </Row>
//       )}
//     </div>
//   );
// };

// export default SearchedUserProfilePage;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Card, Spinner, Row, Col } from 'react-bootstrap'; // Import Bootstrap components

const SearchedUserProfilePage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { city } = useParams(); // Use useParams to access URL parameters

  useEffect(() => {
    const fetchUsersByCity = async () => {
      try {
        if (!city) {
          console.error('City not found in URL parameter');
          return;
        }
        setLoading(true);
        const response = await axios.get(`http://localhost:3001/search?city=${city}`);
        setUsers(response.data.users);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setLoading(false);
      }
    };

    fetchUsersByCity();
  }, [city]); 

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Players in {city}</h2>
      {loading ? (
        <div className="text-center mt-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <Row className="justify-content-center">
          {users.length > 0 ? (
            users.map(user => (
              <Col key={user._id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                <div className="card">
                  <div className="upper">
                    <img src={`http://localhost:3001/profile-picture/${user._id}`} alt="Profile" className="img-fluid" style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '10px' }} />
                  </div>
                  <div className="user text-center">
                    <div className="profile">
                      <img src={`http://localhost:3001/profile-picture/${user._id}`} alt="Profile" className="rounded-circle" width="80" style={{ height: '80px', width: '80px', marginTop: '2px' }} />
                    </div>
                  </div>
                  <div className="mt-5 text-center">
                    <h4 className="mb-0">{user.fullName}</h4>
                    <span className="text-muted d-block mb-2">{user.city}</span>
                    <button className="btn btn-primary btn-sm follow">Follow</button>
                  </div>
                </div>
              </Col>
            ))
          ) : (
            <p className="text-center mt-5">No players found in {city}</p>
          )}
        </Row>
      )}
    </div>
  );
};

export default SearchedUserProfilePage;
