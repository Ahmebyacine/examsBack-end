const express = require('express');
const { protect } = require('../Services/authServices');
const { getLevel, addLevel, updateLevel, deleteLevel, getUserLevels } = require('../Services/levelServices');
const router = express.Router();

// @desc    Create a new Level
// @route   POST /api/Levels
// @access  Private
router.post('/', addLevel);

// @desc    Get all Levels
// @route   GET /api/Levels
// @access  Public
router.get('/', getLevel);

// @desc    Get all Levels
// @route   GET /api/levels/user
// @access  Private
router.get('/user',protect, getUserLevels);

// @desc    Update the Level
// @route   PUT /api/levels
// @access  Privat 
router.put('/:id', updateLevel);

// @desc    delete the Level
// @route   DELETE /api/levels
// @access  Privat
router.delete('/:id', deleteLevel);

module.exports = router;