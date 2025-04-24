const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  questionId: { type: mongoose.Schema.Types.ObjectId, required: true },
  answer: { type: mongoose.Schema.Types.Mixed, required: true }
}, { _id: true });

const evaluationResponseSchema = new mongoose.Schema({
  assignmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'EvaluationAssignment', required: true },
  evaluateId:{  type: mongoose.Schema.Types.ObjectId, ref: 'EvaluationAssignment', required: true},
  answers: [answerSchema],
  submittedAt: { type: Date, default: Date.now }
}, { _id: true });

module.exports = mongoose.model('EvaluationResponse', evaluationResponseSchema);
