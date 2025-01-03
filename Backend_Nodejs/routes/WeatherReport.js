const express = require("express");
const router=express.Router();
const mysql=require("mysql2");
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

router.get('/weatherreport', (req,res)=>{
    try{
  const [rows]= db.query(`SELECT u.user_name, w.city, w.weather_info 
              FROM weather_logs w 
              JOIN users u ON w.user_id = u.id`);
          res.status(200).json(rows);
    }
    catch(error)
    {
      res.status(500).json({error:"failed to fetch weather report."});
    }
  });
  module.exports=router;