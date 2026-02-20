const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  jobTitle: {
    type: String,
    required: [true, 'Job title is required'],
    trim: true
  },
  companyName: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true
  },
  salary: {
    type: Number,
    required: [true, 'Salary is required'],
    min: [0, 'Salary must be positive']
  },
  jobType: {
    type: String,
    required: [true, 'Job type is required'],
    enum: ['Full-time (On-site)', 'Part-time (On-site)', 'Full-time (Remote)', 'Part-time (Remote)']
  },
  jobDescription: {
    type: String,
    required: [true, 'Job description is required'],
    trim: true
  },
  qualifications: {
    type: String,
    required: [true, 'Qualifications are required'],
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Job', jobSchema);