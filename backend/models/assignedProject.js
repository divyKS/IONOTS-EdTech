const mongoose = require("mongoose");

const assignedProjectSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        required: true,
    },
    stepsCompleted: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ["in_progress", "completed"],
        default: "in_progress",
    },
    progress: {
        type: Number,
        default: 0,
    },
    score: {
        type: Number,
        default: 0,
    },
});

module.exports = mongoose.model("AssignedProject", assignedProjectSchema);
