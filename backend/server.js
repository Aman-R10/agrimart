const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/mongo');
const userRoutes = require('./routes/userRoutes');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();
app.use(express.json());

// Basic health check route (optional for testing)
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Define routes
app.use('/api/users', userRoutes);

// Global error handler (optional for improved debugging)
app.use((err, req, res, next) => {
  console.error(`Error: ${err.message}`);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
