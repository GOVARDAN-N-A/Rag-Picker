import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './login.css'; // Import the CSS file for styling

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
    const navigate = useNavigate();

    useEffect(() => {
        const checkLoggedInStatus = () => {
            // Check if user is already logged in by reading from sessionStorage
            const loggedIn = sessionStorage.getItem('isLoggedIn');
            if (loggedIn === 'true') {
                setIsLoggedIn(true);
            }
        };

        checkLoggedInStatus();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3001/login', formData);
            console.log(response.data); // Handle successful login
            if (response.data.message === 'Login successful') {
                setIsLoggedIn(true);
                sessionStorage.setItem('isLoggedIn', 'true'); // Store login status in sessionStorage
                navigate('/signup'); // Redirect to profile page after successful login
            }
        } catch (error) {
            console.error(error.response.data.message); // Handle login error
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        sessionStorage.removeItem('isLoggedIn'); // Remove login status from sessionStorage
        // You may also want to clear other session data if needed
    };

    if (isLoggedIn) {
        return (
            <div className="container">
                <div className="login-container">
                    <h2>Welcome, user!</h2>
                    <button onClick={handleLogout} className="btn">Logout</button>
                </div>
            </div>
        );
    }

    return (
        <div className="container">
            <div className="login-container">
                <h2 className="mb-4">Login</h2>
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
