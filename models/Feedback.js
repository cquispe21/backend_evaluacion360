const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  idFeedback: { type: Number, required: true, unique: true }, 
  idEvaluation: { type: Number, required: true },  
  description: { type: String, required: true }, 
  date: { type: Date, required: true, default: Date.now },  
}, { timestamps: true, _id: false });  

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
