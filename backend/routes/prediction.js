const express = require('express');
const router = express.Router();
const Prediction = require('../models/Prediction');

router.post('/', async (req, res) => {
  try {
    const { userId, condition, result, accuracy } = req.body;

    if (!userId || !condition || !result) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const prediction = new Prediction({
      userId,
      condition,
      result,
      accuracy,
    });

    await prediction.save();
    res.status(201).json({ message: 'Prediction saved' });
  } catch (error) {
    console.error('Error saving prediction:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
// Add this GET route to fetch predictions for a specific user
router.get('/:userId', async (req, res) => {
    try {
      const { userId } = req.params;
      const predictions = await Prediction.find({ userId }).sort({ createdAt: -1 });
      res.json(predictions); // ✅ Ensure this always sends valid JSON
    } catch (error) {
      console.error('Error fetching predictions:', error);
      res.status(500).json({ message: 'Server error' }); // ✅ Still send JSON
    }
  });
  
module.exports = router;
