import React, { useState } from "react";
import axios from "axios";
import "../styles/Signup.css";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message,setMessage]=useState("");
  const [name,setName]=useState("");
  const [error, setError] = useState("");
  const [role, setRole] = useState("user");
  const navigate=useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
      const response = await axios.post("http://localhost:5000/auth/register", {name,
        username,
        password,role,
      });
        setName("");
        setPassword("");
        setRole("");
        setUsername("");
        setMessage("Registration Successful");
        setTimeout(() => {
        navigate("/login");
      }, 2000);
    } 
    catch (err) {     
      if (err.response && err.response.data && err.response.data.error) {
        alert("Error: " + err.response.data.error);
      } else 
      {
        alert("An unexpected error occurred.");
      }
    }
  };
  const redirectToHome = () => {
    navigate("/");
  };
  return (
    <div className="signup-container">
       <button className="home-button" onClick={redirectToHome}>
        Home
      </button>
       <h1 className="signup-heading">Sign Up</h1>
       {message && <div className="signup-message">{message}</div>}
       {error && <div className="signup-error">{error}</div>}
        <form className="signup-form" onSubmit={handleSubmit}>
       <input
       type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
      />
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        required
      >
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <button type="submit">Sign Up</button>
    </form>
    </div>);
};
export default Signup;