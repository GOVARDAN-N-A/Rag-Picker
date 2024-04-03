import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './components/signup/signup';
import Login from './components/login/login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProfilePage from './components/profile/profile';
import Navbar from './components/Navbar/navbar';
import Home from './components/Home/home';

function App() {
  // State to store user ID and full name
  const [userId, setUserId] = useState('');
  const [userFullName, setUserFullName] = useState('');

  // Function to set the user ID and full name when it's available
  const handleSetUser = (id, fullName) => {
    setUserId(id);
    setUserFullName(fullName);
  }

  return (
    <BrowserRouter>
      <Navbar userId={userId} userFullName={userFullName} /> {/* Pass userId and userFullName as props to Navbar */}
      <Routes>
        <Route path="/" element={<Home />} /> {/* Render Home component when URL is '/' */}
        <Route path="/signup" element={<Signup />} />
        {/* Pass handleSetUser function as prop to Login component */}
        <Route path="/login" element={<Login setUserId={setUserId} setUserFullName={setUserFullName} />} />
        {/* Pass userId as prop to ProfilePage component */}
        <Route path="/profile" element={<ProfilePage userId={userId} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
