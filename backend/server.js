require("dotenv").config();

const express = require("express");
const cors = require("cors");
const db = require("./config/db");
const studentRoutes = require("./routes/studentRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/students", studentRoutes);

// Test Route
app.get("/", (req, res) => {
    res.send("🚀 Student Management Backend is Running...");
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});