const mongoose = require('mongoose');

const codeVersionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  code: {
    type: String,
    required: true
  },
  language: {
    type: String,
    default: 'javascript'
  },
  review: {
    feedback: [{
      line: Number,
      type: String,
      severity: String,
      description: String,
      suggestion: String
    }],
    quality_score: Number,
    summary: String
  },
  linesOfCode: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('CodeVersion', codeVersionSchema);

