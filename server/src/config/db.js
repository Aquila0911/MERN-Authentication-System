const mongoose = require("mongoose");

const connectDB = async () => {
  mongoose
    .connect("mongodb://localhost:27017/thetaonedb")
    .then(() => console.log("Connected to database!"))
    .catch((err) => console.error("Error connecting to database: ", err));
};

module.exports = connectDB;
