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
    window.location.reload()
    navigate('/');
  };

  const handleChange = async (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    try {
      const response = await axios.get(`sportz-opal.vercel.app/search?city=${term}`);
      setSuggestions(response.data.users); // Assuming the response returns an array of user objects with profilePicture and fullName fields
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/searched-profile/${searchTerm}`);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setSuggestions([]);
    navigate(`/searched-profile/${suggestion}`); // Navigate to SearchedUserProfilePage with city name
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
                  <Link className="nav-link" to="/login" state={{ from: window.location.pathname }}>Login</Link>
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
          <form className="d-flex align-items-center search-form" onSubmit={handleSubmit}>
            <div ref={searchContainerRef} className="position-relative">
              <input
                type="text"
                className="form-control me-2 search-input"
                style={{border: '1px solid black'}}
                placeholder="Search by City"
                value={searchTerm}
                onChange={handleChange}
              />
              <button className="btn btn-outline-secondary search-btn" type="submit">
                <FaSearch className="search-icon" />
              </button>
              {suggestions.length > 0 && (
                <ul className="suggestions-dropdown">
                  {suggestions.map((suggestion, index) => (
                    <SuggestionItem
                      key={index}
                      profilePicture={suggestion.profilePicture}
                      fullName={suggestion.fullName}
                      onClick={() => handleSuggestionClick(suggestion.fullName)}
                    />
                  ))}
                </ul>
              )}
            </div>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
