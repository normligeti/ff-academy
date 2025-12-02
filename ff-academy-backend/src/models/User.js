const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema({
    trainingId: { type: mongoose.Schema.Types.ObjectId, ref: "Training", required: true },
    path: { type: String, required: true },
    status: { type: String },
    completedAt: { type: Date },
    failedAt: { type: Date },
    retryAvailableAt: { type: Date },
    failCount: { type: Number, default: 0 },
    seenVersion: { type: Number, default: 1 }
}, { _id: false });

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true, default: 'default name' }, //TODO remove default
    createdAt: { type: Date, default: Date.now },
    preferredLanguage: { type: String, default: 'en' },
    progress: [progressSchema] // embedded progress records
});

module.exports = mongoose.model("User", userSchema);