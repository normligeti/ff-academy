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
        // progressData = { pillarOrder, difficultyOrder, trainingOrder, completed, failed }
        const user = await User.findById(userId);
        if (!user) return null;
    
        const existing = user.progress.find(
            p =>
                p.pillarOrder === progressData.pillarOrder &&
                p.difficultyOrder === progressData.difficultyOrder &&
                p.trainingOrder === progressData.trainingOrder
        );
    
        const now = new Date();
    
        if (existing) {
            if (progressData.completed) {
                existing.completed = true;
                existing.completedAt = now;
                existing.failedAttempts = 0;
                existing.retryAvailableAt = null;
            } else if (progressData.failed) {
                existing.failedAttempts += 1;
                existing.lastFailedAt = now;
                existing.retryAvailableAt = new Date(
                    now.getTime() + 15 * 24 * 60 * 60 * 1000 // 15 days
                );
            }
        } else {
            user.progress.push({
                ...progressData,
                completedAt: progressData.completed ? now : null,
                failedAttempts: progressData.failed ? 1 : 0,
                lastFailedAt: progressData.failed ? now : null,
                retryAvailableAt: progressData.failed
                    ? new Date(now.getTime() + 15 * 24 * 60 * 60 * 1000)
                    : null
            });
        }
    
        await user.save();
        return user.progress;
    }
};

module.exports = userService;
