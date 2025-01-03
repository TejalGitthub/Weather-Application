import React, { useState} from "react";
import axios from "axios";
import "../styles/Weather.css";
export default function Weathercheck() 
{
    const [weather,setWeather]=useState("");
    const [city,setCity]=useState(null);
    const [error,setError]=useState();
    const fetchWeather = async () => {
      const userId=localStorage.getItem("userId");
      try {
        if (!city) {
          setError('Please enter a city name.');
          return;
      } 
        const response = await axios.get('http://localhost:5000/weather', {
          params: { city}});
        setWeather(response.data);
        setError('');    
        await axios.post('http://localhost:5000/save-weather/saveweather', {
         userId:userId,
         cityName:city,
         weatherInfo:response.data
      },
      {
        headers:
        {
          'Content-Type':'application/json'
        }
      });
      } 
      catch (err)
       {
        setError('Unable to fetch weather data. Please try again.');
      }
    };
    return (
      <div className="weather-container">
        <h1>Weather App</h1>
        <div>
          <input
          className="weather-input"
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={fetchWeather}>
            Get Weather
          </button>
        </div>
        {error && <p className="error-message">{error}</p>}
        {weather && (
          <div className="weather-info">
            <h2>
              {weather.location.name}, {weather.location.country}
            </h2>
            <p>
              <b>Temperature:</b> {weather.current.temperature}°C
            </p>
            <p>
              <b>Weather:</b> {weather.current.weather_descriptions[0]}
            </p>
            <p>
              <b>Humidity:</b> {weather.current.humidity}%
            </p>
            <p>
              <b>Wind Speed:</b> {weather.current.wind_speed} km/h
            </p>
          </div>
        )}
      </div>
    );
  };
 