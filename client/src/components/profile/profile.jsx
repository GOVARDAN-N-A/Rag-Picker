import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './profile.css'; // Import CSS file for styling

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams(); // Get the userId from the URL parameter

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user data from the backend server based on the userId
        const response = await axios.get(`http://localhost:3001/profile/${'660c1e25ea485b057aff70d3'}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [userId]); // Fetch user data whenever the userId changes

  return (
    <div className="profile-container">
      <h2>Profile Details</h2>
      {user ? (
        <div className="profile-details">
          <div className="profile-picture">
            {user.profilePicture && (
              <img src={`http://localhost:3001/profile-picture/${'660c1e25ea485b057aff70d3'}`} alt="Profile" className="round-image" />
            )}
          </div>
          <div className="profile-info">
            <p><strong>Full Name:</strong> {user.fullName}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Date of Birth:</strong> {user.dateOfBirth}</p>
            <p><strong>Gender:</strong> {user.gender}</p>
            <p><strong>Location:</strong> {user.location}</p>
            <p><strong>Sports Interests:</strong> {user.sportsInterests.join(', ')}</p>
            <p><strong>Skill Level:</strong> {user.skillLevel}</p>
            <p><strong>Preferred Playing Times:</strong> {user.preferredPlayingTimes.join(', ')}</p>
            <p><strong>Contact Number:</strong> {user.contactNumber}</p>
            <p><strong>Social Media Profiles:</strong> {user.socialMediaProfiles}</p>
            <p><strong>Bio:</strong> {user.bio}</p>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProfilePage;
