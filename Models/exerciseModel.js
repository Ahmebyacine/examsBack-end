const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  exercise: [
    {
      content: { type: String, required: true },
      questions: [
        { question: { type: String, required: true }, 
         answer: { type: String, required: true } }
      ],
      image: { type: String, default: null },
      imagePosition: {
        type: String,
        enum: ['top', 'bottom', 'left', 'right']
      }
    }
  ],
  level: { type: String, required: true },
  Trimester: { type: String, required: true },
  difficulty: { type: String, required: true },
  material: { type: String, required: true },
  unit: { type: String, required: true }
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;