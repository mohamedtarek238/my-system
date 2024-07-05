// routes.js
const express = require('express');
const router = express.Router();
const SeniorUnit = require('../models/seniorunit');
const SmallUnit = require('../models/smallerUnits');
const Officer = require('../models/officer');

// Route to create a senior unit
router.post('/seniorunit', async (req, res) => {
  try {
    const newSeniorUnit = new SeniorUnit(req.body);
    const savedSeniorUnit = await newSeniorUnit.save();
    res.status(201).json(savedSeniorUnit);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route to create a small unit
router.post('/smallunit', async (req, res) => {
  try {
    const newSmallUnit = new SmallUnit(req.body);
    const savedSmallUnit = await newSmallUnit.save();
    res.status(201).json(savedSmallUnit);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route to create an officer
router.post('/officer', async (req, res) => {
  try {
    const newOfficer = new Officer(req.body);
    const savedOfficer = await newOfficer.save();
    res.status(201).json(savedOfficer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;