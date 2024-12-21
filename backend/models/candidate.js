const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    skills: [String],
    createdAt: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active'
    }
});

module.exports = mongoose.model('Candidate', candidateSchema);