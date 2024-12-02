const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  levels: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Levels', required: true }],
  matirels: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Matriels' }],
  exercise_favorite: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Exercise'}],
  current: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Exercise'}],
  archived_exam: [{
    exercises:[{type: mongoose.Schema.Types.ObjectId, ref: 'Exercise' }],
    created_at: { type: Date, default: Date.now },
 }],
 role: {type: String, enum: ['user', 'admin'], default: 'user',},
},{ timestamps: true });

const User = mongoose.model('Users', UserSchema);
module.exports = User;