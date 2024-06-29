const jwt = require("jsonwebtoken");

// Middleware to validate token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer token

  if (token == null) return res.status(401).json({ message: "Access Denied. No token provided." }); // No token present

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Access Forbidden. Token invalid or expired." }); // Invalid token
    
    req.user = user;
    next(); // Proceed to the next middleware or route handler
  });
};

module.exports = verifyToken;
