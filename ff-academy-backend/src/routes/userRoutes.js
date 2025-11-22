const express = require("express");
const userController = require("../controllers/userController");
const auth = require("../authMiddleware");

const router = express.Router();

// CRUD
// router.get("/", userController.getUsers);
router.get("/get-user-profile", auth.attachUserInfo, userController.getUser);
router.post("/login", userController.login);
router.post("/", userController.createUser);
router.delete("/:id", userController.deleteUser);

// Progress
router.get("/:id/progress", userController.getUserProgress);
router.post("/:id/progress", userController.addOrUpdateProgress);

module.exports = router;
