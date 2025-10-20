const express = require("express");
const { getUsers, createUser, getUser, deleteUser, loginUser } = require("../controllers/userController");

const router = express.Router();

router.get("/getAll", getUsers);
router.post("/create", createUser);
router.get("/get/:id", getUser);
router.delete("/delete/:id", deleteUser);
router.post("/login", loginUser);


module.exports = router;
