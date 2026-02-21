const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const jobsRouter = require("./routes/jobs");

const app = express();

// ✅ Simple CORS - Allow all in development, specific in production
if (process.env.NODE_ENV === 'production') {
  app.use(cors({
    origin: ['https://jobflow-fe.vercel.app'], // No trailing slash!
    credentials: true
  }));
} else {
  app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
  }));
}

app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
   .then(() => console.log('✅ Connected to MongoDB'))
   .catch(err => console.log('❌ MongoDB connection error:', err));

// Routes
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Jobs API', status: 'online' });
});

app.use('/api/jobs', jobsRouter);   

// Error handling
app.use((err, req, res, next) => {
    console.error('❌ Error:', err.stack);
    res.status(500).json({ message: 'Something went wrong' });
});

module.exports = app;

// Local development
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
  });
}