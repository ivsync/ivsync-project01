// app.js
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Device = require("./Device"); // Import the Device model
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware for JSON responses
app.use((req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  next();
});

// Root API
app.get("/api", (req, res) => {
  res.json({ message: "Welcome to ivsync - Your Health Partner" });
});

// Create (POST)
app.post("/api/devices", async (req, res) => {
  try {
    const device = await Device.create(req.body);
    res.status(201).json(device);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database error" });
  }
});

// Read All (GET)
app.get("/api/devices", async (req, res) => {
  try {
    const devices = await Device.find();
    res.json(devices);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database error" });
  }
});

// Read One (GET) using dev_id
app.get("/api/devices/:dev_id", async (req, res) => {
  try {
    const device = await Device.findOne({ dev_id: req.params.dev_id });
    if (device) {
      res.json(device);
    } else {
      res.status(404).json({ error: "Device not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database error" });
  }
});

// Update (PUT)
app.put("/api/devices/:id", async (req, res) => {
  try {
    const device = await Device.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (device) {
      res.json(device);
    } else {
      res.status(404).json({ error: "Device not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database error" });
  }
});

// Delete (DELETE)
app.delete("/api/devices/:id", async (req, res) => {
  try {
    await Device.findByIdAndDelete(req.params.id);
    res.json({ message: "Device deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
