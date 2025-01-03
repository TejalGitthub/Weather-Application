import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/WeatherReport.css";
const WeatherReport = ({onClose}) => {
  const [weatherReports, setWeatherReports] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchWeatherReports = async () => {
      try {
        const response = await axios.get("http://localhost:5000/weather-report/weatherreport");
        setWeatherReports(response.data); 
      } catch (err) {
        setError("Failed to fetch weather reports.");
      }
    };
    fetchWeatherReports();
  }, []);
  return (
    <div className="weather-check-container">
        <button className="close-button" onClick={onClose} >
        Close
      </button>
      <h1 className="weather-check-heading">Weather Reports</h1>
      {error && <p className="weather-check-error">{error}</p>}
      {weatherReports.length > 0 ? (
        <table className="weather-check-table">
          <thead>
            <tr>
              <th>User's Name</th>
              <th>City Searched For</th>
              <th>Temperature</th>
              <th>Humidity</th>
              <th>Weather Description</th>
            </tr>
          </thead>
          <tbody>
            {weatherReports.map((report, index) => (
              <tr key={index}>
                <td>{report.user_name}</td>
                <td>{report.city}</td>
                <td>{report.weather_info.temperature}</td>
                <td>{report.weather_info.humidity}</td>
                <td>{report.weather_info.weather_descriptions}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No weather reports available.</p>
      )}
    </div>
  );
};
export default WeatherReport;