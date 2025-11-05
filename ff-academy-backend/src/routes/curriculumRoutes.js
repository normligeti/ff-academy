const express = require("express");
const curriculumController = require("../controllers/curriculumController");

const router = express.Router();

// Pillars
router.get("/pillars", curriculumController.getPillars);

// Trainings under a difficulty (semantic name in URL)
router.get("/pillars/:pillarOrder/:difficultyName/trainings", curriculumController.getTrainingsForDifficulty);

// Training details
router.get("/trainings/:trainingId", curriculumController.getTrainingById);
router.get("/trainings/by-path/:path", curriculumController.getTrainingByPath);

// Quiz for training
router.get("/trainings/:trainingId/quiz", curriculumController.getQuizForTraining);


module.exports = router;
