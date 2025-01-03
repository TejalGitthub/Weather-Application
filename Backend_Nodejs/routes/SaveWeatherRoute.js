const express=require("express");
const router=express.Router();
const mysql=require("mysql2");
require("dotenv").config();
const db=mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME
});
db.connect((err)=>{
    if (err) {
        console.error('Database connection failed:', err.message);
        return;
      }
});
router.post('/saveweather', (req, res) => {
  const { userId, cityName, weatherInfo } = req.body;
  if (!userId || !cityName || !weatherInfo) {
      return res.status(400).json({ error: 'Missing required fields' });
  }
  try {
    const { temperature, humidity, weather_descriptions } = weatherInfo.current;
    const simplifiedWeatherInfo = {
      temperature,
      humidity,
      weather_descriptions: weather_descriptions[0], 
    };   
       db.query(
          'INSERT INTO weather_logs (user_id, city, weather_info) VALUES (?, ?, ?)',
          [userId, cityName, JSON.stringify(simplifiedWeatherInfo)]
      );
      }
   catch (error) 
   {
      res.status(500);
   }
});
module.exports=router;