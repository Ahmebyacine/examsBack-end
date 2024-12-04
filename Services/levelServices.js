const asyncHandler = require('express-async-handler');
const Level = require('../Models/levelModel');
const User = require('../Models/userModel');

// Get all levels
exports.getLevel= asyncHandler(async (req, res) => {
    const levels = await Level.find();
    res.json(levels);
  })
// get levels for user
exports.getUserLevels=   asyncHandler(async (req, res) => {
  const userId = req.user._id;

  // Fetch the user's levels and materials
  const user = await User.findById(userId);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  const levels = await Level.find({ _id: { $in: user.levels } });
  res.status(200).json(levels);
});
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