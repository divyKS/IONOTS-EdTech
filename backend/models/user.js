const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum: ['student', 'admin'],
        default: 'student'
    }
});

module.exports = mongoose.model('User', userSchema);