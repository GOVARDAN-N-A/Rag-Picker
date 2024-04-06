// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import { Spinner, Row, Col } from 'react-bootstrap';

// const SearchedUserProfilePage = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const { city } = useParams();

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
//     <div className="home-container" style={{ paddingTop: '20px' }}>
//       <h2 className="heading text-center" style={{ marginBottom: '0px', color: 'white' }}>Players in {city}</h2>

//       <div className="container" style={{ width: '100%', maxWidth: '1200px', margin: 'auto' }}>
//         <Row className="card-container justify-content-center">
//           {loading ? (
//             <Col className="text-center mt-2">
//               <Spinner animation="border" role="status">
//                 <span className="visually-hidden">Loading...</span>
//               </Spinner>
//             </Col>
//           ) : users.length > 0 ? (
//             users.map((user) => (
//               <Col key={user._id} sm={6} md={3}>
//                 <div className="card" style={{ width: '250px', margin: '10px', padding: '10px 20px', borderRadius: '15px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: '#ffffffc7' }}>
//                   <div className="card-img">
//                     <img src={`http://localhost:3001/profile-picture/${user._id}`} alt="Profile" style={{ width: '100%', height: '200px', borderRadius: '10px', objectFit: 'cover' }} />
//                   </div>
//                   <div className="profile text-center">
//                     <img src={`http://localhost:3001/profile-picture/${user._id}`} alt="Profile" style={{ display: 'block', margin: '10px auto 0', width: '80px', height: '80px', borderRadius: '50%', border: '2px solid black', objectFit: 'cover' }} />
//                   </div>
//                   <div className="user-details text-center" style={{ marginTop: '20px' }}>
//                     <h4>{user.fullName}</h4>
//                     <span>{user.city}</span>
//                   </div>
//                 </div>
//               </Col>
//             ))
//           ) : (
//             <Col className="text-center mt-5">
//               <p>No players found in {city}</p>
//             </Col>
//           )}
//         </Row>
//       </div>
//     </div>
//   );
// };

// export default SearchedUserProfilePage;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Spinner, Row, Col, Button } from 'react-bootstrap';

const SearchedUserProfilePage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { city } = useParams();

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

  const handleFollow = async (userId) => {
    try {
      // Send a request to follow the user with userId
      await axios.post(`http://localhost:3001/follow/${userId}`);
      // Update the state or UI to indicate that the user has been followed
    } catch (error) {
      console.error('Error following user:', error);
    }
  };

  const handleUnfollow = async (userId) => {
    try {
      // Send a request to unfollow the user with userId
      await axios.post(`http://localhost:3001/unfollow/${userId}`);
      // Update the state or UI to indicate that the user has been unfollowed
    } catch (error) {
      console.error('Error unfollowing user:', error);
    }
  };

  return (
    <div className="home-container" style={{ paddingTop: '20px' }}>
      <h2 className="heading text-center" style={{ marginBottom: '0px', color: 'white' }}>Players in {city}</h2>

      <div className="container" style={{ width: '100%', maxWidth: '1200px', margin: 'auto' }}>
        <Row className="card-container justify-content-center">
          {loading ? (
            <Col className="text-center mt-2">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </Col>
          ) : users.length > 0 ? (
            users.map((user) => (
              <Col key={user._id} sm={6} md={3}>
                <div className="card" style={{ width: '250px', margin: '10px', padding: '10px 20px', borderRadius: '15px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: '#ffffffc7' }}>
                  <div className="card-img">
                    <img src={`http://localhost:3001/profile-picture/${user._id}`} alt="Profile" style={{ width: '100%', height: '200px', borderRadius: '10px', objectFit: 'cover' }} />
                  </div>
                  <div className="profile text-center">
                    <img src={`http://localhost:3001/profile-picture/${user._id}`} alt="Profile" style={{ display: 'block', margin: '10px auto 0', width: '80px', height: '80px', borderRadius: '50%', border: '2px solid black', objectFit: 'cover' }} />
                  </div>
                  <div className="user-details text-center" style={{ marginTop: '20px' }}>
                    <h4>{user.fullName}</h4>
                    <span>{user.city}</span>
                    {/* Follow or Unfollow button */}
                    {user.isFollowed ? (
                      <Button variant="danger" onClick={() => handleUnfollow(user._id)}>Unfollow</Button>
                    ) : (
                      <Button variant="primary" onClick={() => handleFollow(user._id)}>Follow</Button>
                    )}
                  </div>
                </div>
              </Col>
            ))
          ) : (
            <Col className="text-center mt-5">
              <p>No players found in {city}</p>
            </Col>
          )}
        </Row>
      </div>
    </div>
  );
};

export default SearchedUserProfilePage;
