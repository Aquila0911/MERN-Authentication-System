// Setup
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./src/config/db.js");
const authRoute = require("./src/routes/auth.js");
const userDetailsRoute = require('./src/routes/userDetails');
const registerRoute = require('./src/routes/register');
const deleteRoute = require('./src/routes/delete');

dotenv.config();
const app = express();
app.use(express.json());

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

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Server is listening on port 5000...");
});
