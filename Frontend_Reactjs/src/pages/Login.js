import React, { useState } from "react";
import axios from "axios";
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from "react-router-dom";
import  "../styles/Login.css";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error,setError]=useState("");
  const navigate=useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();console.log("Login button clicked");
    try {
      const response = await axios.post("http://localhost:5000/auth/login",
       { username, password });
       console.log('Response from backend:', response);
      const { token } = response.data;
      if (response && response.data) 
        { 
       if (token) {
          const decoded=jwtDecode(token);
          const userId=decoded.userId;
          const userRole=decoded.userRole;
          localStorage.setItem("userId",userId);
        if(userRole==='admin')
        {  
          navigate("/admin-dashboard");}
        else {
            navigate("/user-dashboard");  }
        } 
        else {
          setError("No token received from server.");
        }
      } 
      else
      {
        setError("Unexpected response from server.");
      }
     
    } 
    catch (err) 
    {
      const errorMessage =
        err.response?.data?.error || "An unexpected error occurred.";
        setError(errorMessage);
       console.error("Error during login:", errorMessage);
    }
  };
  const redirectToHome = () => {
    navigate("/");
  };
  return (
    <div className="login-container">
    <button className="home-button" onClick={redirectToHome}>
        Home
      </button>
    <form onSubmit={handleSubmit} className="form">
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username" 
        className="input"
        required
      />
      <input
        type="password"
        className="input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit" className="button">Login</button>
      {error && <div className="error-message">{error}</div>}
    </form></div>
  );
};
export default Login;