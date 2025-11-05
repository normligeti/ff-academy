const userService = require("../services/userService");

const userController = {
    async getUsers(req, res) {
        try {
            const users = await userService.getAllUsers();
            res.json(users);
        } catch (err) {
            console.error("getUsers error:", err);
            res.status(500).json({ message: "Failed to fetch users" });
        }
    },

    async getUser(req, res) {
        try {
            const user = await userService.getUserById(req.params.id);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            res.json(user);
        } catch (err) {
            console.error("getUser error:", err);
            res.status(500).json({ message: "Failed to fetch user" });
        }
    },

    async createUser(req, res) {
        try {
            const newUser = await userService.createUser(req.body);
            res.status(201).json(newUser);
        } catch (err) {
            console.error("createUser error:", err);
            res.status(500).json({ message: "Failed to create user" });
        }
    },

    async deleteUser(req, res) {
        try {
            const deleted = await userService.deleteUser(req.params.id);
            if (!deleted) {
                return res.status(404).json({ message: "User not found" });
            }
            res.json({ message: "User deleted" });
        } catch (err) {
            console.error("deleteUser error:", err);
            res.status(500).json({ message: "Failed to delete user" });
        }
    },

    async getUserProgress(req, res) {
        try {
            const userId = req.params.id;
            const progress = await userService.getUserProgress(userId);
            if (!progress) {
                return res.status(404).json({ message: "User not found" });
            }
            res.json(progress);
        } catch (err) {
            console.error("getUserProgress error:", err);
            res.status(500).json({ message: "Failed to fetch user progress" });
        }
    },

    async addOrUpdateProgress(req, res) {
        try {
            const userId = req.params.id;
            const progressData = req.body;
            const updatedProgress = await userService.addOrUpdateProgress(userId, progressData);
            if (!updatedProgress) {
                return res.status(404).json({ message: "User not found" });
            }
            res.json(updatedProgress);
        } catch (err) {
            console.error("addOrUpdateProgress error:", err);
            res.status(500).json({ message: "Failed to update progress" });
        }
    }
};

module.exports = userController;
