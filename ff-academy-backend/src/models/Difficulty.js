// models/Difficulty.js
const mongoose = require("mongoose");

const difficultySchema = new mongoose.Schema({
    pillarId: { type: mongoose.Schema.Types.ObjectId, ref: "Pillar", required: true },
    name: { type: String, enum: ["basic", "intermediate", "master"], required: true },
    order: { type: Number, required: true }, // 1=basic, 2=intermediate, 3=master
    subtitle: { type: String },
    subtext: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Difficulty", difficultySchema);