import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './navbar.css';
import { FaSearch } from 'react-icons/fa'; // Import search icon from react-icons library
import logo from '../../assets/logo.png';
function Navbar({ userFullName, userId }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    sessionStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  const handleChange = async (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    try {
      // Make API request to fetch suggestions based on the search term
      const response = await axios.get(`http://localhost:3001/search?term=${term}`);
      setSuggestions(response.data.suggestions);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform the actual search or navigation based on the selected suggestion
    // You can implement this based on your application's logic
    console.log('Perform search for:', searchTerm);
  };

  const handleSuggestionClick = (suggestion) => {
    // Set the selected suggestion as the search term
    setSearchTerm(suggestion);
    // Clear suggestions
    setSuggestions([]);
    // Perform the actual search or navigation based on the selected suggestion
    console.log('Perform search for:', suggestion);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center" to="/" onClick={closeDropdown}>
          <img src={logo} alt="Logo" width="45" height="35" className="mr-2" />
          <span className="font-italic" style={{ fontWeight: '900', fontStyle: 'italic', fontSize: '1.5rem'  }}>Sportz</span>
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
                  {userFullName}
                </button>
                <div className={`dropdown-menu${dropdownOpen ? ' show' : ''}`} aria-labelledby="navbarDropdown">
                  <Link className="dropdown-item" to={`/profile/${userId}`} onClick={closeDropdown}>Profile</Link>
                  <button className="dropdown-item" onClick={() => { handleLogout(); closeDropdown(); }}>Logout</button>
                </div>
              </li>
            )}
          </ul>
          <form className="d-flex align-items-center" onSubmit={handleSubmit}>
            <input 
              type="text" 
              className="form-control me-2" 
              placeholder="Search" 
              value={searchTerm} 
              onChange={handleChange} 
              style={{ width: '250px' }} // Increase the size of search bar
            />
            <div style={{ height: '38px' }}> {/* Match the height of the search bar */}
              <button className="btn btn-outline-secondary" type="submit" style={{ padding: '6px' }}>
                <FaSearch style={{ height: '100%' }} /> {/* Search icon */}
              </button>
            </div>
            {/* Display suggestions */}
            {suggestions.length > 0 && (
              <ul className="suggestions">
                {suggestions.map((suggestion, index) => (
                  <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
