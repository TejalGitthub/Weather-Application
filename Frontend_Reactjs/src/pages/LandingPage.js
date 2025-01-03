import React from "react";
import { useNavigate , useLocation} from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/Landing.css";
const LandingPage = () => {
  const navigate = useNavigate();
  const pageLocation = useLocation();
  const [logoutMessage, setLogoutMessage] = useState(pageLocation.state?.message || "");
  useEffect(() => {
    if (logoutMessage) {
      const timer = setTimeout(() => {
        setLogoutMessage(""); 
        navigate("/", { state: {} }); 
      }, 2000);
      return () => clearTimeout(timer); 
    }
  }, [logoutMessage, navigate]);
  const handleLoginClick = () => {
    navigate("/login");  
  };
  const handleSignUpClick = () => {
    navigate("/signup");  
  };
  return (
    <div className="container">
      <h1>Weather App</h1>
      {logoutMessage && <p>{logoutMessage}</p>}
      <div className="button-container">
        <button className="button" onClick={handleLoginClick} >
          Login
        </button>
        <button className="button" onClick={handleSignUpClick} >
          Sign Up
        </button>
      </div>
    </div>
  );
};
export default LandingPage;