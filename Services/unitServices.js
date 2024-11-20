const asyncHandler = require('express-async-handler');
const Unit = require('../models/unitModel');
const ApiError = require('../utils/ApiError');

exports.getUnits=asyncHandler(async (req, res) => {
    const { levelId, trimesterId } = req.query;
    
    const filter = {};
    if (levelId) filter.Level = levelId;
    if (trimesterId) filter.Trimester = trimesterId;
    const units = await Unit.find(filter).populate('Level').populate('Matirel');
    res.json(units);
  })

// Create a new unit
exports.addUnits=asyncHandler(async (req, res) => {
    const unit = new Unit(req.body);
    await unit.save();
    res.status(201).json(unit);
  })

  exports.updateUnit=asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { name, Level,Matirel,Trimester } = req.body;
    const updatedUnit = await Unit.findByIdAndUpdate(
      id,
      { name, Level,Matirel,Trimester },
      { new: true, runValidators: true }
    );

    if (!updatedUnit) {
      return next(new ApiError('Unit not updated', 404));
    } else {
      res.json(updatedUnit);
    }
  })
  exports.deleteUnit=asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const deletedUnit = await Unit.findByIdAndDelete(id);

    if (!deletedUnit) {
      return next(new ApiError('Unit not delete', 404));
    } else {
      res.json({ message: 'Unit deleted successfully', Unit: deletedUnit });
    }
  })