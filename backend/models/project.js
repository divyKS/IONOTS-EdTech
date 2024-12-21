const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    deadline: {
      type: Date,
      required: true
    },
    skillsRequired: [String],
    status: {
      type: String,
      enum: ['available', 'assigned', 'completed'],
      default: 'available'
    }
});

module.exports = mongoose.model('Project', projectSchema);