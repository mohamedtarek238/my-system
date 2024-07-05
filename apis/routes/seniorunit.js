const express = require('express');
const router = express.Router();
const SeniorUnit = require('../models/seniorunit'); // Assuming you have a SeniorUnit model imported

// POST route for creating a senior unit
router.post('/seniorunits', async (req, res) => {
  try {
    const newSeniorUnit = new SeniorUnit({
      name: req.body.name,
      // Other properties for the senior unit can be set here
    });

    // Save the new senior unit to the database
    await newSeniorUnit.save();

    res.status(201).json(newSeniorUnit); // Return the newly created senior unit
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET route to fetch all SeniorUnits with their SmallerUnits populated
router.get('/senior-units', async (req, res) => {
  try {
    // Fetch all SeniorUnits and populate the smallerUnits field with both SmallerUnit documents and officers
    const seniorUnits = await SeniorUnit.find().populate({
      path: 'smallerUnits'
    });

    // Send a successful response with the populated data
    res.status(200).json({ seniorUnits });
  } catch (err) {
    // Handle any errors
    res.status(500).json({ error: 'Failed to fetch SeniorUnits', details: err.message });
  }
});
// GET route to fetch  SeniorUnit with their SmallerUnits populated
router.get('/senior-units/:seniorUnitId', async (req, res) => {
  const seniorUnitId = req.params.seniorUnitId;
  try {
    // Fetch  SeniorUnit and populate the smallerUnits field with both SmallerUnit documents and officers
    const seniorUnits = await SeniorUnit.findById(seniorUnitId).populate({
      path: 'smallerUnits'
    });

    // Send a successful response with the populated data
    res.status(200).json({ seniorUnits });
  } catch (err) {
    // Handle any errors
    res.status(500).json({ error: 'Failed to fetch SeniorUnits', details: err.message });
  }
});
module.exports = router;
