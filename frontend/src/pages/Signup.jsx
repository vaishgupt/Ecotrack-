import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

const Signup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async() => {
    try{
      const res= await axios.post("http://localhost:5000/signup",{
        name,email,password
      })

      // Save token to localStorage (auto-login after signup)
      if (res.data.data.token) {
        localStorage.setItem("token", res.data.data.token);
        alert("User Registered Successfully!");
        navigate("/calculate");
      } else {
        alert("User Registered Successfully! Please login.");
        navigate("/login");
      }
    }catch(err){
      // Check if user is already registered
      if (err.response?.data?.message === "User already exists") {
        alert("User already registered. Please login.");
        navigate("/login");
      } else {
        alert(err.response?.data?.message || "Signup failed");
        console.log(err.message);
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container signup-container">
        <h1>EcoTrack</h1>

        <div className="form-container">
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />
          </div>

          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>

          <button onClick={handleSignup}>Sign Up</button>

          <p style={{ textAlign: "center", marginTop: "1rem" }}>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
