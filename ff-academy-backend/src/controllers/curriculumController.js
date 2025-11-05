const curriculumService = require("../services/curriculumService");

const curriculumController = {
    // GET /pillars
    async getPillars(req, res) {
        try {
            const pillars = await curriculumService.getAllPillars();
            res.json(pillars);
        } catch (err) {
            console.error("getPillars error:", err);
            res.status(500).json({ message: "Failed to fetch pillars" });
        }
    },

    // GET /pillars/:pillarOrder/:difficultyName/trainings
    async getTrainingsForDifficulty(req, res) {
        try {
            const { pillarOrder, difficultyName } = req.params;
            const trainings = await curriculumService.getTrainingsForDifficulty(pillarOrder, difficultyName);
            res.json(trainings);
        } catch (err) {
            console.error("getTrainingsForDifficulty error:", err);
            res.status(500).json({ message: "Failed to fetch trainings" });
        }
    },

    // GET /trainings/:trainingId
    async getTrainingById(req, res) {
        try {
            const { trainingId } = req.params;
            const training = await curriculumService.getTrainingById(trainingId);
            if (!training) return res.status(404).json({ message: "Training not found" });
            res.json(training);
        } catch (err) {
            console.error("getTrainingById error:", err);
            res.status(500).json({ message: "Failed to fetch training" });
        }
    },

    // GET /trainings/by-path/:path
    async getTrainingByPath(req, res) {
        try {
            const { path } = req.params;
            const training = await curriculumService.getTrainingByPath(path);
            if (!training) return res.status(404).json({ message: "Training not found" });
            res.json(training);
        } catch (err) {
            console.error("getTrainingByPath error:", err);
            res.status(500).json({ message: "Failed to fetch training" });
        }
    },

    // GET /trainings/:trainingId/quiz
    async getQuizForTraining(req, res) {
        try {
            const { trainingId } = req.params;
            const quiz = await curriculumService.getQuizForTraining(trainingId);
            if (!quiz) return res.status(404).json({ message: "Quiz not found" });
            res.json(quiz);
        } catch (err) {
            console.error("getQuizForTraining error:", err);
            res.status(500).json({ message: "Failed to fetch quiz" });
        }
    }
};

module.exports = curriculumController;
