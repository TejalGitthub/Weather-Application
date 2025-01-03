import React, { useState } from "react";
import WeatherReport from "./WeatherReport";
import { useNavigate } from "react-router-dom";
import "../styles/AdminDashboard.css";
const AdminDashboard = () => {
const [showWeatherReport, setShowWeatherReport] = useState(false);
const navigate=useNavigate();
const handleSearchReports = () => {
setShowWeatherReport(true); 
};
  const handleClose=()=>{
  setShowWeatherReport(false);
  }
  const handleLogout = () => {
    localStorage.removeItem("token"); 
    localStorage.removeItem("userId"); 
    navigate("/",{ state: { message: "You have successfully logged out!" } });
  };
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-heading">Admin Dashboard</h1>
      <div className="dashboard-actions">
      <button className="dashboard-button" onClick={handleSearchReports}>Search Reports</button>
      <button className="dashboard-button" onClick={handleLogout}>Logout</button>
      </div>
      {showWeatherReport && <WeatherReport onClose={handleClose}></WeatherReport>}
    </div>
  );
};
export default AdminDashboard;