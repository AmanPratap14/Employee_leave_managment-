const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Create a new user
router.post('/', async (req, res) => {
  try {
    const { username, department } = req.body;
    const user = await User.create({ username, department });
    res.status(201).json(user);
  } catch (error) {
    console.log("error", error)
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// Fetch all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Fetch specific user
router.get('/:username', async (req, res) => {
  try {
    const {username} = req.params;
    const user = await User.findOne({username});
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

module.exports = router;
