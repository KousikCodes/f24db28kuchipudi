const mongoose = require("mongoose");

const heritageSiteSchema = new mongoose.Schema({
  site_name: String,
  location: String,
  year_established: Number
});

module.exports = mongoose.model("HeritageSite", heritageSiteSchema);
