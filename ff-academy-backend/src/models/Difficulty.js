import mongoose from "mongoose";

const difficultySchema = new mongoose.Schema({
    pillarId: { type: mongoose.Schema.Types.ObjectId, ref: "Pillar", required: true },
    name: { type: String, enum: ["basic", "intermediate", "master"], required: true },
    order: { type: Number, required: true }
}, { timestamps: true });

export default mongoose.model("Difficulty", difficultySchema);
