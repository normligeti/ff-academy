const mongoose = require("mongoose");

const difficultySchema = new mongoose.Schema({
    order: { type: Number, required: true },         // 1 = Basic, 2 = Intermediate, 3 = Master
    name: { type: String, required: true },          // 'basic', 'intermediate', 'master'
    subTitle: { type: String, default: "" },
    subText: { type: String, default: "" }
}, { _id: false }); // don’t need separate _id for each difficulty

const pillarSchema = new mongoose.Schema({
    title: { type: String, required: true },
    order: { type: Number, required: true, unique: true },  // 1–4, fixed sequence
    difficulties: { type: [difficultySchema], default: [] }
}, { timestamps: true });

module.exports = mongoose.model("Pillar", pillarSchema);
