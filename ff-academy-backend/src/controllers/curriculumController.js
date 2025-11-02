const curriculumService = require("../services/curriculumService");
const userService = require("../services/userService");
const trainingService = require("../services/trainingService");

const DIFFICULTY_NAME_TO_ORDER = { basic: 1, intermediate: 2, master: 3 };
const DIFFICULTY_ORDER_TO_NAME = { 1: "basic", 2: "intermediate", 3: "master" };

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

    // GET /pillars/:pillarOrder/difficulties
    async getDifficultiesForPillar(req, res) {
        try {
            const { pillarOrder } = req.params;
            const pillar = await curriculumService.findPillarByOrder(pillarOrder);
            if (!pillar) {
                return res.status(404).json({ message: "Pillar not found" });
            }

            const diffs = await curriculumService.listDifficultiesByPillarId(pillar._id);
            // unnecessary map cause name is already stored?
            const data = diffs.map(d => ({
                _id: d._id,
                pillarId: d.pillarId,
                order: d.order,
                name: DIFFICULTY_ORDER_TO_NAME[d.order] || String(d.order)
            }));

            res.json(data);
        } catch (err) {
            console.error("getDifficultiesForPillar error:", err);
            res.status(500).json({ message: "Failed to fetch difficulties" });
        }
    },

    // GET /difficulties
    async getAllDifficulties(req, res) {
        try {
            const diffs = await curriculumService.listAllDifficulties();
            // const data = diffs.map(d => ({
            //     _id: d._id,
            //     pillarId: d.pillarId,
            //     order: d.order,
            //     name: DIFFICULTY_ORDER_TO_NAME[d.order] || String(d.order)
            // }));

            res.json(diffs);
        } catch (err) {
            console.error("getDifficultiesForPillar error:", err);
            res.status(500).json({ message: "Failed to fetch difficulties" });
        }
    },

    // GET /pillars/:pillarOrder/:difficultyName/trainings
    async getTrainingsForDifficulty(req, res) {
        try {
            const { pillarOrder, difficultyName } = req.params;
            // const { userId, pillarOrder, difficultyName } = req.params;
            const difficultyOrder = DIFFICULTY_NAME_TO_ORDER[difficultyName];
            if (!difficultyOrder) {
                return res.status(400).json({ message: "Invalid difficulty name" });
            }

            const pillar = await curriculumService.findPillarByOrder(pillarOrder);
            if (!pillar) {
                return res.status(404).json({ message: "Pillar not found" });
            }

            const difficulty = await curriculumService.findDifficultyByPillarIdAndOrder(pillar._id, difficultyOrder);
            if (!difficulty) {
                return res.status(404).json({ message: "Difficulty not found" });
            }

            // const trainings = await curriculumService.listTrainingsByDifficultyId(difficulty._id);
            const trainings = await trainingService.getTrainingsForUser('68f027ed4ac1082b77d6d3c3', difficulty._id);
            res.json(trainings);
        } catch (err) {
            console.error("getTrainingsForDifficulty error:", err);
            res.status(500).json({ message: "Failed to fetch trainings" });
        }
    },

    // GET /pillars/:pillarOrder/:difficultyName/trainings/:trainingOrder
    async getTrainingDetail(req, res) {
        try {
            const { pillarOrder, difficultyName, trainingOrder } = req.params;
            const { userId } = req.query; // frontend must pass ?userId=...

            const difficultyOrder = DIFFICULTY_NAME_TO_ORDER[difficultyName];
            if (!difficultyOrder) {
                return res.status(400).json({ message: "Invalid difficulty name" });
            }

            const pillar = await curriculumService.findPillarByOrder(pillarOrder);
            if (!pillar) {
                return res.status(404).json({ message: "Pillar not found" });
            }

            const difficulty = await curriculumService.findDifficultyByPillarIdAndOrder(pillar._id, difficultyOrder);
            if (!difficulty) {
                return res.status(404).json({ message: "Difficulty not found" });
            }

            const training = await curriculumService.findTrainingByDifficultyIdAndOrder(difficulty._id, trainingOrder);
            if (!training) {
                return res.status(404).json({ message: "Training not found" });
            }

            // Progress check
            if (userId) {
                const progress = await userService.getUserProgress(userId);
                const isUnlocked = checkUnlocked(progress, {
                    pillarOrder: Number(pillarOrder),
                    difficultyOrder,
                    trainingOrder: Number(trainingOrder)
                });

                if (!isUnlocked) {
                    return res.status(403).json({ message: "Training locked. Complete previous lessons first." });
                }
            }

            res.json(training);
        } catch (err) {
            console.error("getTrainingDetail error:", err);
            res.status(500).json({ message: "Failed to fetch training detail" });
        }
    },

    // ebben nem is kéne elérhetőséget ellenőrizni
    // GET /pillars/:pillarOrder/:difficultyName/trainings/:trainingOrder/quiz
    async getQuizForTraining(req, res) {
        try {
            const { pillarOrder, difficultyName, trainingOrder } = req.params;
            const { userId } = req.query; // frontend must pass ?userId=...

            const difficultyOrder = DIFFICULTY_NAME_TO_ORDER[difficultyName];
            if (!difficultyOrder) {
                return res.status(400).json({ message: "Invalid difficulty name" });
            }

            const pillar = await curriculumService.findPillarByOrder(pillarOrder);
            if (!pillar) {
                return res.status(404).json({ message: "Pillar not found" });
            }

            const difficulty = await curriculumService.findDifficultyByPillarIdAndOrder(pillar._id, difficultyOrder);
            if (!difficulty) {
                return res.status(404).json({ message: "Difficulty not found" });
            }

            const training = await curriculumService.findTrainingByDifficultyIdAndOrder(difficulty._id, trainingOrder);
            if (!training) {
                return res.status(404).json({ message: "Training not found" });
            }

            // 🔒 Progress check
            if (userId) {
                const progress = await userService.getUserProgress(userId);
                const isUnlocked = checkUnlocked(progress, {
                    pillarOrder: Number(pillarOrder),
                    difficultyOrder,
                    trainingOrder: Number(trainingOrder)
                });

                if (!isUnlocked) {
                    return res.status(403).json({ message: "Quiz locked. Complete previous lessons first." });
                }
            }

            const quiz = await curriculumService.findQuizByTrainingId(training._id);
            if (!quiz) {
                return res.status(404).json({ message: "Quiz not found" });
            }

            res.json(quiz);
        } catch (err) {
            console.error("getQuizForTraining error:", err);
            res.status(500).json({ message: "Failed to fetch quiz" });
        }
    }
};

