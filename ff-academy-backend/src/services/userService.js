const User = require("../models/User");

const userService = {
    async getAllUsers() {
        return User.find({}).lean();
    },

    async getUserById(id) {
        return User.findById(id).lean();
    },

    async findByEmail(email) {
        return User.findOne({ email }).lean();
    },

    async createUser(data) {
        const user = new User(data);
        return user.save();
    },

    // async deleteUser(id) {
    //     return User.findByIdAndDelete(id).lean();
    // },

    async getUserProgress(userId) {
        const user = await User.findById(userId).lean();
        if (!user) return null;
        return user.progress || [];
    },

    /**
     * Add or update a progress entry for a given training
     * Handles completion, failure, retry cooldown, and version bump.
     */
    // async addOrUpdateProgress(userId, progressData) {
    //     const user = await User.findById(userId);
    //     if (!user) return null;
    
    //     const { trainingId, path, status, seenVersion = 1 } = progressData;
    
    //     // Find existing progress entry for this training
    //     let entry = user.progress.find(p => p.trainingId.toString() === trainingId);
    //     const now = new Date();
    
    //     if (!entry) {
    //         // Prepare new entry
    //         entry = {
    //             trainingId,
    //             path,
    //             status,
    //             seenVersion,
    //             completedAt: null,
    //             failedAt: null,
    //             failCount: 0,
    //             retryAvailableAt: null
    //         };
    
    //         // Apply timestamps for new entry based on its status
    //         if (status === 'completed') {
    //             entry.completedAt = now;
    //         } else if (status === 'failed') {
    //             entry.failedAt = now;
    //             entry.failCount += 1;
    //             // entry.retryAvailableAt = new Date(now.getTime() + 15 * 24 * 60 * 60 * 1000);
    //             entry.retryAvailableAt = new Date(now.getTime() + 20 * 1000);
    //         }
    
    //         user.progress.push(entry);
    //     } else {
    //         // Update existing
    //         entry.status = status;
    //         entry.seenVersion = seenVersion;
    
    //         // Apply timestamps for existing entry
    //         switch (status) {
    //             case 'completed':
    //                 entry.completedAt = now;
    //                 entry.failedAt = null;
    //                 entry.retryAvailableAt = null;
    //             break;
    //             case 'failed':
    //                 entry.failedAt = now;
    //                 entry.failCount += 1;
    //                 // entry.retryAvailableAt = new Date(now.getTime() + 15 * 24 * 60 * 60 * 1000);
    //                 entry.retryAvailableAt = new Date(now.getTime() + 20 * 1000);
    //             break;
    //         }
    //     }
    
    //     await user.save();
    //     return user.progress;
    // },

    async addOrUpdateProgress(userId, progressData) {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }
    
        const { trainingId, path, status, seenVersion = 1 } = progressData;
        if (!trainingId || !path || !status) {
            throw new Error("Invalid progress data");
        }
    
        const now = new Date();
        let entry = {};
        entry = user.progress.find(p => p.trainingId.toString() === trainingId);
    
        if (!entry) {
            entry = {
                trainingId,
                path,
                status,
                seenVersion,
                completedAt: null,
                failedAt: null,
                failCount: 0,
                retryAvailableAt: null
            };
        
            if (status === "completed") {
                entry.completedAt = now;
            } else if (status === "failed") {
                entry.failedAt = now;
                entry.failCount = 1;
                entry.retryAvailableAt = new Date(now.getTime() + 20 * 1000);
            }
        
            user.progress.push(entry);
        } else {
            entry.status = status;
            entry.seenVersion = seenVersion;
        
            if (status === "completed") {
                entry.completedAt = now;
                entry.failedAt = null;
                entry.retryAvailableAt = null;
            } else if (status === "failed") {
                entry.failedAt = now;
                entry.failCount = (entry.failCount || 0) + 1;
                entry.retryAvailableAt = new Date(now.getTime() + 20 * 1000);
            }
        }
        
        await user.save();
    
        return { ok: true };
    },

    async setPreferredLanguage(userId, lang) {
        const user = await User.findById(userId);
        if (!user) return null;
    
        user.preferredLanguage = lang;
    
        await user.save();
        return user;
    }
    
};

module.exports = userService;
