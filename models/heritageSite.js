const mongoose = require("mongoose");

const heritageSiteSchema = new mongoose.Schema({
  name: String,
  location: String,
  description: String,
  year_established: Number
});

module.exports = mongoose.model("HeritageSite", heritageSiteSchema);
