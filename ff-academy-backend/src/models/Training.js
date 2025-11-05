const mongoose = require("mongoose");

const trainingSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, default: "" },
    
    // fractional order for flexible inserts
    order: { type: Number, required: true },

    // path encodes full hierarchy (pillar.difficulty.training)
    path: { type: String, required: true, index: true },

    pillarOrder: { type: Number, required: true },
    difficultyOrder: { type: Number, required: true },

    // bump this when content changes (user progress uses seenVersion)
    version: { type: Number, default: 1 },

    // optional metadata
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// keep updatedAt fresh
trainingSchema.pre("save", function (next) {
    this.updatedAt = new Date();
    next();
});

// Example index for fast lookups by difficulty
trainingSchema.index({ difficultyOrder: 1, pillarOrder: 1, order: 1 });

module.exports = mongoose.model("Training", trainingSchema);
