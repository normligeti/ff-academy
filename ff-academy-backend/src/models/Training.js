// models/Training.js
const mongoose = require("mongoose");

const trainingSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, default: "" },
    order: { type: Number, required: true }, 
    difficultyId: { type: mongoose.Schema.Types.ObjectId, ref: "Difficulty", required: true },
    version: { type: Number, default: 1 },   // bump when content changes
});

module.exports = mongoose.model("Training", trainingSchema);
