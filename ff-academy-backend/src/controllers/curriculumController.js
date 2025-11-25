const curriculumService = require("../services/curriculumService");
const userService = require("../services/userService");

const Quiz = require("../models/Quiz");

const curriculumController = {

    // GET /curriculum-data
    async getCurriculumDataForUser(req, res) {
        try {
            const userId = req.userInfo?.id;
            const decorated = await curriculumService.getDecoratedDataForUser(userId);
            res.json(decorated);
        } catch (err) {
            console.error("getCurriculumDataForUser error:", err);
            res.status(500).json({ message: "Failed to fetch data" });
        }
    },

    // // GET /trainings/:trainingId
    // async getTrainingById(req, res) {
    //     try {
    //         const { trainingId } = req.params;
    //         // const userId = req.query.userId;
    //         const userId = '68f027ed4ac1082b77d6d3c3';

    //         const result = await curriculumService.checkTrainingAccess(userId, trainingId);
            
    //         if (!result.access.ok || !result.access.allowTraining) {
    //             return res.status(403).json({ message: result.access.reason });
    //         }

    //         const training = result.training;

    //         res.json(training);
    //     } catch (err) {
    //         console.error("getTrainingById error:", err);
    //         res.status(500).json({ message: "Failed to fetch training" });
    //     }
    // },

    // // GET /trainings/by-path/:path
    // async getTrainingByPath(req, res) {
    //     try {
    //         const { path } = req.params;
    //         // const userId = req.query.userId;
    //         const userId = '68f027ed4ac1082b77d6d3c3';
    //         const lang = req.user?.preferredLanguage || "en";

    //         const training = await curriculumService.getTrainingByPath(path, lang);
    //         if (!training) return res.status(404).json({ message: "Training not found" });

    //         const result = await curriculumService.checkTrainingAccess(userId, training._id);
            
    //         if (!result.access.ok || !result.access.allowTraining) {
    //             return res.status(403).json({ message: result.access.reason });
    //         }

    //         const trainingForResponse = result.training;

    //         res.json(trainingForResponse);
    //     } catch (err) {
    //         console.error("getTrainingByPath error:", err);
    //         res.status(500).json({ message: "Failed to fetch training" });
    //     }
    // },

    // // GET /trainings/:trainingId/quiz
    // async getQuizForTraining(req, res) {
    //     try {
    //         const { trainingId } = req.params;
    //         // const userId = req.query.userId;
    //         const userId = '68f027ed4ac1082b77d6d3c3';
    //         const lang = req.user?.preferredLanguage || "en";

    //         const result = await curriculumService.checkTrainingAccess(userId, trainingId);
            
    //         if (!result.access.ok || !result.access.allowQuiz) {
    //             return res.status(403).json({ message: result.access.reason });
    //         }

    //         const quiz = await curriculumService.getQuizForTraining(trainingId, lang);
    //         if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    //         res.json(quiz);
    //     } catch (err) {
    //         console.error("getQuizForTraining error:", err);
    //         res.status(500).json({ message: "Failed to fetch quiz" });
    //     }
    // }

    async validateQuiz(req, res) {
        try {
            const userId = req.userInfo?.id;
            const trainingInfo = req.body.trainingInfo;
            const submitted = req.body.answers; // format: { questionId: answerId }

            if (!trainingInfo.trainingId || !submitted) {
                return res.status(400).json({ message: "Missing quiz data" });
            }

            const quiz = await Quiz.findOne({ trainingId: trainingInfo.trainingId }).lean();
            if (!quiz) {
                return res.status(404).json({ message: "Quiz not found" });
            }

            let allCorrect = true;

            for (const question of quiz.questions) {
                const qId = question.questionId;
                const submittedAnswerId = submitted[qId];

                // no answer provided for a question
                if (!submittedAnswerId) {
                    allCorrect = false;
                    continue;
                }

                const isCorrect = submittedAnswerId === question.correctAnswerId;

                if (!isCorrect) {
                    allCorrect = false;
                }
            }
            
            const newStatus = allCorrect ? 'completed' : 'failed';
            const skipSaving = (trainingInfo?.status === 'new' && !allCorrect);

            if (!skipSaving) {
                trainingInfo.status = newStatus;
                await userService.addOrUpdateProgress(userId, trainingInfo);
            }

            return res.status(200).json({ quizSuccess: allCorrect });

        } catch (err) {
            console.error("validateQuiz error:", err);
            return res.status(500).json({ message: "Failed to validate quiz" });
        }
    }

};

module.exports = curriculumController;
