const mongoose = require('mongoose');

const StatSchema = new mongoose.Schema({
  platform: { type: String, required: true }, // e.g., LeetCode
  link: String,
  totalSolved: String,
  totalContests: String,
  rating: String,
  highestRating: String,
  iconColor: String, // To keep the neon theme flexible
});

module.exports = mongoose.model('Stat', StatSchema);