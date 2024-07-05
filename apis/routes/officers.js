const express = require('express');
const router = express.Router();
const SmallerUnit = require('../models/smallerUnits');
const Officer = require('../models/officer');

// POST route for creating a smaller unit inside a senior unit
router.post('/officers/:smallunitId', async (req, res) => {
  const smallunitId = req.params.smallunitId;
  try {
    const smallunit = await SmallerUnit.findById(smallunitId); // Change Unit to the correct model name (e.g., SmallerUnit)
    if (!smallunit) {
      return res.status(404).json({ error: "Small unit not found" });
    }

    const newOfficer = new Officer(req.body);

    await newOfficer.save();

    smallunit.officers.push(newOfficer._id); 
    await smallunit.save();

    res.status(201).json(newOfficer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// PUT route for updating an existing officer
router.put('/officers/:officerId', async (req, res) => {
  const officerId = req.params.officerId;

  try {
    const updatedOfficer = await Officer.findByIdAndUpdate(officerId, req.body, { new: true, runValidators: true });

    if (!updatedOfficer) {
      return res.status(404).json({ error: "Officer not found" });
    }

    res.status(200).json(updatedOfficer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});


// DELETE route for deleting an officer and removing their ID from small units
router.delete('/officers/:officerId', async (req, res) => {
  const officerId = req.params.officerId;
  
  try {
      // Delete the officer from the Officer collection
      const deletedOfficer = await Officer.findByIdAndDelete(officerId);
      
      if (!deletedOfficer) {
          return res.status(404).json({ error: "Officer not found" });
      }

      // Update all small units that reference the officer's ID
      const updateResult = await SmallerUnit.updateMany({ "officers": officerId }, { $pull: { "officers": officerId } });

      return res.status(200).json({ message: "Officer deleted and removed from small units", updateResult });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "An error occurred while deleting the officer and updating small units" });
  }
});


// GET route for getting a specific officer by ID
router.get('/officers/:officerId', async (req, res) => {
  const officerId = req.params.officerId;

  try {
      const officer = await Officer.findById(officerId);

      if (!officer) {
          return res.status(404).json({ error: "Officer not found" });
      }

      return res.status(200).json(officer);
  } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "An error occurred while retrieving the officer" });
  }
});

// GET route for getting all officers
router.get('/officers', async (req, res) => {
  try {
      const officers = await Officer.find();

      if (!officers || officers.length === 0) {
          return res.status(404).json({ error: "No officers found" });
      }

      return res.status(200).json(officers);
  } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "An error occurred while retrieving officers" });
  }
});

//MAKE THE SEARCH
router.get('/searchOfficer', async (req, res) => {
  try {
    const { rank, unit, name, job, NationalID, militryNumber, seniortyNumber, governorate } = req.query;
    const query = {};

    if (rank) {
      query.rank = rank;
    }
    if (name) {
      const namesArray = name.split(',').map(n => n.trim());
      query.name = { $in: namesArray.map(n => new RegExp(n, 'i')) };
    }
    if (unit) {
      const units = await SmallerUnit.find({ name: unit });
      const unitIds = units.map(unit => unit._id);
      query.unit = { $in: unitIds };
    }
    if (job) {
      query.job = { $regex: job, $options: 'i' };
    }
    if (NationalID) {
      query.NationalID = NationalID;
    }
    if (militryNumber) {
      query.militryNumber = militryNumber;
    }
    if (seniortyNumber) {
      query.seniortyNumber = seniortyNumber;
    }
    if (governorate) {
      query.governorate = governorate;
    }

    const officers = await Officer.find(query);
    res.json(officers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error' });
  }
});
module.exports = router;
