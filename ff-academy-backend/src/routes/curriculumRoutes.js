const express = require("express");
const curriculumController = require("../controllers/curriculumController");

const router = express.Router();

// Pillars
router.get("/pillars", curriculumController.getPillars);

// Difficulties under a pillar (semantic difficulty names are exposed in controller mapping)
router.get("/pillars/:pillarOrder/difficulties", curriculumController.getDifficultiesForPillar);

// Trainings under a difficulty (semantic name in URL)
router.get("/pillars/:pillarOrder/:difficultyName/trainings", curriculumController.getTrainingsForDifficulty);

// Training detail
router.get("/pillars/:pillarOrder/:difficultyName/trainings/:trainingOrder", curriculumController.getTrainingDetail);

// Quiz for training
router.get("/pillars/:pillarOrder/:difficultyName/trainings/:trainingOrder/quiz", curriculumController.getQuizForTraining);

module.exports = router;
