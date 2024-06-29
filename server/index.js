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

// Register new user
app.use(registerRoute);

// Login Authentication
app.use(authRoute);

// API call from details-page
app.use(userDetailsRoute);

// Delete user
app.use(deleteRoute);

// Start server
const port = process.env.PORT;
app.listen(port, () => {
  console.log("Server is listening on port 5000...");
});
