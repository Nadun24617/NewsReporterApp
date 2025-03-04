const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors"); // Import CORS

dotenv.config();
const app = express();

// Allow frontend to make API requests
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
})
    .then(() => console.log("✅ MongoDB Connected Successfully"))
    .catch((err) => {
        console.error("❌ MongoDB Connection Error:", err);
        process.exit(1);
    });

// Import routes
const authRoutes = require("./routes/authRoutes");
const reporterRoutes = require("./routes/reporterRoutes"); 

// Use routes
app.use("/api/auth", authRoutes);
app.use("/api/reporters", reporterRoutes); // Use reporterRoutes

// Set PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));