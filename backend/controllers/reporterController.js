const Reporter = require("../models/Reporter");
const bcrypt = require("bcryptjs");

// Reporter Registration
const registerReporter = async (req, res) => {
    try {
        const { firstName, lastName, email, nic, username, password, confirmPassword, contactNumber, experience } = req.body;

        // Check if password and confirmPassword match
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        // Check if the username or email already exists
        const existingReporter = await Reporter.findOne({ $or: [{ username }, { email }] });
        if (existingReporter) {
            return res.status(400).json({ message: "Username or email already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new reporter
        const newReporter = new Reporter({
            firstName,
            lastName,
            email,
            nic,
            username,
            password: hashedPassword,
            contactNumber,
            experience,
            isApproved: false // Default to false
        });

        // Save the reporter to the database
        await newReporter.save();

        res.status(201).json({ message: "Reporter registered successfully. Waiting for admin approval." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Reporter Login
const loginReporter = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find the reporter by username
        const reporter = await Reporter.findOne({ username });
        if (!reporter) {
            return res.status(400).json({ message: "Reporter not found" });
        }

        // Check if the reporter is approved
        if (!reporter.isApproved) {
            return res.status(403).json({ message: "Your account is not approved yet. Please wait for admin approval." });
        }

        // Compare the password
        const isPasswordValid = await bcrypt.compare(password, reporter.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password" });
        }

        // If everything is valid, return a success response
        res.status(200).json({ message: "Login successful", reporter });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get All Reporters (for Admin Panel)
const getAllReporters = async (req, res) => {
    try {
        const reporters = await Reporter.find({});
        res.status(200).json(reporters);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Approve a Reporter (for Admin Panel)
const approveReporter = async (req, res) => {
    try {
        const reporter = await Reporter.findByIdAndUpdate(
            req.params.id,
            { isApproved: true },
            { new: true }
        );
        res.status(200).json({ message: "Reporter approved", reporter });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Reject a Reporter (for Admin Panel)
const rejectReporter = async (req, res) => {
    try {
        const reporter = await Reporter.findByIdAndUpdate(
            req.params.id,
            { isApproved: false },
            { new: true }
        );
        res.status(200).json({ message: "Reporter rejected", reporter });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateReporter = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        // Find the reporter by ID and update their details
        const updatedReporter = await Reporter.findByIdAndUpdate(id, updates, { new: true });

        if (!updatedReporter) {
            return res.status(404).json({ message: "Reporter not found" });
        }

        res.status(200).json({ message: "Reporter updated successfully", reporter: updatedReporter });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteReporter = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the reporter by ID and delete them
        const deletedReporter = await Reporter.findByIdAndDelete(id);

        if (!deletedReporter) {
            return res.status(404).json({ message: "Reporter not found" });
        }

        res.status(200).json({ message: "Reporter deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    registerReporter,
    loginReporter,
    getAllReporters,
    approveReporter,
    rejectReporter,
    updateReporter,
    deleteReporter
};