const mongoose = require('mongoose');
const LevelSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const Level = mongoose.model('Levels', LevelSchema);
module.exports = Level;