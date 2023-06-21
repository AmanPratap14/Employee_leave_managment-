const express = require('express');
const mongoose = require('mongoose');
const usersRoutes = require('./routes/users');
const leavesRoutes = require('./routes/leaves');
const cors = require('cors');

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://root:root123@todoclusters.9lvntdt.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors())

// Use the routes
app.use('/api/users', usersRoutes);
app.use('/api/leaves', leavesRoutes);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
