const express = require('express');
const router = express.Router();
const Challenge = require('../models/Challenge');
const {verifyToken}  =  require("../middlewere/VerifyToken")

// Create Challenge
router.post('/', verifyToken , async (req, res) => {
  try {
    const challenge = new Challenge({ ...req.body, createdBy: req.user.id });
    await challenge.save();
    res.status(201).json(challenge);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Fetch All Challenges
router.get('/', verifyToken, async (req, res) => {
  try {
    const challenges = await Challenge.find().populate('createdBy', 'username');
    res.json(challenges);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Fetch Single Challenge
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id).populate('createdBy', 'username');
    if (!challenge) return res.status(404).json({ message: 'Challenge not found' });
    res.json(challenge);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Join Challenge
router.post('/:id/join', verifyToken, async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id);
    if (!challenge) return res.status(404).json({ message: 'Challenge not found' });

    // Add user to participants
    if (!challenge.participants.includes(req.user.id)) {
      challenge.participants.push(req.user.id);
    }
    await challenge.save();
    res.json(challenge);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete Challenge
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id);
    if (!challenge) return res.status(404).json({ message: 'Challenge not found' });

    // Only creator can delete
    if (challenge.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await challenge.remove();
    res.json({ message: 'Challenge deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
