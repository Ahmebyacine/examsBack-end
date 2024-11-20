const asyncHandler = require('express-async-handler');
const Matriel = require('../Models/matrielModel');
const ApiError = require('../utils/ApiError');


exports.getMatriel=asyncHandler(async (req, res) => {
    const { levelId, trimesterId } = req.query;

    const filter = {};
    if (levelId) filter.Level = levelId;
    if (trimesterId) filter.Trimester = trimesterId;

    const matriels = await Matriel.find(filter)
      .populate('levels')

    res.json(matriels);
  })
  exports.addMatriel=asyncHandler(async (req, res) => {
    const matriels = new Matriel(req.body);
    await matriels.save();
    res.status(201).json(matriels);
  })
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
  exports.deleteMatriel=asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const deletedMatriel = await Matriel.findByIdAndDelete(id);

    if (!deletedMatriel) {
      return next(new ApiError('Matriel not delete', 404));
    } else {
      res.json({ message: 'Matriel deleted successfully', matriel: deletedMatriel });
    }
  })