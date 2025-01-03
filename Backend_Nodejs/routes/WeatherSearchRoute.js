const express=require("express");
const axios=require("axios");
require("dotenv").config();
const router=express.Router();
router.get('/weather',async (req,res)=>{
    const city=req.query.city;
    const apiKey=process.env.WEATHER_API_KEY;
    const weatherUrl = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`; 
  if (!city) 
    {
    return res.status(400).json({ error: 'Please provide a city name.' });
    }
  try
  {
    const response = await axios.get(weatherUrl);
    res.json(response.data);
  } 
  catch (error)
  {
    res.status(500).json({ error: 'Unable to fetch weather.' });
  }
  });
  module.exports=router;