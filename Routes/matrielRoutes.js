const express = require('express');
const { getMatriel,addMatriel, updateMatriel, deleteMatriel } = require('../Services/matrielServices');
const router = express.Router();


// @desc    Get all Matriels
// @route   GET /api/Matriels
// @access  Public
router.get('/', getMatriel);

// @desc    Create a new Matriel
// @route   POST /api/Matriels
// @access  Privat 
router.post('/', addMatriel);

// @desc    Update the Matriel
// @route   PUT /api/Matriels
// @access  Privat 
router.put('/:id', updateMatriel);

// @desc    delete the Matriel
// @route   DELETE /api/Matriels
// @access  Privat
router.delete('/:id', deleteMatriel);

module.exports = router;