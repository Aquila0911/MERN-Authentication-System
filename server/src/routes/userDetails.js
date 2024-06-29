const express = require("express");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

// User details endpoint
router.post("/api/user-details", verifyToken, (req, res) => {
  if (!req.user) {
    return res.status(404).json({ message: "User not found!" });
  }
  res.json({ user: req.user });
});

module.exports = router;
