const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  leaveType: { type: String, enum: ['SICK', 'CASUAL'], required: true },
  duration: { type: Number, required: true },
});

module.exports = mongoose.model('Leave', leaveSchema);
