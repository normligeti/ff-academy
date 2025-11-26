const express = require("express");
const userController = require("../controllers/userController");
const auth = require("../authMiddleware");

const router = express.Router();

// CRUD
// router.get("/", userController.getUsers);
router.get("/get-user-profile", auth.attachUserInfo, userController.getUser);
router.post("/login", userController.login);
router.post("/logout", auth.attachUserInfo, userController.logout);
router.post("/", userController.createUser);
// router.delete("/:id", userController.deleteUser);

// Progress
// router.get("/:id/progress", userController.getUserProgress);
// router.post("/:id/progress", userController.addOrUpdateProgress);
router.put('/set-preferred-language', auth.attachUserInfo, userController.setPreferredLanguage);

module.exports = router;
