const asyncHandler = require('express-async-handler');
const User = require('../Models/userModel');
const ApiError = require('../utils/ApiError');

// Add a exercise to favorites
exports.addFavorites=asyncHandler(async (req, res, next) => {
    const { exerciseId } = req.body;
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      return next(new ApiError('User not found', 404));
    }

    if (user.exercise_favorite.includes(exerciseId)) {
      return next(new ApiError('exercise not added to favorites', 400));
    }

    user.exercise_favorite.push(exerciseId);
    await user.save();

    res.status(200).json({ message: 'Added to favorites', favorites: user.exercise_favorite });
  })
// get a exercise from favorites
exports.getFavorites=asyncHandler(async (req, res, next) => {
  const userId = req.user._id;
  const user = await User.findById(userId).populate('exercise_favorite');
  res.json({ favoriteIds: user.exercise_favorite.map(ex => ex._id) });
  })
// delete a exercise from favorites
exports.removeFavorites = asyncHandler(async (req, res, next) => {
  const { exerciseId } = req.body;
  const userId = req.user._id;

  const user = await User.findById(userId);
  if (!user) {
    return next(new ApiError('User not found', 404));
  }

  if (!user.exercise_favorite.includes(exerciseId)) {
    return next(new ApiError('Exercise not found in favorites', 400));
  }

  user.exercise_favorite = user.exercise_favorite.filter(
    (id) => id.toString() !== exerciseId.toString()
  );

  await user.save();

  res.status(200).json({ message: 'Removed from favorites', favorites: user.exercise_favorite });
});

// Add a exercise to the current list
exports.currentAddExercise=asyncHandler(async (req, res, next) => {
    const { exerciseId } = req.body;
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
        return next(new ApiError('User not found', 404));
    }

    if (user.current.includes(exerciseId)) {
        return next(new ApiError('Exercise already in the current list', 400));
    }

    user.current.push(exerciseId);
    await user.save();

    res.status(200).json({ message: 'Added to current list', current: user.current });
  })
// delete a exercise from favorites
exports.removeCurrent = asyncHandler(async (req, res, next) => {
  const { exerciseId } = req.body;
  const userId = req.user._id;

  const user = await User.findById(userId);
  if (!user) {
    return next(new ApiError('User not found', 404));
  }

  if (!user.current.includes(exerciseId)) {
    return next(new ApiError('Exercise not found in added exam', 400));
  }
  user.current = user.current.filter(
    (id) => id.toString() !== exerciseId
  );

  await user.save();

  res.status(200).json({ message: 'Removed from favorites', current: user.current });
});
// Move current exam to archived_exam
exports.currentToArchive=asyncHandler(async (req, res, next) => {
  const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) {
        return next(new ApiError('User not found', 404));
    }

    if (user.current.length === 0) {
      return next(new ApiError('No exercises in the current list to archive', 400));
    }

    const archivedEntry = {
      exercises: user.current,
      created_at: new Date(),
    };

    user.archived_exam.push(archivedEntry);
    user.current = [];
    await user.save();

    res.status(200).json({ message: 'Current list archived', archivedExam: user.archived_exam });
  })