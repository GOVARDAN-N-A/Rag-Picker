// App.js

import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/navbar';
import Home from './components/Home/home';
import ProfilePage from './components/profile/profile'; // Import ProfilePage component
import SearchedUserProfilePage from './components/SearchedUserProfilePage/SearchedUserProfilePage';
import Signup from './components//signup/signup';
import Login from './components/login/login';
import Chat from './components/chat/chatApp'; // Import Chat component

function App() {
  const [userFullName, setUserFullName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    const storedFullName = sessionStorage.getItem('userFullName');
    const storedEmail = sessionStorage.getItem('userEmail');

    if (isLoggedIn === 'true' && storedFullName && storedEmail) {
      setUserFullName(storedFullName);
      setUserEmail(storedEmail);
    }
  }, []);

  const handleSearch = async (searchTerm, location) => {
    console.log('Perform search for:', searchTerm, 'in', location);
    // Perform search operation using searchTerm and location
  };

  return (
    <BrowserRouter>
      <Navbar userFullName={userFullName} userEmail={userEmail} handleSearch={handleSearch} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup setUserFullName={setUserFullName} />} />
        <Route path="/login" element={<Login setUserFullName={setUserFullName} setUserEmail={setUserEmail} />} />
        <Route path="/profile/:userEmail" element={<ProfilePage />} /> {/* Route for viewing own profile */}
        <Route path="/searched-profile/:city" element={<SearchedUserProfilePage />} />
        <Route path="/chat" element={<Chat userEmail={userEmail} />} /> {/* Route for the chat component */}
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
