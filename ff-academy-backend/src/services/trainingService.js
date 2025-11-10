// // services/trainingService.js
// const Training = require("../models/Training");
// const User = require("../models/User");

// async function getTrainingsForUser(userId, difficultyId) {
//     const user = await User.findById(userId).lean();
//     const trainings = await Training.find({ difficultyId }).lean();

//     if (!user) {
//         throw new Error("User not found");
//     }

//     // Map trainings with badge info
//     const trainingsWithStatus = trainings.map(training => {
//         const progressEntry = user.progress?.find(p =>
//             p.pillarOrder === training.pillarOrder &&
//             p.difficultyOrder === training.difficultyOrder &&
//             p.trainingOrder === training.trainingOrder
//         );

//         let status = null;
//         if (!progressEntry) {
//             status = "new";
//         } else if (progressEntry.seenVersion < training.version) {
//             status = "modified";
//         }

//         return {
//             ...training,
//             status, // null | "new" | "modified"
//             completed: progressEntry ? progressEntry.completed : false
//         };
//     });

//     return trainingsWithStatus;
// }

// module.exports = { getTrainingsForUser };
