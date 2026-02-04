import { useState } from "react";
import React from "react";
import { Link , useNavigate} from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

const Login=()=>{
  const [email,setEmail]=useState("");
  const [password,setPassword]= useState("");
  const navigate = useNavigate();


  const handleLogin=async()=>{

    try{

      const res= await axios.post("http://localhost:5000/login",{
        email,password
      })

      localStorage.setItem("token",res.data.data.token);

      alert("Login successful");

      navigate("/calculate");
    }catch(err){
      alert("Login unSuccessful!")
    }
    
  }

  return(
    <div>
      <Navbar />
      <div className="container login-container">
        <h1>Welcome Back to EcoTrack</h1>
        <div className="form-container">
          <div className="form-group">
            <label>Email:</label>
            <input 
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Password:</label>
            <input 
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>

          <button onClick={handleLogin}>Login</button>

          <p style={{ textAlign: "center", marginTop: "1rem" }}>
            Don't have an account? <Link to="/signup">Signup</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login;