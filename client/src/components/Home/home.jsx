import React from 'react';
import './home.css';
import Navbar from '../Navbar/navbar'; // Ensure the correct case for component name

const Home = () => {
  return (
    <div className='main'>
      <div className='content'>
        <h1> "Reach your sports <span>Goals</span> with our platform"</h1><br /><br />

        <h3> Unite | Engage | Triumph</h3> <br />

        <button>Get started</button><br />
        
      </div>
    </div>
  );
}

export default Home; // Ensure correct case for export and component name
