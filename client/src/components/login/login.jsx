import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ setUserFullName }) => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        try {
            const response = await axios.post('sportz-opal.vercel.app/login', formData);
            if (response.data.message === 'Login successful') {
                const { userFullName, userEmail } = response.data;
                sessionStorage.setItem('isLoggedIn', 'true');
                sessionStorage.setItem('userFullName', userFullName);
                sessionStorage.setItem('userEmail', userEmail); // Store user email in sessionStorage
                setUserFullName(userFullName);
                // Fetch user profile data based on user email after successful login
                const loggedInUserEmail = userEmail;
                const profileResponse = await axios.get(`sportz-opal.vercel.app/profile?userEmail=${loggedInUserEmail}`);
                // Handle profile data as needed
                console.log('User profile data:', profileResponse.data);
                navigate('/'); // Redirect to home page after successful login
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            setError(error.response.data.message);
        }
    };
    
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div style={{ background: 'rgba(206, 193, 201, 0.413)', padding: '40px', borderRadius: '20px', boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)', width: '80%', maxWidth: '400px', zIndex: '1000' }}>
                <h2 className="mb-4">Login</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '20px' }}>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} style={{ width: '100%', padding: '15px', border: '1px solid #ccc', borderRadius: '10px', background: '#f8f8f8', outline: 'none', transition: 'border-color 0.3s ease' }} placeholder="Email" required />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <input type="password" name="password" value={formData.password} onChange={handleChange} style={{ width: '100%', padding: '15px', border: '1px solid #ccc', borderRadius: '10px', background: '#f8f8f8', outline: 'none', transition: 'border-color 0.3s ease' }} placeholder="Password" required />
                    </div>
                    <button type="submit" style={{ width: '100%', padding: '15px', border: 'none', borderRadius: '10px', background: '#4b7bec', color: 'white', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', transition: 'background-color 0.3s ease, transform 0.2s ease' }}>Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
