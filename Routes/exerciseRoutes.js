const express = require('express');
const { deleteExercise, updateExercise, allExercise, getExercise, addExercise } = require('../Services/exerciseServices');
const upload = require('../middlewares/upload');
const router = express.Router();

// @desc    Create a new exercise
// @route   POST /api/exercises
// @access  Public (adjust according to your use case)
router.post('/',upload.single('image'), addExercise);

// @desc    Get all exercises
// @route   GET /api/exercises
// @access  Public
router.get('/', allExercise);

// @desc    Get a single exercise by ID
// @route   GET /api/exercises/:id
// @access  Public
router.get('/:id',getExercise);

// @desc    Update an exercise
// @route   PUT /api/exercises/:id
// @access  Public
router.put('/:id', updateExercise);

// @desc    Delete an exercise
// @route   DELETE /api/exercises/:id
// @access  Public
router.delete('/:id',deleteExercise);

module.exports = router;