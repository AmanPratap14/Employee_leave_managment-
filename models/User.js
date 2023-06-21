const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  department: { type: String, required: true },
  // casualLeaves: { type: Number, default: 2 },
  // sickLeaves: { type: Number, default: 2 },
});

module.exports = mongoose.model('User', userSchema);
