const mongoose = require("mongoose");

const trainingSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, default: "" },
    order: { type: Number, required: true },
    path: { type: String, required: true, index: true },
    pillarOrder: { type: Number, required: true },
    difficultyOrder: { type: Number, required: true },
    version: { type: Number, default: 1 },

    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// keep updatedAt fresh
trainingSchema.pre("save", function (next) {
    this.updatedAt = new Date();
    next();
});

module.exports = mongoose.model("Training", trainingSchema);