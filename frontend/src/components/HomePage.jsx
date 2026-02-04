import React from 'react';
import { useNavigate } from 'react-router-dom';
import greenery from '../assets/greenery.jpg';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="home-container">
        <div className="home-content">
          <h1>Measure. Reduce. Live Greener.</h1>
          <p>Track your daily carbon footprint .</p>
          <button onClick={() => navigate("/calculate")}>Start Calculating</button>
        </div>

        <div className="home-image">
          <img src={greenery} alt="Greenery" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
