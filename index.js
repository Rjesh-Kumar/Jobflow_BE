const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const jobsRouter = require("./routes/jobs");

const app = express();

// Middleware
// CORS configuration for production
app.use(cors({
  origin: ['http://localhost:3000', 'https://your-frontend.vercel.app'], // Add your frontend URL
  credentials: true
}));

app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
   .then(() => console.log('Connected to MongoDB'))
   .catch(err => console.log('MongoDB connection error:', err));

// Welcome route
app.get('/', (req, res) => {
    res.json({ 
        message: 'Welcome to Jobs API',
        status: 'online',
        timestamp: new Date().toISOString(),
        endpoints: {
            jobs: '/api/jobs'
        }
    });
});

// Routes
app.use('/api/jobs', jobsRouter);   

// Error handling middleware
app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).json({ message: 'Something went wrong' });
});

// For Vercel, we export the app instead of listening
module.exports = app;

// Local development
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}