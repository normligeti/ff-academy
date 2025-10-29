const User = require("../models/User");

const userService = {
    async getAllUsers() {
        return User.find({}).lean();
    },

    async getUserById(id) {
        return User.findById(id).lean();
    },

    async createUser(data) {
        const user = new User(data);
        return user.save();
    },

    async deleteUser(id) {
        return User.findByIdAndDelete(id).lean();
    },

    async getUserProgress(userId) {
        const user = await User.findById(userId).lean();
        return user ? user.progress : null;
    },

    async addOrUpdateProgress(userId, progressData) {
        // progressData = { pillarOrder, difficultyOrder, trainingOrder, completed }
        const user = await User.findById(userId);
        if (!user) return null;

        const existing = user.progress.find(
            p =>
                p.pillarOrder === progressData.pillarOrder &&
                p.difficultyOrder === progressData.difficultyOrder &&
                p.trainingOrder === progressData.trainingOrder
        );

        if (existing) {
            existing.completed = progressData.completed ?? existing.completed;
            if (progressData.completed && !existing.completedAt) {
                existing.completedAt = new Date();
            }
        } else {
            user.progress.push({
                ...progressData,
                completedAt: progressData.completed ? new Date() : null
            });
        }

        await user.save();
        return user.progress;
    }
};

module.exports = userService;
