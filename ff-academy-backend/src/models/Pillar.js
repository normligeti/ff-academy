const mongoose = require("mongoose");

const pillarSchema = new mongoose.Schema({
    title: { type: String, required: true },
    order: { type: Number, required: true, unique: true }
}, { timestamps: true });

module.exports = mongoose.model("Pillar", pillarSchema);
