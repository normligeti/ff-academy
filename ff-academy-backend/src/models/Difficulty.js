// models/Difficulty.js
const mongoose = require("mongoose");

const difficultySchema = new mongoose.Schema({
    pillarId: { type: mongoose.Schema.Types.ObjectId, ref: "Pillar", required: true },
    // name: { type: String, enum: ["basic", "intermediate", "master"], required: true },
    name: { type: String, required: true },
    order: { type: Number, required: true },
    subTitle: { type: String },
    subText: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Difficulty", difficultySchema);