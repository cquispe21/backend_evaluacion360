const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    type: { 
      type: String, 
      required: true, 
      enum: ['abierta', 'likert', 'multiple'] 
    },
    options: ['pendiente', 'publico'] 
  },
  { _id: true } 
);


const evaluationTemplateSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    questions: [questionSchema],
    status: {type: String}
  },
  {  _id: true ,timestamps: { createdAt: true, updatedAt: false } }
);

const EvaluationTemplate = mongoose.model('EvaluationTemplate', evaluationTemplateSchema);

module.exports = EvaluationTemplate;
