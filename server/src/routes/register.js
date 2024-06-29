const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../models/User");

// Endpoint to create a new user
router.post("/api/register-user", async (req, res) => {
  try {
    const { username, name, email, password, phone, address, hobbies, age } = req.body;

    // Checking if unique username
    const existingUser = await User.findOne({ username: username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists!" });
    }

    // Hashing
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Creating new user document
    const newUser = new User({
      username,
      name,
      email,
      password: hashedPassword,
      phone, 
      address, 
      hobbies, 
      age, 
    });

    await newUser.save();

    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating user" });
  }
});

module.exports = router;
