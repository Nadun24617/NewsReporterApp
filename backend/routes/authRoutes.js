const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");


// Admin Register Route
router.post("/adminregister", async (req, res) => {
    const { firstName, lastName, username, email, password } = req.body;
  
    try {
      // Check if email or username already exists
      const existingAdmin = await Admin.findOne({ $or: [{ email }, { username }] });
      if (existingAdmin) {
        return res.status(400).json({ success: false, message: "Email or username already exists" });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new admin (not approved by default)
      const newAdmin = new Admin({
        firstName,
        lastName,
        username,
        email,
        password: hashedPassword,
        isApproved: false, // Default to false
      });
  
      await newAdmin.save();
  
      res.status(201).json({ success: true, message: "Admin registered successfully. Awaiting approval." });
    } catch (err) {
      console.error("Registration error:", err);
      res.status(500).json({ success: false, message: "Server error" });
    }
  });

  router.put("/admins/:id/approve", async (req, res) => {
    const { id } = req.params;
  
    try {
      const admin = await Admin.findByIdAndUpdate(
        id,
        { isApproved: true }, // Approve the admin
        { new: true }
      );
  
      if (!admin) {
        return res.status(404).json({ success: false, message: "Admin not found" });
      }
  
      res.status(200).json({ success: true, message: "Admin approved successfully", admin });
    } catch (err) {
      console.error("Error approving admin:", err);
      res.status(500).json({ success: false, message: "Server error" });
    }
  });

  router.post("/adminlogin", async (req, res) => {
    const { username, password } = req.body;
  
    try {
      // Find the admin by email
      const admin = await Admin.findOne({ username });
      if (!admin) {
        return res.status(400).json({ success: false, message: "Invalid credentials" });
      }
  
      // Check if the admin is approved
      if (!admin.isApproved) {
        return res.status(403).json({ success: false, message: "Your account is pending approval" });
      }
  
      // Compare passwords
      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) {
        return res.status(400).json({ success: false, message: "Invalid credentials" });
      }
  
      // Return success response
      res.status(200).json({ success: true, message: "Login successful", admin });
    } catch (err) {
      console.error("Login error:", err);
      res.status(500).json({ success: false, message: "Server error" });
    }
  });

router.get('/admins', async (req, res) => {
    try {
      const admins = await Admin.find({}, { password: 0 }); // Exclude passwords from the response
      res.status(200).json(admins);
    } catch (err) {
      console.error('Error fetching admins:', err);
      res.status(500).json({ message: 'Server error' });
    }
  });

  router.put("/admins/:id", async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, username, email } = req.body;
  
    try {
      const updatedAdmin = await Admin.findByIdAndUpdate(
        id,
        { firstName, lastName, username, email },
        { new: true }
      );
      res.status(200).json(updatedAdmin);
    } catch (err) {
      console.error("Error updating admin:", err);
      res.status(500).json({ message: "Server error" });
    }
  });

  router.delete("/admins/:id", async (req, res) => {
    const { id } = req.params;
  
    try {
      await Admin.findByIdAndDelete(id);
      res.status(200).json({ message: "Admin deleted successfully" });
    } catch (err) {
      console.error("Error deleting admin:", err);
      res.status(500).json({ message: "Server error" });
    }
  });

module.exports = router;
