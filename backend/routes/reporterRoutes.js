const express = require("express");
const router = express.Router();
const reporterController = require("../controllers/reporterController");

// Reporter Registration
router.post("/register", reporterController.registerReporter);

// Reporter Login
router.post("/login", reporterController.loginReporter);

// Admin Routes
router.get("/reporters", reporterController.getAllReporters); // Get all reporters
router.put("/approve/:id", reporterController.approveReporter); // Approve a reporter
router.put("/reject/:id", reporterController.rejectReporter); // Reject a reporter
router.put("/:id", reporterController.updateReporter); // Update reporter details
router.delete("/:id", reporterController.deleteReporter); // Delete a reporter

module.exports = router;