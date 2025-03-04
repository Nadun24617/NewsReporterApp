const mongoose = require("mongoose");

const reporterSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    nic: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    contactNumber: { type: String, required: true },
    experience: { type: String, required: true }, 
    isApproved: { type: Boolean, default: false } // New field to track approval status
});

module.exports = mongoose.model("Reporter", reporterSchema);