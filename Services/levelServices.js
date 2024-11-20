const asyncHandler = require('express-async-handler');
const Level = require('../models/levelModel');

// Get all levels
exports.getLevel= asyncHandler(async (req, res) => {
    const levels = await Level.find();
    res.json(levels);
  })

// Create a new level
exports.addLevel=asyncHandler(async (req, res) => {
    const level = new Level(req.body);
    await level.save();
    res.status(201).json(level);
  })

  exports.updateLevel=asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { name } = req.body;
    const updatedLevel = await Level.findByIdAndUpdate(
      id,
      { name },
      { new: true, runValidators: true }
    );

    if (!updatedLevel) {
      return next(new ApiError('Level not update', 404));
    } else {
      res.json(updatedLevel);
    }
  })
  exports.deleteLevel=asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const deletedLevel = await Level.findByIdAndDelete(id);

    if (!deletedLevel) {
      return next(new ApiError('Level not delete', 404));
    } else {
      res.json({ message: 'Level deleted successfully', matriel: deletedMatriel });
    }
  })