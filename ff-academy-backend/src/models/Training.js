const mongoose = require("mongoose");

const localizedStringSchema = new mongoose.Schema({
    lang: { type: String, required: true },
    value: { type: String, default: "" }
}, { _id: false });

// Translation schema for each block's data
// const translationSchema = new mongoose.Schema({
//     lang: { type: String, required: true },
//     value: mongoose.Schema.Types.Mixed // same structure as 'data'
// }, { _id: false });

// Generic content block schema
const contentBlockSchema = new mongoose.Schema({
    type: { type: String, required: true }, // e.g. 'heading', 'paragraph', 'list', 'callout', 'section', etc.
    data: mongoose.Schema.Types.Mixed,       // the main payload for this block
    translations: mongoose.Schema.Types.Mixed        // array of per-language values
}, { _id: false });

// training schema
const trainingSchema = new mongoose.Schema({
    title: { type: [localizedStringSchema], required: true },        // WAS: String
    description: { type: [localizedStringSchema], default: [] },     // WAS: String

    order: { type: Number, required: true },
    path: { type: String, required: true, index: true },
    pillarOrder: { type: Number, required: true },
    difficultyOrder: { type: Number, required: true },
    version: { type: Number, default: 1 },

    content: [contentBlockSchema],    // untouched

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