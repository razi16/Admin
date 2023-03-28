const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  id: Number,
  name: String,
  email: String,
  password: String,
});

module.exports = new mongoose.model("admin", adminSchema, "admin");
