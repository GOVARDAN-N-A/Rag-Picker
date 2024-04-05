import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './navbar.css';
import { FaSearch } from 'react-icons/fa';
import logo from '../../assets/logo.png';

const SuggestionItem = ({ profilePicture, fullName, onClick }) => (
  <li onClick={onClick} className="suggestion-item">
    <img src={profilePicture} alt="Profile" className="profile-image-small" />
    <span className="username">{fullName}</span>
  </li>
);

function Navbar({ userFullName, userId }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const searchContainerRef = useRef(null);

  const handleLogout = () => {
    sessionStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  const handleChange = async (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    try {
      const response = await axios.get(`http://localhost:3001/search?term=${term}`);
      setSuggestions(response.data.suggestions);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Perform search for:', searchTerm);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setSuggestions([]);
    console.log('Perform search for:', suggestion);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
      setSuggestions([]);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center" to="/" onClick={closeDropdown}>
          <img src={logo} alt="Logo" width="45" height="35" className="mr-2" />
          <span className="font-italic" style={{ fontWeight: '900', fontStyle: 'italic', fontSize: '1.5rem' }}>Sportz</span>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" onClick={toggleDropdown}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse justify-content-end${dropdownOpen ? ' show' : ''}`} id="navbarNav">
          <ul className="navbar-nav">
            {!userFullName && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">Signup</Link>
                </li>
              </>
            )}
            {userFullName && (
              <li className="nav-item dropdown">
                <button className="nav-link dropdown-toggle" onClick={toggleDropdown}>
                  <span className="bold-username">{userFullName}</span>
                </button>
                <div className={`dropdown-menu${dropdownOpen ? ' show' : ''}`} aria-labelledby="navbarDropdown">
                  <Link className="dropdown-item" to={`/profile/${userId}`} onClick={closeDropdown}>Profile</Link>
                  <button className="dropdown-item" onClick={() => { handleLogout(); closeDropdown(); }}>Logout</button>
                </div>
              </li>
            )}
          </ul>
          <form className="d-flex align-items-center" onSubmit={handleSubmit}>
            <div ref={searchContainerRef} className="position-relative">
              <input
                type="text"
                className="form-control me-2"
                placeholder="Search"
                value={searchTerm}
                onChange={handleChange}
                style={{ width: '250px' }}
              />
              {suggestions.length > 0 && (
                <ul className="suggestions-dropdown">
                  {suggestions.map((suggestion, index) => (
                    <SuggestionItem
                      key={index}
                      profilePicture={`http://localhost:3001/profile-picture/${suggestion._id}`}
                      fullName={suggestion.fullName}
                      onClick={() => handleSuggestionClick(suggestion.fullName)}
                    />
                  ))}
                </ul>
              )}
            </div>
            <div style={{ height: '38px' }}>
              <button className="btn btn-outline-secondary" type="submit" style={{ padding: '6px' }}>
                <FaSearch style={{ height: '100%' }} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
