// models/Pillar.js
import mongoose from "mongoose";

const pillarSchema = new mongoose.Schema({
    title: { type: String, required: true },
    order: { type: Number, required: true, unique: true } 
}, { timestamps: true });

export default mongoose.model("Pillar", pillarSchema);
