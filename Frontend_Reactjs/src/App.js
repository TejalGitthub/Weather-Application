import React from "react";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
const App = () => {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<LandingPage />} />  
      <Route path="/login" element={<Login />} /> 
      <Route path="/signup" element={<Signup />} />  
      <Route path="/admin-dashboard" element={<AdminDashboard/>}/>
      <Route path="/user-dashboard" element={<UserDashboard/>}/>
    </Routes>
  </Router>
  );
};
export default App;