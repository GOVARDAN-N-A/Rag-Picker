import React from 'react';
import './home.css';
import Footer from '../Footer/footer';
import Navbar from '../Navbar/navbar'; // Ensure the correct case for component name

const Home = () => {
  return (
    <div className='main'>
      <div className='content'>
        <h1> "Reach your sports <span>Goals</span> with our platform"</h1><br /><br />

        <h3> Unite | Engage | Triumph</h3> <br />

        <a href="/events"><button>Get started</button><br /></a>
        
      </div>
    </div>
    
  );
}

export default Home; // Ensure correct case for export and component name
