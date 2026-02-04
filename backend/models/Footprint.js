const mongoose = require("mongoose");

// This is the schema (structure) for storing carbon footprint data in the database
const footprintSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true  // Every footprint must belong to a user
  },
  transportation: {
    type: String,
    required: true  // Required field - user must fill this
  },
  distance: {
    type: Number,
    required: true  // Required field - user must fill this
  },
  electricity: {
    type: Number,
    required: true  // Required field - user must fill this
  },
  diet: {
    type: String,
    required: true  // Required field - user must fill this
  },
  carbonFootprint: {
    type: Number,
    required: true  // This is the calculated total carbon footprint
  },
  date: {
    type: Date,
    default: Date.now  // Automatically sets current date when created
  }
}, { timestamps: true });  // timestamps adds createdAt and updatedAt automatically

// Create the model (like a table in database)
const Footprint = mongoose.model("footprint", footprintSchema);
module.exports = Footprint;
