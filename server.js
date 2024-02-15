require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const db = require("./src/db");
const deviceRouter = require("./src/controllers/device");

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

// Allow CORS for both HTTP and HTTPS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Mount deviceRouter for API routes
app.use("/api", deviceRouter);

// Connect to the database and start the server
app.listen(port, async () => {
  await db.connect();
  console.log(`Server is running on port ${port}`);
});