// check if requested training is unlocked
async function checkUnlocked(progressArray, { pillarOrder, difficultyOrder, trainingOrder }) {
    if (!progressArray) return false;

    // 1. Trainings unlock sequentially
    if (trainingOrder > 1) {
        const prevTrainings = progressArray.filter(
            p => p.pillarOrder === pillarOrder &&
                 p.difficultyOrder === difficultyOrder &&
                 p.trainingOrder < trainingOrder
        );
        if (!prevTrainings.length || prevTrainings.some(p => !p.completed)) {
            return false;
        }
    }

    // 2. Difficulty unlocks depend on rules
    if (difficultyOrder === 2) { // Intermediate
        // All basics across ALL pillars must be complete
        for (let pOrder = 1; pOrder <= 4; pOrder++) {
            const basics = progressArray.filter(
                p => p.pillarOrder === pOrder && p.difficultyOrder === 1
            );
            if (!basics.length || basics.some(p => !p.completed)) {
                return false;
            }
        }
        // Also requires previous pillar's intermediate if not pillar 1
        if (pillarOrder > 1) {
            const prevInter = progressArray.filter(
                p => p.pillarOrder === pillarOrder - 1 && p.difficultyOrder === 2
            );
            if (!prevInter.length || prevInter.some(p => !p.completed)) {
                return false;
            }
        }
    }

    if (difficultyOrder === 3) { // Master
        // All intermediates across ALL pillars must be complete
        for (let pOrder = 1; pOrder <= 4; pOrder++) {
            const inters = progressArray.filter(
                p => p.pillarOrder === pOrder && p.difficultyOrder === 2
            );
            if (!inters.length || inters.some(p => !p.completed)) {
                return false;
            }
        }
        // Also requires previous pillar's master if not pillar 1
        if (pillarOrder > 1) {
            const prevMaster = progressArray.filter(
                p => p.pillarOrder === pillarOrder - 1 && p.difficultyOrder === 3
            );
            if (!prevMaster.length || prevMaster.some(p => !p.completed)) {
                return false;
            }
        }
    }

    // 3. Next pillar at same difficulty depends on previous pillar
    if (pillarOrder > 1 && trainingOrder === 1) {
        const prevPillarSameDiff = progressArray.filter(
            p => p.pillarOrder === pillarOrder - 1 && p.difficultyOrder === difficultyOrder
        );
        if (!prevPillarSameDiff.length || prevPillarSameDiff.some(p => !p.completed)) {
            return false;
        }
    }

    return true;
}


module.exports = curriculumController;
