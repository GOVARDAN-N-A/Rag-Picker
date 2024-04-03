import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './profile.css'; // Import CSS file for styling

const ProfilePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Retrieve the user ID of the logged-in user from the authentication state
        const loggedInUserId = sessionStorage.getItem('userId'); // Assuming you stored the user ID in sessionStorage
        if (!loggedInUserId) {
          // Handle case where user ID is not found in the authentication state
          return;
        }

        // Fetch user data from the backend server based on the logged-in user's ID
        const response = await axios.get(`http://localhost:3001/profile/${loggedInUserId}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []); // Fetch user data only once when the component mounts

  return (
    <div className="profile-container">
      <h2>Profile Details</h2>
      {user ? (
        <div className="profile-details">
          <div className="profile-picture">
            {user.profilePicture && (
              <img src={`http://localhost:3001/profile-picture/${user._id}`} alt="Profile" className="round-image" />
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
