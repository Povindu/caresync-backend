const mongoose = require("mongoose");

const doctorTokenSchema = new mongoose.Schema({
    doctorId: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 43200,
    },
    });

module.exports = mongoose.model("DoctorToken", doctorTokenSchema);

