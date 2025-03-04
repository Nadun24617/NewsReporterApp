const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");


// Admin Signup
exports.registerAdmin = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        const { firstName, lastName, username, email, password, confirmPassword } = req.body;

        if (password !== confirmPassword) return res.status(400).json({ msg: "Passwords do not match" });

        let emailExists = await Admin.findOne({ email });
        if (emailExists) return res.status(400).json({ msg: "Email already registered" });

        if (username) {
            let usernameExists = await Admin.findOne({ username });
            if (usernameExists) return res.status(400).json({ msg: "Username already taken" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newAdmin = new Admin({ firstName, lastName, username, email, password: hashedPassword });
        await newAdmin.save();

        res.status(201).json({ msg: "Admin registered successfully!" });
    } catch (error) {
        res.status(500).json({ msg: "Server error" });
    }
};
