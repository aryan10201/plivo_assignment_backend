const mongoose = require('mongoose');

const componentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  status: {
    type: String,
    required: true,
    enum: ['operational', 'degraded_performance', 'partial_outage', 'major_outage']
  },
  description: {
    type: String
  },
  type: {
    type: String,
    required: true,
    enum: ['active', 'third-party']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Component', componentSchema); 