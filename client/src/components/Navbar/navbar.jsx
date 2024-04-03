import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Update import to include useNavigate
import axios from 'axios';
import './navbar.css';

function Navbar() {
  const [userFullName, setUserFullName] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/profile/');
        setUserFullName(response.data.fullName);
      } catch (error) {
        console.error('Error fetching user information:', error);
        // Handle error (e.g., show error message or redirect to error page)
      }
    };

    fetchUserData();
  }, [userFullName]);

  const handleLogout = () => {
    sessionStorage.removeItem('isLoggedIn');
    navigate('/login'); // Redirect to login page upon logout
  };

  return (
    <div className='header'>
      <Link to="/">{userFullName ? `Welcome, ${userFullName}` : 'Home'}</Link>
      {userFullName ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <Link to="/login">Login</Link>
      )}
      <Link to="/signup">Sign up</Link>
      <Link to="/community">Community</Link>
    </div>
  );
}

export default Navbar;
