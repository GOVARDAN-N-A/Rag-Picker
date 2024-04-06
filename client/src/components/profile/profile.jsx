import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './profile.css'; // Import CSS file for styling
import LoadingImage from '../../assets/play.gif';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const loadingImage = 'https://cdn.dribbble.com/users/494229/screenshots/1601132/loadingicon14.gif'; // Replace 'https://example.com/loading.gif' with the actual URL of your loading image

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Retrieve the user email from sessionStorage
        const userEmail = sessionStorage.getItem('userEmail');
        if (!userEmail) {
          console.error('User email not found in session storage');
          return;
        }

        // Fetch user data from the backend server based on the user's email
        const response = await axios.get(`http://localhost:3001/profile?userEmail=${userEmail}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []); // Fetch user data only once when the component mounts

  return (
    <div className="profile-container">
      <h1>Profile Details</h1>
      {user ? (
        <div className="profile-details">
          <div className="profile-picture">
            {user.profilePicture && (
              <img src={`http://localhost:3001/profile-picture/${user._id}`} alt="Profile" className="round-image" />
            )}
          </div>
          <div className="profile-info">
            <div className="profile-item">
              <strong>Full Name:</strong> {user.fullName}
            </div>
            <div className="profile-item">
              <strong>Email:</strong> {user.email}
            </div>
            <div className="profile-item">
              <strong>Date of Birth:</strong> {user.dateOfBirth}
            </div>
            <div className="profile-item">
              <strong>Gender:</strong> {user.gender}
            </div>
            <div className="profile-item">
              <strong>Location:</strong> {user.city}, {user.state}, {user.country}
            </div>
            <div className="profile-item">
              <strong>Sports Interests:</strong> {user.sportsInterests.join(', ')}
            </div>
            <div className="profile-item">
              <strong>Skill Level:</strong> {user.skillLevel}
            </div>
            <div className="profile-item">
              <strong>Preferred Playing Times:</strong> {user.preferredPlayingTimes.join(', ')}
            </div>
            <div className="profile-item">
              <strong>Contact Number:</strong> {user.contactNumber}
            </div>
            <div className="profile-item">
              <strong>Social Media Profiles:</strong> {user.socialMediaProfiles}
            </div>
            <div className="profile-item">
              <strong>Bio:</strong> {user.bio}
            </div>
          </div>
        </div>
      ) : (
        <img src={loadingImage} alt="Loading" className="loading-image" />
      )}
    </div>
  );
};

export default ProfilePage;
