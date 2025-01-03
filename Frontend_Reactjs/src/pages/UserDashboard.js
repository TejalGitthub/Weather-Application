import React from "react";
import Weathercheck from "./Weathercheck";
import { useNavigate } from "react-router-dom";
import "../styles/UserDashboard.css";
export default function UserDashboard() {
    const navigate=useNavigate();
        const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId"); 
        navigate("/",{ state: { message: "You have successfully logged out!" } }); 
      };
  return (
       <div className="dashboard-container">
      <h1 className="dashboard-heading">Welcome, you are logged in!</h1>
      <Weathercheck></Weathercheck> 
      <button className="logout-button" onClick={handleLogout}>Logout</button>
    </div>
  );
}
