const weatherRoutes=require("./routes/WeatherSearchRoute");
const saveWeather=require("./routes/SaveWeatherRoute");
const weatherReport=require("./routes/WeatherReport");
const authRoutes=require("./routes/authRoutes");
const bodyParser = require("body-parser");
const express=require("express");
const app=express();
const cors = require("cors");
app.use(cors());
app.use(bodyParser.json()); 
app.use("/",weatherRoutes);
app.use("/weather-report",weatherReport);
app.use("/auth",authRoutes);
app.use("/save-weather",saveWeather);
app.use(express.json());
app.listen(5000);

