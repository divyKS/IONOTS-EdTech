const mongoose = require("mongoose");

const candidateProjectSchema = new mongoose.Schema({
  candidateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Candidate",
    required: true,
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  status: {
    type: String,
    enum: ["accepted", "in_progress", "submitted", "evaluated"],
    default: "accepted",
  },
  progress: {
    type: Number,
    default: 0
  },
  score: {
    type: Number,
    default: 0
  },
  submissionDate: Date,
  feedback: String,
});

module.exports = mongoose.model('Candidate', candidateProjectSchema);