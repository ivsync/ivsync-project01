// app.js
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const db = require("./src/db");
const deviceRouter = require('./src/controllers/device');


const app = express();
const port = process.env.PORT || 5000;


app.use(bodyParser.json());


// Middleware for JSON responses
app.use((req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  next();
});

// Root API
app.get("/", (req, res) => {
  res.json({ message: "Welcome to ivsync - Your Health Partner" });
});


app.use('/api', deviceRouter);


app.listen(port, async () => {
  await db.connect();
  console.log(`Server is running on port ${port}`);
});
