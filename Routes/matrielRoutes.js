const express = require('express');
const { protect } = require('../Services/authServices');
const { getMatriel,addMatriel, updateMatriel, deleteMatriel,getUserMatriel } = require('../Services/matrielServices');
const router = express.Router();


// @desc    Get all Matriels
// @route   GET /api/Matriels
// @access  Public
router.get('/', getMatriel);

// @desc    Get all Matriels
// @route   GET /api/matriels/user
// @access  Privavte
router.get('/user',protect ,getUserMatriel);

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