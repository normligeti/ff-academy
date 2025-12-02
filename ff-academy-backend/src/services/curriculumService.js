const Pillar = require("../models/Pillar");
const Training = require("../models/Training");
const Quiz = require("../models/Quiz");
const User = require("../models/User");
const { getLocalized } = require("../utils/localize");

const curriculumService = {
    async getDecoratedDataForUser(userId) {
        const user = await User.findById(userId).lean();
        if (!user) throw new Error("User not found");

        const lang = user.preferredLanguage || "en";
    
        const pillarsRaw = await Pillar.find({}).sort({ order: 1 }).lean();
        const trainingsRaw = await Training.find({}).sort({ order: 1 }).lean();

        const pillars = getLocalized(pillarsRaw, lang);
        const trainings = getLocalized(trainingsRaw, lang);
    
        const userProgress = user.progress || [];
        const now = Date.now();
    
        // Sort all trainings globally: difficulty-major order
        trainings.sort((a, b) => {
            const [pa, da, ta] = a.path.split('.').map(Number);
            const [pb, db, tb] = b.path.split('.').map(Number);
    
            if (da !== db) return da - db;     // difficulty-major
            if (pa !== pb) return pa - pb;
            return ta - tb;
        });
    
        // STEP 1: merge user progress into each training
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
    
        // STEP 2: progression pointer
        const lastProgressIndex = decorated.findLastIndex(
            t => ['completed', 'failed'].includes(t.userProgress.status)
        );
    
        let isLastProgressFailed;
        if (lastProgressIndex !== -1) {
            const last = decorated[lastProgressIndex].userProgress;
            if (last.status === 'failed') {
                isLastProgressFailed = true;
            }
        }
    
    
        // STEP 3: derive global training states
        for (let i = 0; i < decorated.length; i++) {
            const t = decorated[i];
            const up = t.userProgress;
    
            let state = "locked";
    
            if (up.status === "completed") {
                state = "completed";
            } else if (up.status === "failed") {
                const retryAt = new Date(up.retryAvailableAt).getTime() || 0;

                if (retryAt > now) {
                    state = "failed";
                } else {
                    state = "available";
                    decorated[i].quiz = await curriculumService.getQuizWithoutSolution(decorated[i]._id, lang);
                }

            } else if (i === lastProgressIndex + 1 && !isLastProgressFailed) {
                state = "available";
                decorated[i].quiz = await curriculumService.getQuizWithoutSolution(decorated[i]._id, lang);
            } else if (i === lastProgressIndex + 1 && isLastProgressFailed) {
                state = "locked";
            }
    
            if (up.status === null && i < lastProgressIndex) {
                state = "new";
                decorated[i].quiz = await curriculumService.getQuizWithoutSolution(decorated[i]._id, lang);
            }
    
            if (t.version > up.seenVersion) {
                state = "modified";
            }

            // modified above overwrites first as available without this
            if (t.path === '1.1.1') {
                state = 'available';
            }
    
            // safe lock as last step
            if (i > lastProgressIndex + 1) {
                state = "locked";
            }
    
            up.status = state;
        }
    
        // STEP 4: BUILD PILLAR + DIFFICULTY STRUCTURE 
        const decoratedPillars = pillars.map((pillar) => {
            return {
                ...pillar,
                status: "locked", // temporary
                difficulties: pillar.difficulties.map((diff) => ({
                    order: diff.order,
                    name: diff.name,
                    subTitle: diff.subTitle,
                    subText: diff.subText,
                    status: "locked",   // placeholder
                    trainings: []
                }))
            };
        });
    
        // Group trainings into correct pillar/difficulty
        decorated.forEach(t => {
            const [pillarOrder, diffOrder] = t.path.split('.').map(Number);
    
            const pillar = decoratedPillars.find(p => p.order === pillarOrder);
            if (!pillar) return;
    
            const difficulty = pillar.difficulties.find(d => d.order === diffOrder);
            if (!difficulty) return;

            if (t.userProgress.status === 'locked') {
                t.content = []
            };

            difficulty.trainings.push(t);
        });
    
        // STEP 5: Compute difficulty statuss
        decoratedPillars.forEach(pillar => {
            pillar.difficulties.forEach(diff => {
                const trainings = diff.trainings;
    
                const allCompleted = trainings.every(t => ["completed", "new", "modified"].includes(t.userProgress.status));
                const hasAvailable = trainings.some(t => ["available", "failed"].includes(t.userProgress.status));
    
                if (allCompleted) diff.status = "completed";
                else if (hasAvailable) diff.status = "in_progress";
                else diff.status = "locked";
            });
        });
    
        // STEP 6: Compute pillar statuss
        decoratedPillars.forEach((pillar, idx) => {
            const allCompleted = pillar.difficulties.every(d => d.status === "completed");
    
            if (allCompleted) {
                pillar.status = "completed";
                return;
            }
    
            if (idx === 0) {
                pillar.status = "in_progress";
                return;
            }
    
            const prevPillar = decoratedPillars[idx - 1];
            const prevBasic = prevPillar.difficulties.find(d => d.order === 1);
    
            if (prevBasic?.status === "completed") {
                pillar.status = "in_progress";
            } else {
                pillar.status = "locked";
            }
        });
    
        // Final return object
        return {
            pillars: decoratedPillars
        };
    },

    
    // async checkTrainingAccess(userId, trainingId) {
    //     const user = await User.findById(userId).lean();
    //     if (!user) return { ok: false, reason: "User not found" };
        
    //     const lang = user.preferredLanguage || "en";

    //     const trainingsRaw = await Training.find({}).sort({ order: 1 }).lean();
    //     const trainings = getLocalized(trainingsRaw, lang);

    //     const userProgress = user.progress || [];
    //     const now = Date.now();

    //     // find target training
    //     const target = trainings.find(t => t._id.toString() === trainingId);
    //     if (!target) return { ok: false, reason: "Training not found" };

    //     // sort globally in difficulty-major order
    //     trainings.sort((a, b) => {
    //         const [pa, da, ta] = a.path.split('.').map(Number);
    //         const [pb, db, tb] = b.path.split('.').map(Number);
    //         if (da !== db) return da - db;
    //         if (pa !== pb) return pa - pb;
    //         return ta - tb;
    //     });

    //     // merge progress
    //     const decorated = trainings.map(t => {
    //         const p = userProgress.find(x => x.trainingId.toString() === t._id.toString());
    //         return {
    //             ...t,
    //             userProgress: {
    //                 status: p?.status || null,
    //                 completedAt: p?.completedAt || null,
    //                 failedAt: p?.failedAt || null,
    //                 retryAvailableAt: p?.retryAvailableAt || null,
    //                 seenVersion: p?.seenVersion ?? 1
    //             }
    //         };
    //     });

    //     const targetIndex = decorated.findIndex(t => t._id.toString() === trainingId);
    //     const t = decorated[targetIndex];
    //     const up = t.userProgress;

    //     // find last completed/failed
    //     const lastProgressIndex = decorated.findLastIndex(t =>
    //         ["completed", "failed"].includes(t.userProgress.status)
    //     );

    //     // if no progress → only first index allowed
    //     if (lastProgressIndex === -1) {
    //         if (targetIndex === 0) {
    //             let allowQuiz = true;
    //             t.userProgress.allowQuiz = allowQuiz;
    //             return { 
    //                 access: { ok: true, allowTraining: true, allowQuiz: allowQuiz }, 
    //                 training: t 
    //             };
    //         }
    //         return { 
    //             access: { ok: false, reason: "Locked" }, 
    //             training: {} 
    //         };
    //     }

    //     // find if last progress is failed AND still locked by cooldown
    //     let stopIndex = -1;
    //     const last = decorated[lastProgressIndex].userProgress;
    //     if (last.status === "failed") {
    //         const retryAt = new Date(last.retryAvailableAt).getTime();
    //         if (retryAt > now) {
    //             stopIndex = lastProgressIndex;
    //         }
    //     }

    //     // determine state (simplified)
    //     const versionModified = t.version > up.seenVersion;

    //     if (versionModified) {
    //         let allowQuiz = false;
    //         t.userProgress.allowQuiz = allowQuiz;
    //         return {
    //             access: { ok: true, allowTraining: true, allowQuiz: allowQuiz, reason: "Quiz already completed (Modified training)" },
    //             training: t
    //         };
    //     }

    //     if (up.status === "completed") {
    //         let allowQuiz = false;
    //         t.userProgress.allowQuiz = allowQuiz;
    //         return {
    //             access: { ok: true, allowTraining: true, allowQuiz: allowQuiz, reason: "Quiz already completed" },
    //             training: t
    //         };
    //     }

    //     if (up.status === "failed") {
    //         const retryAt = new Date(up.retryAvailableAt).getTime() || 0;
    //         const canRetry = retryAt <= now;
    //         t.userProgress.allowQuiz = canRetry;
    //         return {
    //             access: { ok: true, allowTraining: true, allowQuiz: canRetry, reason: canRetry ? undefined : "Retry cooldown" },
    //             training: t
    //         }
    //     }

    //     if (targetIndex === lastProgressIndex + 1 && (stopIndex === -1 || targetIndex < stopIndex)) {
    //         let allowQuiz = true;
    //         t.userProgress.allowQuiz = allowQuiz;
    //         return {
    //             access: { ok: true, allowTraining: true, allowQuiz: allowQuiz },
    //             training: t
    //         }
    //     }

    //     if (targetIndex < lastProgressIndex) {
    //         // training added earlier in the path → new
    //         let allowQuiz = true;
    //         t.userProgress.allowQuiz = allowQuiz;
    //         return {
    //             access: { ok: true, allowTraining: true, allowQuiz: allowQuiz },
    //             training: t
    //         }
    //     }

    //     return {
    //         access: { ok: false, reason: "Locked" },
    //         training: {}
    //     }
    // },

    // async getTrainingById(trainingId) {
    //     return Training.findById(trainingId).lean();
    // },

    // async getTrainingByPath(path) {
    //     return Training.findOne({ path }).lean();
    // },

    // // --- QUIZZES ---
    // async getQuizForTraining(trainingId) {
    //     return Quiz.findOne({ trainingId }).lean();
    // },

    // async getTrainingById(trainingId, lang = "en") {
    //     const doc = await Training.findById(trainingId).lean();
    //     return doc ? getLocalized(doc, lang) : null;
    // },
    
    // async getTrainingByPath(path, lang = "en") {
    //     const doc = await Training.findOne({ path }).lean();
    //     return doc ? getLocalized(doc, lang) : null;
    // },

    async getQuizWithoutSolution(trainingId, lang = "en") {
        const doc = await Quiz.findOne({ trainingId }).lean();
        if (!doc) return null;
    
        const localized = getLocalized(doc, lang);
    
        // remove correct answers from each question
        localized.questions = localized.questions.map(q => {
            const { correctAnswer, ...safeQuestion } = q;
            return safeQuestion;
        });
    
        return localized;
    },
    
    async getQuizForTraining(trainingId, lang = "en") {
        const doc = await Quiz.findOne({ trainingId }).lean();
        return doc ? getLocalized(doc, lang) : null;
    }
    
};

module.exports = curriculumService;
