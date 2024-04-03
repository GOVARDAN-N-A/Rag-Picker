import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook for navigation
import './login.css';

const Login = ({ setUserFullName }) => { // Pass setUserFullName as prop
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Initialize useNavigate hook

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3001/login', formData);
            if (response.data.message === 'Login successful') {
                sessionStorage.setItem('isLoggedIn', 'true');
                setUserFullName(response.data.userFullName); // Update userFullName state
                navigate('/'); // Redirect to home page upon successful login
            }
        } catch (error) {
            setError(error.response.data.message); // Display error message to the user
        }
    };

    return (
        <div className="container">
            <div className="login-container">
                <h2 className="mb-4">Login</h2>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input type="email" name="email" value={formData.email} onChange={handleChange} className="input-field" placeholder="Email" required />
                    </div>
                    <div className="input-group">
                        <input type="password" name="password" value={formData.password} onChange={handleChange} className="input-field" placeholder="Password" required />
                    </div>
                    <button type="submit" className="btn">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
