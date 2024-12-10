const express = require('express');
const { deleteExercise, updateExercise, allExercise, getExercise, addExercise, getUserExercises,getAllArchivedExams, getUserCurrentExam } = require('../Services/exerciseServices');
const upload = require('../middlewares/upload');
const { protect } = require('../Services/authServices');
const router = express.Router();

// @desc    Create a new exercise
// @route   POST /api/exercises
// @access  Public (adjust according to your use case)
router.post('/',upload.array('images', 2), addExercise);

// @desc    Get all exercises
// @route   GET /api/exercises
// @access  Private
router.get('/', allExercise);

// @desc    Get all exercises for user
// @route   GET /api/exercises/user
// @access  private
router.get('/user',protect, getUserExercises);
// @desc    Get all exercises for user
// @route   GET /api/exercises/user
// @access  private
router.get('/user/current-exam',protect, getUserCurrentExam);
// @desc    Get all exams archives for user
// @route   GET /api/exercises/archivesExams
// @access  private
router.get('/archivedExams',protect, getAllArchivedExams);

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