import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './signup.css'; // Import the CSS file for styling

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    profilePicture: null,
    dateOfBirth: '',
    gender: '',
    city: '', // Add city field
    state: '', // Add state field
    country: '', // Add country field
    sportsInterests: [],
    skillLevel: '',
    preferredPlayingTimes: [],
    contactNumber: '',
    socialMediaProfiles: '',
    bio: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleInterestsChange = (e) => {
    const { value } = e.target;
    const updatedInterests = formData.sportsInterests.includes(value)
      ? formData.sportsInterests.filter((interest) => interest !== value)
      : [...formData.sportsInterests, value];
    setFormData({ ...formData, sportsInterests: updatedInterests });
  };

  const handleTimesChange = (e) => {
    const { value } = e.target;
    const updatedTimes = formData.preferredPlayingTimes.includes(value)
      ? formData.preferredPlayingTimes.filter((time) => time !== value)
      : [...formData.preferredPlayingTimes, value];
    setFormData({ ...formData, preferredPlayingTimes: updatedTimes });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, profilePicture: file }); // Store the File object in state
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData(); // Create a FormData object to send files
    // Append all form data to FormData object
    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'profilePicture') {
        formDataToSend.append(key, value); // Append the profile picture file
      } else if (Array.isArray(value)) {
        value.forEach(item => formDataToSend.append(key, item)); // Handle array values
      } else {
        formDataToSend.append(key, value); // Append other form fields
      }
    });
    
    try {
      const response = await axios.post('sportz-opal.vercel.app/signup', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data' // Set content type for FormData
        }
      });
      console.log(response.data);
      navigate('/login');
    } catch (error) {
      console.error('Error:', error);
      // Handle form submission error here
    }
  };

  return (
    <section className="signup-section">
      <div className="signup-container">
        <div className="signup-content">
          <h1 className="signup-heading">Join the Sports Community</h1>
          <div className="signup-card">
            <div className="signup-card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="fullName">Full Name</label>
                  <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="form-control" placeholder="Enter your full name" required />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control" placeholder="example@example.com" required />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input type="password" name="password" value={formData.password} onChange={handleChange} className="form-control" placeholder="Enter your password" required />
                </div>

                <div className="form-group">
                  <label htmlFor="profilePicture">Profile Picture</label>
                  <input type="file" name="profilePicture" onChange={handleFileChange} className="form-control" accept="image/*" required />
                  {formData.profilePicture && <img src={URL.createObjectURL(formData.profilePicture)} alt="Profile" className="preview-image" />}
                </div>

                <div className="form-group">
                  <label htmlFor="dateOfBirth">Date of Birth</label>
                  <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} className="form-control" required />
                </div>

                <div className="form-group">
                  <label htmlFor="gender">Gender</label>
                  <select name="gender" value={formData.gender} onChange={handleChange} className="form-control" required>
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="city">City</label>
                  <input type="text" name="city" value={formData.city} onChange={handleChange} className="form-control" placeholder="Enter your city" required />
                </div>
                
                <div className="form-group">
                  <label htmlFor="state">State</label>
                  <input type="text" name="state" value={formData.state} onChange={handleChange} className="form-control" placeholder="Enter your state" required />
                </div>

                <div className="form-group">
                  <label htmlFor="country">Country</label>
                  <input type="text" name="country" value={formData.country} onChange={handleChange} className="form-control" placeholder="Enter your country" required />
                </div>

                <div className="form-group">
                  <label htmlFor="sportsInterests">Sports Interests</label>
                  {['Football', 'Basketball', 'Tennis', 'Soccer', 'Baseball', 'Golf', 'Swimming', 'Cycling', 'Running', 'Volleyball', 'Cricket', 'Martial Arts'].map(sport => (
                    <div key={sport} className="form-check">
                      <input type="checkbox" name="sportsInterests" value={sport.toLowerCase()} onChange={handleInterestsChange} className="form-check-input" />
                      <label className="form-check-label">{sport}</label>
                    </div>
                  ))}
                </div>

                <div className="form-group">
                  <label htmlFor="skillLevel">Skill Level</label>
                  <select name="skillLevel" value={formData.skillLevel} onChange={handleChange} className="form-control" required>
                    <option value="">Select Skill Level</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="preferredPlayingTimes">Preferred Playing Times</label>
                  <div>
                    <div className="form-check">
                      <input type="checkbox" name="preferredPlayingTimes" value="mornings" onChange={handleTimesChange} className="form-check-input" />
                      <label className="form-check-label">Mornings</label>
                    </div>
                    <div className="form-check">
                      <input type="checkbox" name="preferredPlayingTimes" value="afternoons" onChange={handleTimesChange} className="form-check-input" />
                      <label className="form-check-label">Afternoons</label>
                    </div>
                    <div className="form-check">
                      <input type="checkbox" name="preferredPlayingTimes" value="evenings" onChange={handleTimesChange} className="form-check-input" />
                      <label className="form-check-label">Evenings</label>
                    </div>
                    <div className="form-check">
                      <input type="checkbox" name="preferredPlayingTimes" value="weekdays" onChange={handleTimesChange} className="form-check-input" />
                      <label className="form-check-label">Weekdays</label>
                    </div>
                    <div className="form-check">
                      <input type="checkbox" name="preferredPlayingTimes" value="weekends" onChange={handleTimesChange} className="form-check-input" />
                      <label className="form-check-label">Weekends</label>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="contactNumber">Contact Number</label>
                  <input type="text" name="contactNumber" value={formData.contactNumber} onChange={handleChange} className="form-control" placeholder="Enter your contact number" />
                </div>

                <div className="form-group">
                  <label htmlFor="socialMediaProfiles">Social Media Profiles</label>
                  <input type="text" name="socialMediaProfiles" value={formData.socialMediaProfiles} onChange={handleChange} className="form-control" placeholder="Enter your social media profiles" />
                </div>

                <div className="form-group">
                  <label htmlFor="bio">Bio/Introduction</label>
                  <textarea name="bio" value={formData.bio} onChange={handleChange} className="form-control" rows="3" placeholder="Write a short bio or introduction"></textarea>
                </div>

                <button type="submit" className="btn btn-primary">Sign Up</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
