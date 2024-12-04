const asyncHandler = require('express-async-handler');
const Matriel = require('../Models/matrielModel');
const User = require('../Models/userModel');
const ApiError = require('../utils/ApiError');

//get all matriel 
exports.getMatriel=asyncHandler(async (req, res) => {
    const { levelId, trimesterId } = req.query;

    const filter = {};
    if (levelId) filter.Level = levelId;
    if (trimesterId) filter.Trimester = trimesterId;

    const matriels = await Matriel.find(filter)
      .populate('levels')

    res.json(matriels);
  })
  exports.getUserMatriel=asyncHandler(async (req, res,next) => {
    const userId = req.user._id;
  
    // Fetch the user's levels and materials
    const user = await User.findById(userId);
    if (!user) {
      return next(new ApiError('User not found', 404));
    }
  
    const matriels = await Matriel.find({ _id: { $in: user.matirels } });
    res.status(200).json(matriels);
  });
// add matriel
  exports.addMatriel=asyncHandler(async (req, res) => {
    const matriels = new Matriel(req.body);
    await matriels.save();
    res.status(201).json(matriels);
  })
// Update
  exports.updateMatriel=asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { name, levels } = req.body;
    const updatedMatriel = await Matriel.findByIdAndUpdate(
      id,
      { name, levels },
      { new: true, runValidators: true }
    );

    if (!updatedMatriel) {
      return next(new ApiError('Matriel not updated', 404));
    } else {
      res.json(updatedMatriel);
    }
  })
  //delete Matriel
  exports.deleteMatriel=asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const deletedMatriel = await Matriel.findByIdAndDelete(id);

    if (!deletedMatriel) {
      return next(new ApiError('Matriel not delete', 404));
    } else {
      res.json({ message: 'Matriel deleted successfully', matriel: deletedMatriel });
    }
  })