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

    /**
     * Get all progress records for a user
     */
    async getUserProgress(userId) {
        const user = await User.findById(userId).lean();
        if (!user) return null;
        return user.progress || [];
    },

    /**
     * Add or update a progress entry for a given training
     * Handles completion, failure, retry cooldown, and version bump.
     */
    async addOrUpdateProgress(userId, progressData) {
        const user = await User.findById(userId);
        if (!user) return null;
    
        const { trainingId, path, status = 'not_started', seenVersion = 1 } = progressData;
    
        // Find existing progress entry for this training
        let entry = user.progress.find(p => p.trainingId.toString() === trainingId);
        const now = new Date();
    
        if (!entry) {
            // Prepare new entry
            entry = {
                trainingId,
                path,
                status,
                seenVersion,
                completedAt: null,
                failedAt: null,
                retryAvailableAt: null
            };
    
            // Apply timestamps for new entry based on its status
            if (status === 'completed') {
                entry.completedAt = now;
            } else if (status === 'failed') {
                entry.failedAt = now;
                entry.retryAvailableAt = new Date(now.getTime() + 15 * 24 * 60 * 60 * 1000);
            }
    
            user.progress.push(entry);
        } else {
            // Update existing
            entry.status = status;
            entry.seenVersion = seenVersion;
    
            // Apply timestamps for existing entry
            switch (status) {
                case 'completed':
                    entry.completedAt = now;
                    entry.failedAt = null;
                    entry.retryAvailableAt = null;
                    break;
                case 'failed':
                    entry.failedAt = now;
                    entry.retryAvailableAt = new Date(now.getTime() + 15 * 24 * 60 * 60 * 1000);
                    break;
                case 'in_progress':
                    break;
                case 'not_started':
                    entry.completedAt = null;
                    entry.failedAt = null;
                    entry.retryAvailableAt = null;
                    break;
            }
        }
    
        await user.save();
        return user.progress;
    }
};

module.exports = userService;
