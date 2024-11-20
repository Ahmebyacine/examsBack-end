const asyncHandler = require('express-async-handler');
const Exercise = require('../Models/exerciseModel');
const ApiError = require('../utils/ApiError');

// @desc    Create a new exercise
// @route   POST /api/exercises
// @access  Public (adjust according to your use case)
// Add Exercise
exports.addExercise = asyncHandler(async (req, res, next) => {
  const { title, exercise, level, Trimester, difficulty, material, unit } = req.body;


  if (!title || !exercise || !level || !Trimester || !difficulty || !material || !unit) {
    return next(new ApiError('Exercise not added', 404));
  }
  let parsedExercise = typeof exercise === 'string' ? JSON.parse(exercise) : exercise;

  // If an image file was uploaded, set the image path
  if (req.file) {
    parsedExercise = parsedExercise.map((item) => ({
      ...item,
      image: req.file.path
    }));
  }

  const newExercise = new Exercise({
    title,
    exercise: parsedExercise,
    level,
    Trimester,
    difficulty,
    material,
    unit
  });

  const createdExercise = await newExercise.save();
  res.status(201).json(createdExercise);
});

// @desc    Get all exercises
// @route   GET /api/exercises
// @access  Public
exports.allExercise= asyncHandler(async (req, res) => {
  const exercises = await Exercise.find({});
  res.status(200).json(exercises);
});

// @desc    Get a single exercise by ID
// @route   GET /api/exercises/:id
// @access  Public
exports.getExercise= asyncHandler(async (req, res,next) => {
  const exercise = await Exercise.findById(req.params.id);

  if (!exercise) {
    next(new ApiError('Exercise not found', 404));
  }

  res.status(200).json(exercise);
});

// @desc    Update an exercise
// @route   PUT /api/exercises/:id
// @access  Public
exports.updateExercise=asyncHandler(async (req, res,next) => {
  const { title, exercise, level, Trimester, difficulty, material, unit } = req.body;

  const exerciseToUpdate = await Exercise.findById(req.params.id);

  if (!exerciseToUpdate) {
    next(new ApiError('Exercise not found', 404))  }

  exerciseToUpdate.title = title || exerciseToUpdate.title;
  exerciseToUpdate.exercise = exercise || exerciseToUpdate.exercise;
  exerciseToUpdate.level = level || exerciseToUpdate.level;
  exerciseToUpdate.Trimester = Trimester || exerciseToUpdate.Trimester;
  exerciseToUpdate.difficulty = difficulty || exerciseToUpdate.difficulty;
  exerciseToUpdate.material = material || exerciseToUpdate.material;
  exerciseToUpdate.unit = unit || exerciseToUpdate.unit;

  const updatedExercise = await exerciseToUpdate.save();
  res.status(200).json(updatedExercise);
});

// @desc    Delete an exercise
// @route   DELETE /api/exercises/:id
// @access  Public
exports.deleteExercise= asyncHandler(async (req, res,next) => {
  const exerciseToDelete = await Exercise.findById(req.params.id);

  if (!exerciseToDelete) {
    next(new ApiError('Exercise not found', 404))
  }

  await Exercise.deleteOne({ _id: req.params.id })
  res.status(200).json({ message: 'Exercise removed' });
});