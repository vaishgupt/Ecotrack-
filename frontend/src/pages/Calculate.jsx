import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

const Calculate = () => {
  const navigate = useNavigate();
  
  // State variables to store form data
  const [transportation, setTransportation] = useState("");
  const [distance, setDistance] = useState("");
  const [electricity, setElectricity] = useState("");
  const [diet, setDiet] = useState("");
  
  // State for result and loading
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Check if user is logged in when component loads
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // If no token, redirect to login page
      navigate("/login");
    }
  }, [navigate]);

  // Function to handle form submission
  const handleCalculate = async () => {
    try {
      // Clear previous errors
      setError("");
      setResult(null);
      
      // Get token from localStorage
      const token = localStorage.getItem("token");
      
      // If no token, redirect to login
      if (!token) {
        alert("Please login first");
        navigate("/login");
        return;
      }

      // Show loading state
      setLoading(true);

      // Make API call to backend
      const res = await axios.post(
        "http://localhost:5000/api/calculate",
        {
          transportation,
          distance,
          electricity,
          diet
        },
        {
          headers: {
            Authorization: `Bearer ${token}`  // Send token in header
          }
        }
      );

      // If successful, set the result
      setResult(res.data.data);
      setLoading(false);
      
    } catch (err) {
      // Handle errors
      setLoading(false);
      
      if (err.response) {
        // Server responded with error
        setError(err.response.data.message || "Calculation failed");
        alert(err.response.data.message || "Calculation failed");
      } else {
        // Network error or other issue
        setError("Network error. Please try again.");
        alert("Network error. Please try again.");
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <h1 className="calculate-heading">Calculate Your Carbon Footprint</h1>

        <div className="form-container">
          <div className="form-group">
            <label>Transportation Type:</label>
            <select
              value={transportation}
              onChange={(e) => setTransportation(e.target.value)}
            >
              <option value="">Select...</option>
              <option value="car">Car</option>
              <option value="bus">Bus</option>
              <option value="train">Train</option>
              <option value="plane">Plane</option>
            </select>
          </div>

          <div className="form-group">
            <label>Distance (km):</label>
            <input
              type="number"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              placeholder="Enter distance"
            />
          </div>

          <div className="form-group">
            <label>Electricity Usage (kWh):</label>
            <input
              type="number"
              value={electricity}
              onChange={(e) => setElectricity(e.target.value)}
              placeholder="Enter electricity usage"
            />
          </div>

          <div className="form-group">
            <label>Food:</label>
            <select
              value={diet}
              onChange={(e) => setDiet(e.target.value)}
            >
              <option value="">Select...</option>
              <option value="vegan">Vegan</option>
              <option value="non-veg">Non-Vegan</option>
            </select>
          </div>

          <button onClick={handleCalculate} disabled={loading}>
            {loading ? "Calculating..." : "Calculate"}
          </button>

          {/* Show error if any */}
          {error && <div className="error-message">Error: {error}</div>}

          {/* Show result if calculation is successful */}
          {result && (
            <div className="result-container">
              <h2>Calculation Result</h2>
              <p><strong>Transportation:</strong> {result.transportation}</p>
              <p><strong>Distance:</strong> {result.distance} km</p>
              <p><strong>Electricity:</strong> {result.electricity} kWh</p>
              <p><strong>Diet:</strong> {result.diet}</p>
              <h3>Total Carbon Footprint: {result.carbonFootprint} kg CO2</h3>
              <p><small>Date: {new Date(result.date).toLocaleString()}</small></p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Calculate;
