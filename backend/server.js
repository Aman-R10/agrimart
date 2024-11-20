const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');  // Ensure CORS is enabled
const authRoutes = require('./routes/authRoutes');  // Import routes

const app = express();

// Middleware
app.use(express.json());  // To parse JSON body
app.use(cors());  // Allow cross-origin requests

// Use routes
app.use('/api/auth', authRoutes);

// Connect to the database
mongoose.connect('mongodb://localhost:27017/agrimart', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));

// Start the server
app.listen(5000, () => {
  console.log('Server running on port 5000');
});
