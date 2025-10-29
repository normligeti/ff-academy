const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

// CRUD
router.get("/", userController.getUsers);
router.get("/:id", userController.getUser);
router.post("/", userController.createUser);
router.delete("/:id", userController.deleteUser);

// Progress
router.get("/:id/progress", userController.getUserProgress);
router.post("/:id/progress", userController.addProgress);

module.exports = router;
