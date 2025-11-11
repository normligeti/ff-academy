const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    questionId: { type: Number, required: true },
    text: { type: String, required: true },
    answers: [{ type: String, required: true }],
    correctAnswer: { type: String, required: true }
});

const quizSchema = new mongoose.Schema({
    trainingId: { type: mongoose.Schema.Types.ObjectId, ref: "Training", required: true },
    questions: [questionSchema]
}, { timestamps: true });

module.exports = mongoose.model("Quiz", quizSchema);