const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  hobbies: { type: [String], required: true },
  address: {
    state: { type: String, required: true },
    city: { type: String, required: true },
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
  },
  phone: {
    prefix: { type: String, required: true },
    number: { type: String, required: true },
  },
  username: { type: String, required: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model("User", userSchema);
