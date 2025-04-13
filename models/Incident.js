const mongoose = require('mongoose');

const incidentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ['investigating', 'identified', 'monitoring', 'resolved']
  },
  message: {
    type: String,
    required: true
  },
  components: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Component'
  }],
  updates: [{
    status: {
      type: String,
      required: true,
      enum: ['investigating', 'identified', 'monitoring', 'resolved']
    },
    message: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Incident', incidentSchema); 