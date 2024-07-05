const express = require('express');
const router = express.Router();
const SmallerUnit = require('../models/smallerUnits');
const SeniorUnit = require("../models/seniorunit")


// POST route for creating a smaller unit inside a senior unit
router.post('/seniorunits/:seniorUnitId/smallerunits', async (req, res) => {
  const seniorUnitId = req.params.seniorUnitId;
  try {
    const seniorUnit = await SeniorUnit.findById(seniorUnitId);
    if (!seniorUnit) {
      return res.status(404).json({ error: "Senior unit not found" });
    }

    // Create a new instance of SmallerUnit
    const newSmallerUnit = new SmallerUnit({
      name: req.body.name
      // Set other properties for the smaller unit as needed
    });

    // Save the new smaller unit to its collection
    await newSmallerUnit.save();

    // Add the newly created smaller unit's ID to the senior unit's list of smaller units
    seniorUnit.smallerUnits.push(newSmallerUnit._id);
    await seniorUnit.save();

    res.status(201).json(seniorUnit); // Return the updated senior unit
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});


// DELETE route for removing a smaller unit from a senior unit
router.delete('/seniorunits/:seniorUnitId/:smallerUnitId', async (req, res) => {
  const seniorUnitId = req.params.seniorUnitId;
  const smallerUnitId = req.params.smallerUnitId;

  try {
    const seniorUnit = await SeniorUnit.findById(seniorUnitId);
    if (!seniorUnit) {
      return res.status(404).json({ error: "Senior unit not found" });
    }

    // Check if the smaller unit exists in the senior unit
    if (!seniorUnit.smallerUnits.includes(smallerUnitId)) {
      return res.status(404).json({ error: "Smaller unit not found in the senior unit" });
    }

    // Remove the smaller unit from the senior unit
    seniorUnit.smallerUnits.pull(smallerUnitId);
    await seniorUnit.save();

    // Delete the smaller unit
    await SmallerUnit.findByIdAndDelete(smallerUnitId);

    res.status(200).json("the unit has been deleted"); // Return the updated senior unit
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET route for retrieving a specific smaller unit
router.get('/smallerunits/:smallerUnitName', async (req, res) => {
  const smallerUnitName = req.params.smallerUnitName;
  try {
    // Find the smaller unit by a name pattern using regular expression
    const regexPattern = new RegExp('^' + smallerUnitName, 'i'); // Case-insensitive search for names starting with the provided name
    const smallerUnit = await SmallerUnit.findOne({ name: { $regex: regexPattern } });

    if (!smallerUnit) {
      return res.status(404).json({ error: "Smaller unit not found" });
    }

    res.status(200).json(smallerUnit); // Return the found smaller unit
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});


// GET route for retrieving a specific smaller unit by ID
router.get('/smallerunits/unitId/:smallerUnitId', async (req, res) => {
  const smallerUnitId = req.params.smallerUnitId;
  try {
    // Find the smaller unit by ID
    const smallerUnit = await SmallerUnit.findById(smallerUnitId);

    if (!smallerUnit) {
      return res.status(404).json({ error: "Smaller unit not found" });
    }

    res.status(200).json(smallerUnit); // Return the found smaller unit
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET route to fetch small unit with their officer populated
router.get('/small-units/:smallUnitId', async (req, res) => {
  const smallUnitId = req.params.smallUnitId;
  try {
    // Fetch  small unit and populate the officer field with  officers
    const smallUnits = await SmallerUnit.findById(smallUnitId).populate({
      path: 'officers'
    });

    // Send a successful response with the populated data
    res.status(200).json({ smallUnits });
  } catch (err) {
    // Handle any errors
    res.status(500).json({ error: 'Failed to fetch small units', details: err.message });
  }
});

//get all small units and their officers
router.get('/small-units',async (req,res)=>{

  try{
    const smallunits = await SmallerUnit.find().populate({
      path:'officers'
    });
    res.status(201).json(smallunits);
  }catch(err){
    res.status(500).json({ error: 'Failed to fetch small units', details: err.message });
  }
   
});


module.exports = router;