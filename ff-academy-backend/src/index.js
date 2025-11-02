const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const curriculumRoutes = require("./routes/curriculumRoutes");

const app = express();

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:4200",
    credentials: true,
}));

app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use("/users", userRoutes);
app.use("/curriculum", curriculumRoutes);

// Health check
app.get("/health", (req, res) => {
    res.json({ status: "ok" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
