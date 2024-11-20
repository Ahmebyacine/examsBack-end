const mongoose = require('mongoose');
const UnitSchema = new mongoose.Schema({
  name: { type: String, required: true },
  Level: { type: mongoose.Schema.Types.ObjectId, ref: 'Levels', required: true },
  Matirel: { type: mongoose.Schema.Types.ObjectId, ref: 'Matriels', required: true },
  Trimester: { type: String, required: true },
});

const Unit = mongoose.model('Units', UnitSchema);
module.exports = Unit;