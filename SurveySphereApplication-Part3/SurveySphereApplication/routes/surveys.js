const express = require('express');
const router = express.Router();
const Survey = require('../models/survey'); // Import Survey model

// Create a new survey
router.post('/', async (req, res) => {
    try {
        // Extract survey data from the request body
        const { title, description, questions } = req.body;

        // Validate required fields
        if (!title || !questions || questions.length === 0) {
            return res.status(400).json({ error: 'Title, questions, and at least one question are required' });
        }

        // Create a new survey in the database
        const newSurvey = new Survey({ title, description, questions });
        await newSurvey.save();

        // Respond with a success message or the newly created survey data
        res.status(201).json(newSurvey);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
