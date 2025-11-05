const Pillar = require("../models/Pillar");
const Training = require("../models/Training");
const Quiz = require("../models/Quiz");
const User = require("../models/User");

const curriculumService = {
    // --- PILLARS ---
    async getAllPillars() {
        return Pillar.find({}).sort({ order: 1 }).lean();
    },

    // --- TRAININGS ---
    // async getTrainingsForDifficulty(pillarOrder, difficultyName) {
    //     const pillar = await Pillar.findOne({ order: pillarOrder }).lean();
    //     if (!pillar) throw new Error("Pillar not found");

    //     const difficulty = pillar.difficulties.find(d => d.name === difficultyName);
    //     if (!difficulty) throw new Error("Difficulty not found");

    //     return Training.find({
    //         pillarOrder,
    //         difficultyOrder: difficulty.order
    //     })
    //         .sort({ order: 1 })
    //         .lean();
    // },

    // test for user specific stuff
    // const userId = '68f027ed4ac1082b77d6d3c3';
    async getTrainingsForDifficulty(pillarOrder, difficultyName) {
        const userId = '68f027ed4ac1082b77d6d3c3';
        const user = await User.findById(userId).lean();
        if (!user) throw new Error('User not found');
    
        const pillar = await Pillar.findOne({ order: pillarOrder }).lean();
        if (!pillar) throw new Error('Pillar not found');
    
        const difficulty = pillar.difficulties.find(d => d.name === difficultyName);
        if (!difficulty) throw new Error('Difficulty not found');
    
        const trainings = await Training.find({
            pillarOrder,
            difficultyOrder: difficulty.order
        })
            .sort({ order: 1 })
            .lean();
    
        const userProgress = user.progress || [];
    
        // merge training info with user progress
        const decorated = trainings.map(t => {
            const progressEntry = userProgress.find(
                p => p.trainingId.toString() === t._id.toString()
            );
    
            return {
                ...t,
                userProgress: progressEntry
                    ? {
                        status: progressEntry.status,
                        completedAt: progressEntry.completedAt || null,
                        failedAt: progressEntry.failedAt || null,
                        retryAvailableAt: progressEntry.retryAvailableAt || null,
                        seenVersion: progressEntry.seenVersion
                    }
                    : {
                        status: 'not_started',
                        completedAt: null,
                        failedAt: null,
                        retryAvailableAt: null,
                        seenVersion: 1
                    }
            };
        });
    
        return decorated;
    },
    

    async getTrainingById(trainingId) {
        return Training.findById(trainingId).lean();
    },

    async getTrainingByPath(path) {
        return Training.findOne({ path }).lean();
    },

    // --- QUIZZES ---
    async getQuizForTraining(trainingId) {
        return Quiz.findOne({ trainingId }).lean();
    }
};

module.exports = curriculumService;
