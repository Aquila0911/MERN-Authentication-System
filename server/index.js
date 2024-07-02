// Setup
const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const connectDB = require("./src/config/db.js");
const authRoute = require("./src/routes/auth.js");
const userDetailsRoute = require('./src/routes/userDetails');
const registerRoute = require('./src/routes/register');
const deleteRoute = require('./src/routes/delete');
const healthRoute = require('./src/routes/renderHealth');

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

// If client sends a GET request to /api
app.get("/api", (req, res) => {
  res.json({ message: "/api says: Hello from server!" });
});

// Routes
app.use(registerRoute); // Register new user
app.use(authRoute); // Login Authentication
app.use(userDetailsRoute); // Users details
app.use(deleteRoute); // Delete user
app.use(healthRoute); // Health check for Render

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Server is listening on port 5000...");
});
