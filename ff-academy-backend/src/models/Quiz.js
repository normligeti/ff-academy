const mongoose = require("mongoose");

const localizedStringSchema = new mongoose.Schema({
    lang: { type: String, required: true },
    value: { type: String, default: "" }
}, { _id: false });

const answerSchema = new mongoose.Schema({
    answerId: { type: Number, required: true },
    text: { type: [localizedStringSchema], required: true }
}, { _id: false });

const questionSchema = new mongoose.Schema({
    questionId: Number,
    text: [localizedStringSchema],
    answers: [answerSchema],
    correctAnswerId: Number
}, { _id: false });

const quizSchema = new mongoose.Schema({
    trainingId: { type: mongoose.Schema.Types.ObjectId, ref: "Training", required: true },
    questions: [questionSchema]
}, { timestamps: true });

module.exports = mongoose.model("Quiz", quizSchema);