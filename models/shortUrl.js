const mongoose = require("mongoose");

const shortUrlSchema = new mongoose.Schema({
  full: {
    type: String,
    required: true,
  },
  short: {
    type: String,
    required: true,
  },
  clicks: {
    type: Number,
    required: true,
    default: 0
  },
  lastclickdate: {
    type: String,
    required: true,
    default:"No Visit"
  },
  createddate: {
    type: String,
    required: true,
    default: new Date().toLocaleString("en-US")
  }
});

module.exports = mongoose.model("ShortUrl", shortUrlSchema);
