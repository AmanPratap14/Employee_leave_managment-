const express = require('express');
const mongoose = require('mongoose');
const usersRoutes = require('./routes/users');
const leavesRoutes = require('./routes/leaves');
const cors = require('cors');
const dotenv = require('dotenv').config();


const Mongoos_URls = process.env.Mongoos_URls;


const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.Mongoos_URls, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("connected to DB");
})
.catch((err) => {
  console.log("Error connecting to DB", err)
});
app.use(cors())

// Use the routes
app.use('/api/users', usersRoutes);
app.use('/api/leaves', leavesRoutes);

// Start the server
const PORT = 3001
;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
