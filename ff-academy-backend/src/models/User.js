const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema({
    pillarOrder: { type: Number, required: true },          // e.g. 1–4
    difficultyOrder: { type: Number, required: true },      // 1=basic, 2=intermediate, 3=master
    trainingOrder: { type: Number, required: true },        // training index within difficulty
    completed: { type: Boolean, default: false },
    completedAt: { type: Date },
    seenVersion: { type: Number, default: 1 },
    failedAttempts: { type: Number, default: 0 },
    lastFailedAt: { type: Date },
    retryAvailableAt: { type: Date }
}, { _id: false });

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },

    progress: [progressSchema] // embedded progress records
});

module.exports = mongoose.model("User", userSchema);
