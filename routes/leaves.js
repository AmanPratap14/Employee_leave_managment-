const express = require('express');
var mongoose = require('mongoose');

const router = express.Router();
const Leave = require('../models/Leave');
const User = require('../models/User');
const { LEAVE_TYPE } = require('../constants');

router.get('', async (req, res) => {
 
  
  const leaves = await User.aggregate([{
    $lookup: {
      from: 'leaves',
      localField: "_id",
      foreignField: "user",
      as : "leave_list",
    }
  }]);
  console.log(leaves);
  return res.json(leaves);
})
// Apply for leave
router.post('', async (req, res) => {
  try {
    const { username, leaveType, duration } = req.body;
    const user = await User.findOne({ _id: new mongoose.Types.ObjectId(username )});
    const leaves = await Leave.find({user: user._id});
    const sickLeaves = leaves.filter(leave => leave.leaveType === LEAVE_TYPE.SICK).reduce((acc, curr) => acc + curr.duration, 0);
    const casualLeaves = leaves.filter(leave => leave.leaveType === LEAVE_TYPE.CASUAL).reduce((acc, curr) => acc + curr.duration, 0);

    console.log(sickLeaves, "sickleave");

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    console.log( duration + sickLeaves,  duration + sickLeaves > 2)

    if (leaveType === LEAVE_TYPE.SICK && +duration + sickLeaves > 2) {
      return res.status(400).json({ error: 'Insufficient sick leaves' });
    }

    if (leaveType === LEAVE_TYPE.CASUAL && +duration + casualLeaves > 2) {
      return res.status(400).json({ error: 'Insufficient casual leaves' });
    }

    const leave = await Leave.create({
      user: user._id,
      leaveType,
      duration,
    });

    await leave.save();

    res.status(201).json(leave);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to apply for leave' });
  }
});

// Fetch applied leaves for a user
router.get('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const leaves = await Leave.find({ user: userId });
    res.status(200).json(leaves);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch applied leaves' });
  }
});

module.exports = router;
