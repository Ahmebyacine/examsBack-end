const express = require('express');
const { getLevel, addLevel, updateLevel, deleteLevel } = require('../Services/levelServices');
const router = express.Router();

// @desc    Create a new Level
// @route   POST /api/Levels
// @access  Public (adjust according to your use case)
router.post('/', addLevel);

// @desc    Get all Levels
// @route   GET /api/Levels
// @access  Public
router.get('/', getLevel);

// @desc    Update the Level
// @route   PUT /api/levels
// @access  Privat 
router.put('/:id', updateLevel);

// @desc    delete the Level
// @route   DELETE /api/levels
// @access  Privat
router.delete('/:id', deleteLevel);

module.exports = router;