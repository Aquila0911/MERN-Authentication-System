const mongoose = require("mongoose");

const connectDB = async () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to database..."))
    .catch((err) => console.error("Error connecting to database: ", err));
};

module.exports = connectDB;
