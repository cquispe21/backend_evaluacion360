const mongoose = require('mongoose');

const evaluationAssignmentSchema = new mongoose.Schema({
  templateId: { type: mongoose.Schema.Types.ObjectId, ref: 'EvaluationTemplate', required: true },
  evaluatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  assignedAt: { type: Date, default: Date.now }
},{_id: true});

module.exports = mongoose.model('EvaluationAssignment', evaluationAssignmentSchema);
