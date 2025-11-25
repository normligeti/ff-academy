const express = require("express");
const curriculumController = require("../controllers/curriculumController");
const auth = require("../authMiddleware");

const router = express.Router();

// Pillars
router.get("/curriculum-data", auth.attachUserInfo, curriculumController.getCurriculumDataForUser);

// Training details
// router.get("/trainings/:trainingId", curriculumController.getTrainingById);
// router.get("/trainings/by-path/:path", curriculumController.getTrainingByPath);

// Quiz for training
// router.get("/trainings/:trainingId/quiz", curriculumController.getQuizForTraining);
router.post("/trainings/quiz-validate", auth.attachUserInfo, curriculumController.validateQuiz);


module.exports = router;
