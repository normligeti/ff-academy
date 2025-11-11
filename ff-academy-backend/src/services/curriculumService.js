const Pillar = require("../models/Pillar");
const Training = require("../models/Training");
const Quiz = require("../models/Quiz");
const User = require("../models/User");

const curriculumService = {
    // --- PILLARS ---
    async getAllPillars() {
        return Pillar.find({}).sort({ order: 1 }).lean();
    },

    // --- TRAININGS ---
    // async getTrainingsForDifficulty(pillarOrder, difficultyName) {
    //     const pillar = await Pillar.findOne({ order: pillarOrder }).lean();
    //     if (!pillar) throw new Error("Pillar not found");

    //     const difficulty = pillar.difficulties.find(d => d.name === difficultyName);
    //     if (!difficulty) throw new Error("Difficulty not found");

    //     return Training.find({
    //         pillarOrder,
    //         difficultyOrder: difficulty.order
    //     })
    //         .sort({ order: 1 })
    //         .lean();
    // },

    // test for user specific stuff
    // const userId = '68f027ed4ac1082b77d6d3c3';
    // async getTrainingsForDifficulty(pillarOrder, difficultyName) {
    //     const userId = '68f027ed4ac1082b77d6d3c3';
    //     const user = await User.findById(userId).lean();
    //     if (!user) throw new Error('User not found');
    
    //     const pillar = await Pillar.findOne({ order: pillarOrder }).lean();
    //     if (!pillar) throw new Error('Pillar not found');
    
    //     const difficulty = pillar.difficulties.find(d => d.name === difficultyName);
    //     if (!difficulty) throw new Error('Difficulty not found');
    
    //     const trainings = await Training.find({
    //         pillarOrder,
    //         difficultyOrder: difficulty.order
    //     })
    //         .sort({ order: 1 })
    //         .lean();
    
    //     const userProgress = user.progress || [];
    
    //     // merge training info with user progress
    //     const decorated = trainings.map(t => {
    //         const progressEntry = userProgress.find(
    //             p => p.trainingId.toString() === t._id.toString()
    //         );
    
    //         return {
    //             ...t,
    //             userProgress: progressEntry
    //                 ? {
    //                     status: progressEntry.status,
    //                     completedAt: progressEntry.completedAt || null,
    //                     failedAt: progressEntry.failedAt || null,
    //                     retryAvailableAt: progressEntry.retryAvailableAt || null,
    //                     seenVersion: progressEntry.seenVersion
    //                 }
    //                 : {
    //                     status: 'not_started',
    //                     completedAt: null,
    //                     failedAt: null,
    //                     retryAvailableAt: null,
    //                     seenVersion: 1
    //                 }
    //         };
    //     });
    
    //     return decorated;
    // },

    async getDecoratedTrainingsForUser(userId) {
        const user = await User.findById(userId).lean();
        if (!user) throw new Error("User not found");

        const trainings = await Training.find({}).sort({ order: 1 }).lean();
        const userProgress = user.progress || [];
        const now = Date.now();

        // Sort all trainings globally: difficulty-major order (1.1.1 → 4.3.2)
        trainings.sort((a, b) => {
            const [pa, da, ta] = a.path.split('.').map(Number);
            const [pb, db, tb] = b.path.split('.').map(Number);
            if (da !== db) return da - db;     // difficulty first
            if (pa !== pb) return pa - pb;     // then pillar
            return ta - tb;                    // then training
        });

        // STEP 1: merge progress info into each training
        const decorated = trainings.map(t => {
            const progress = userProgress.find(p => p.trainingId.toString() === t._id.toString());
            const merged = {
                ...t,
                userProgress: {
                    status: progress?.status || null,
                    completedAt: progress?.completedAt || null,
                    failedAt: progress?.failedAt || null,
                    retryAvailableAt: progress?.retryAvailableAt || null,
                    seenVersion: progress?.seenVersion ?? 1,
                }
            };
            return merged;
        });

        const lastProgressIndex = decorated.findLastIndex(
            t => ['completed', 'failed'].includes(t.userProgress.status)
        );
        
        let stopIndex = -1;
        
        if (lastProgressIndex !== -1) {
            const last = decorated[lastProgressIndex].userProgress;
            const retryAt = new Date(last.retryAvailableAt).getTime() || 0;
            if (last.status === 'failed' && retryAt > now) {
                stopIndex = lastProgressIndex;
            }
        }

        // STEP 3: derive global states
        for (let i = 0; i < decorated.length; i++) {
            const t = decorated[i];
            const up = t.userProgress;

            let state = "locked";

            // Base progress logic
            if (up.status === "completed") {
                state = "completed";
            } else if (up.status === "failed") {
                const retryAt = new Date(up.retryAvailableAt).getTime() || 0;
                state = retryAt > now ? "failed" : "available";
            } else if (i === lastProgressIndex + 1 && (stopIndex === -1 || i < stopIndex)) {
                state = "available";
            }

            // "new" = before lastCompleted but never touched
            if (up.status === null && i < lastProgressIndex) {
                state = "new";
            }

            // "modified" = training version bumped since user last saw
            if (t.version > up.seenVersion) {
                state = "modified";
            }

            // lock everything after an active failed training
            if (stopIndex !== -1 && i > stopIndex) {
                state = "locked";
            }

            up.status = state;
        }

        return decorated;
    },

    
    async checkTrainingAccess(userId, trainingId) {
        const user = await User.findById(userId).lean();
        if (!user) return { ok: false, reason: "User not found" };

        const trainings = await Training.find({}).sort({ order: 1 }).lean();
        const userProgress = user.progress || [];
        const now = Date.now();

        // find target training
        const target = trainings.find(t => t._id.toString() === trainingId);
        if (!target) return { ok: false, reason: "Training not found" };

        // sort globally in difficulty-major order
        trainings.sort((a, b) => {
            const [pa, da, ta] = a.path.split('.').map(Number);
            const [pb, db, tb] = b.path.split('.').map(Number);
            if (da !== db) return da - db;
            if (pa !== pb) return pa - pb;
            return ta - tb;
        });

        // merge progress
        const decorated = trainings.map(t => {
            const p = userProgress.find(x => x.trainingId.toString() === t._id.toString());
            return {
                ...t,
                userProgress: {
                    status: p?.status || null,
                    completedAt: p?.completedAt || null,
                    failedAt: p?.failedAt || null,
                    retryAvailableAt: p?.retryAvailableAt || null,
                    seenVersion: p?.seenVersion ?? 1
                }
            };
        });

        const targetIndex = decorated.findIndex(t => t._id.toString() === trainingId);
        const t = decorated[targetIndex];
        const up = t.userProgress;

        // find last completed/failed
        const lastProgressIndex = decorated.findLastIndex(t =>
            ["completed", "failed"].includes(t.userProgress.status)
        );

        // if no progress → only first index allowed
        if (lastProgressIndex === -1) {
            if (targetIndex === 0) {
                let allowQuiz = true;
                t.userProgress.allowQuiz = allowQuiz;
                return { 
                    access: { ok: true, allowTraining: true, allowQuiz: allowQuiz }, 
                    training: t 
                };
            }
            return { 
                access: { ok: false, reason: "Locked" }, 
                training: {} 
            };
        }

        // find if last progress is failed AND still locked by cooldown
        let stopIndex = -1;
        const last = decorated[lastProgressIndex].userProgress;
        if (last.status === "failed") {
            const retryAt = new Date(last.retryAvailableAt).getTime();
            if (retryAt > now) {
                stopIndex = lastProgressIndex;
            }
        }

        // determine state (simplified)
        const versionModified = t.version > up.seenVersion;

        if (versionModified) {
            let allowQuiz = false;
            t.userProgress.allowQuiz = allowQuiz;
            return {
                access: { ok: true, allowTraining: true, allowQuiz: allowQuiz, reason: "Quiz already completed (Modified training)" },
                training: t
            };
        }

        if (up.status === "completed") {
            let allowQuiz = false;
            t.userProgress.allowQuiz = allowQuiz;
            return {
                access: { ok: true, allowTraining: true, allowQuiz: allowQuiz, reason: "Quiz already completed" },
                training: t
            };
        }

        if (up.status === "failed") {
            const retryAt = new Date(up.retryAvailableAt).getTime() || 0;
            const canRetry = retryAt <= now;
            t.userProgress.allowQuiz = canRetry;
            return {
                access: { ok: true, allowTraining: true, allowQuiz: canRetry, reason: canRetry ? undefined : "Retry cooldown" },
                training: t
            }
        }

        if (targetIndex === lastProgressIndex + 1 && (stopIndex === -1 || targetIndex < stopIndex)) {
            let allowQuiz = true;
            t.userProgress.allowQuiz = allowQuiz;
            return {
                access: { ok: true, allowTraining: true, allowQuiz: allowQuiz },
                training: t
            }
        }

        if (targetIndex < lastProgressIndex) {
            // training added earlier in the path → new
            let allowQuiz = true;
            t.userProgress.allowQuiz = allowQuiz;
            return {
                access: { ok: true, allowTraining: true, allowQuiz: allowQuiz },
                training: t
            }
        }

        return {
            access: { ok: false, reason: "Locked" },
            training: {}
        }
    },

    async getTrainingById(trainingId) {
        return Training.findById(trainingId).lean();
    },

    async getTrainingByPath(path) {
        return Training.findOne({ path }).lean();
    },

    // --- QUIZZES ---
    async getQuizForTraining(trainingId) {
        return Quiz.findOne({ trainingId }).lean();
    }
};

module.exports = curriculumService;
