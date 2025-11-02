const Pillar = require("../models/Pillar");
const Difficulty = require("../models/Difficulty");
const Training = require("../models/Training");
const Quiz = require("../models/Quiz");

const curriculumService = {
    // Pillars
    async getAllPillars() {
        return Pillar.find({}).sort({ order: 1 }).lean();
    },

    async findPillarByOrder(pillarOrder) {
        return Pillar.findOne({ order: Number(pillarOrder) }).lean();
    },

    // Difficulties
    async listDifficultiesByPillarId(pillarId) {
        return Difficulty.find({ pillarId }).sort({ order: 1 }).lean();
    },

    async listAllDifficulties() {
        return Difficulty.find({}).sort({ order: 1 }).lean();
    },

    async findDifficultyByPillarIdAndOrder(pillarId, difficultyOrder) {
        return Difficulty.findOne({ pillarId, order: Number(difficultyOrder) }).lean();
    },

    // Trainings
    async listTrainingsByDifficultyId(difficultyId) {
        return Training.find({ difficultyId }).sort({ order: 1 }).lean();
    },

    async findTrainingByDifficultyIdAndOrder(difficultyId, trainingOrder) {
        return Training.findOne({ difficultyId, order: Number(trainingOrder) }).lean();
    },

    // Quiz
    async findQuizByTrainingId(trainingId) {
        return Quiz.findOne({ trainingId }).lean();
    }
};

module.exports = curriculumService;
