const mongoose = require("mongoose");

const localizedStringSchema = new mongoose.Schema({
    lang: { type: String, required: true },
    value: { type: String, default: "" }
}, { _id: false });

const questionSchema = new mongoose.Schema({
    questionId: { type: Number, required: true },
    text: { type: [localizedStringSchema], required: true },
    answers: { type: [[localizedStringSchema]], required: true },
    correctAnswer: { type: [localizedStringSchema], required: true }
});

const quizSchema = new mongoose.Schema({
    trainingId: { type: mongoose.Schema.Types.ObjectId, ref: "Training", required: true },
    questions: [questionSchema]
}, { timestamps: true });

module.exports = mongoose.model("Quiz", quizSchema);