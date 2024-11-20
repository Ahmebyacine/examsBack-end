const mongoose = require('mongoose');
const MatrielSchema = new mongoose.Schema({
  name: { type: String, required: true },
  levels: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Levels', required: true }],
});

const Matriel = mongoose.model('Matriels', MatrielSchema);
module.exports = Matriel;