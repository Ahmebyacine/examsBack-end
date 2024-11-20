const mongoose = require('mongoose');
const TrimesterSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const Trimester = mongoose.model('Trimesters', TrimesterSchema);
module.exports = Trimester;