// models/Training.js
const mongoose = require("mongoose");

const trainingSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    order: { type: Number, required: true },
    difficultyId: { type: mongoose.Schema.Types.ObjectId, ref: "Difficulty", required: true }
}, { timestamps: true });


module.exports = mongoose.model("Training", trainingSchema);




