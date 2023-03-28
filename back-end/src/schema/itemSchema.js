const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  id: Number,
  name: String,
  type: String,
  stock: Number,
  updatedAt: Date,
});

itemSchema.pre("save", (next) => {
  this.updatedAt = Date.now();
  next();
});

module.exports = new mongoose.model("item", itemSchema, "item");
