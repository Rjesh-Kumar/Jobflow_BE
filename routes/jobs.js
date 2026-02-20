const express = require("express");
const router = express.Router();
const Job = require("../models/Job");

//Get all jobs
router.get('/', async (req, res) => {
    try {
        const { search } = req.query;
        let query = {};

        if (search) {
            query.jobTitle = { $regex: search, $options: "i" };
        }

        const jobs = await Job.find(query).sort({ createdAt: -1});
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Get single job
router.get('/:id', async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.json(job);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Post create new job
router.post('/', async (req, res) => {
  try {
    const job = new Job(req.body);
    const newJob = await job.save();
    res.status(201).json({
        message: 'Job created successfully',
        job: newJob 
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update job
router.put('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    
    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    
    res.json(updatedJob);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Delete job
router.delete('/:id', async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        await job.deleteOne();
        res.json({ message: 'Job deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;