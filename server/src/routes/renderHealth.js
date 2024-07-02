const express = require("express");
const router = express.Router();

app.get("/healthz", (req, res) => {
  res.status(200).send("OK");
});

module.exports = router;
