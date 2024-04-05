import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './components/signup/signup';
import Login from './components/login/login'; 
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProfilePage from './components/profile/profile';
import Navbar from './components/Navbar/navbar';
import Home from './components/Home/home';

function App() {
  const [userFullName, setUserFullName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    // Check if user is logged in from sessionStorage
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    const storedFullName = sessionStorage.getItem('userFullName');
    const storedEmail = sessionStorage.getItem('userEmail');

    if (isLoggedIn === 'true' && storedFullName && storedEmail) {
      setUserFullName(storedFullName);
      setUserEmail(storedEmail);
    }
  }, []);

  // Function to handle search query
  const handleSearch = async (searchTerm) => {
    // Perform search functionality here
    console.log('Perform search for:', searchTerm);
  };

  return (
    <BrowserRouter>
      {/* Pass userFullName, userEmail, and handleSearch function as props to Navbar */}
      <Navbar userFullName={userFullName} userEmail={userEmail} handleSearch={handleSearch} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup setUserFullName={setUserFullName} />} />
        {/* Pass setUserFullName and setUserEmail functions as props to Login component */}
        <Route path="/login" element={<Login setUserFullName={setUserFullName} setUserEmail={setUserEmail} />} />
        {/* ProfilePage component doesn't need userFullName or userEmail props */}
        <Route path="/profile/:userEmail" element={<ProfilePage />} /> {/* Pass userEmail as URL parameter */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
