const express = require("express");
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const router=express.Router(); 
const mysql = require("mysql2");
require("dotenv").config();
const db=mysql.createConnection({
  host:process.env.DB_HOST,
  user:process.env.DB_USER,
  password:process.env.DB_PASSWORD,
  database:process.env.DB_NAME
});
db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.message);
    return;
  }
 // console.log('Database connection successful!');
});


// sign up route
router.post("/register", async (req, res) => {
    const { name, username, password,role } = req.body;
     db.query("SELECT * FROM users WHERE username = ?", [username], async (err, result) => {
      if (err) {  
        return res.status(500).json({ error: "Server error" });}
      if (result.length > 0) return res.status(400).json({ error: "User already exists" });
  try{
      const hashedPassword = await bcrypt.hash(password, 10);
      db.query("INSERT INTO users ( user_name, username, password, role) VALUES (?, ?, ?, ?)", [name, username, hashedPassword,role], 
        (err) => 
          {
             if (err) 
              {
              return res.status(500).json({ error: "Server error" });}
              res.status(200).json({ message: "User registered successfully" });
          }
        );}
        catch(err){
          console.error(err);
res.status(500).json({error:"Unexpected error occured"});
        }
    });
  });

  router.post("/login",async (req, res) => { 
    const secretKey=process.env.JWT_SECRET;
    const { username, password } = req.body;
    db.query("SELECT * FROM users WHERE username = ?", [username], async (err, result) => {
      if (err) return res.status(500).json({ error: "Server error" });
      if (result.length === 0) return res.status(400).json({ error: "User not found" });
      const user = result[0];
      try
      {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });
      //token generation
      const token = jwt.sign({ userId: user.id, userRole:user.role}, secretKey, { expiresIn: "1h" });
      res.status(200).json({ token });
        }
        catch(err)
        {
            res.status(500).json({ error: "Unexpected error occurred" });
        }
        });
    });
  module.exports=router;

  