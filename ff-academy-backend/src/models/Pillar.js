const mongoose = require("mongoose");

const localizedStringSchema = new mongoose.Schema({
    lang: { type: String, required: true },
    value: { type: String, default: "" }
}, { _id: false });

const difficultySchema = new mongoose.Schema({
    order: { type: Number, required: true },             // 1 = Basic, 2 = Intermediate, 3 = Master
    name: { type: [localizedStringSchema], required: true },
    subTitle: { type: [localizedStringSchema], default: [] },
    subText: { type: [localizedStringSchema], default: [] } 
}, { _id: false });

const pillarSchema = new mongoose.Schema({
    title: { type: [localizedStringSchema], required: true },
    order: { type: Number, required: true, unique: true },     // 1–4, fixed sequence
    difficulties: { type: [difficultySchema], default: [] }
}, { timestamps: true });

module.exports = mongoose.model("Pillar", pillarSchema);