const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const RefreshToken = require("../models/RefreshToken");

const router = express.Router();

function generateAccessToken(userForToken) {
  return jwt.sign(
    { userDetails: userForToken },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );
}

// Login endpoint
router.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username: username });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Incorrect username or password" });
    }
    // Correct username and password
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      // To send specific fields. For entire user, just use "user".
      const userForToken = {
        _id: user._id,
        name: user.name,
        age: user.age,
        email: user.email,
        phone: user.phone,
        hobbies: user.hobbies,
        address: user.address,
      };

      // Generate access and refresh tokens
      const accessToken = generateAccessToken(userForToken);
      const refreshToken = jwt.sign(
        userForToken,
        process.env.REFRESH_TOKEN_SECRET
      );

      const refreshExpDate = new Date();
      refreshExpDate.setDate(refreshExpDate.getDate() + 1);

      // Save newly created Refresh Token to db
      const newRefreshToken = new RefreshToken({
        user: user._id,
        token: refreshToken,
        expiresAt: refreshExpDate,
      });
      await newRefreshToken.save();

      res.json({
        message: "Login Successful!",
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
    } else {
      res.status(401).json({ message: "Incorrect username or password" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error..." });
  }
});

// Refresh token endpoint
router.post("/api/refresh-token", async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken)
    return res.status(401).json({ message: "Refresh Token is required" });

  try {
    const storedToken = await RefreshToken.findOne({ token: refreshToken });
    if (!storedToken || storedToken.expiresAt < new Date()) {
      return res.status(403).json({ message: "Refresh token is invalid" });
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err)
        return res.status(403).json({ message: "Refresh token is not valid" });

      const newAccessToken = generateAccessToken({
        _id: user._id,
        name: user.name,
        age: user.age,
        email: user.email,
        phone: user.phone,
        hobbies: user.hobbies,
        address: user.address,
      });

      res.json({ accessToken: newAccessToken });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error..." });
  }
});

module.exports = router;
