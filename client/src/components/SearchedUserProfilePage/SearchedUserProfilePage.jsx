import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Spinner, Row, Col } from 'react-bootstrap';
import './SearchedUserProfilePage.css';

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

  return (
    <div className="home-container">
              <h2 className="heading" style={{color:"white"}}>Players in {city}</h2>

      <div className="container">
        <Row className="card-container">
          {loading ? (
            <Col className="text-center mt-2">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </Col>
          ) : users.length > 0 ? (
            users.map((user) => (
              <Col key={user._id} sm={6} md={3}>
                <div className="card">
                  <div className="card-img ">
                    <img src={`http://localhost:3001/profile-picture/${user._id}`} alt="Profile" />
                  </div>
                  <div className="profile">
                    <img src={`http://localhost:3001/profile-picture/${user._id}`} alt="Profile" />
                  </div>
                  <div className="user-details text-center">
                    <h4>{user.fullName}</h4>
                    <span>{user.city}</span>
                  </div>
                  <div className="follow-button text-center">
                    <button className="btn btn-primary btn-sm follow">Follow</button>
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
