const express = require('express');
const { getUnits,addUnits,updateUnit,deleteUnit } = require('../Services/unitServices');
const router = express.Router();

// @desc    Create a new Unit
// @route   POST /api/Units
// @access  Public 
router.post('/', addUnits);

// @desc    Get all Units
// @route   GET /api/Units
// @access  Public
router.get('/', getUnits);

// @desc    Update the Unit
// @route   PUT /api/Units
// @access  Privat 
router.put('/:id', updateUnit);

// @desc    delete the Unit
// @route   DELETE /api/Units
// @access  Privat
router.delete('/:id', deleteUnit);

module.exports = router;