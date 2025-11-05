// seed.js
const mongoose = require("mongoose");
const Pillar = require("./models/Pillar.js");
// const Difficulty = require("./models/Difficulty.js");
const Training = require("./models/Training.js");
const Quiz = require("./models/Quiz.js");

// 📌 MongoDB connection
const MONGO_URI = "mongodb://root:password@localhost:27008/ff-academy?authSource=admin";


// --- TEMPLATE DATA ---

const pillars = [
    { title: "Personal Growth & Mindset", order: 1 },
    { title: "Fireflies System & Company Knowledge", order: 2 },
    { title: "Basics of Network Marketing", order: 3 },
    { title: "Activity Tracking & Work Management", order: 4 }
];

// Real trainings for Pillar 1 Basic
const pillar1BasicTrainings = [
    "Why are YOU your most important resource?",
    "Taking Responsibility for Your Own Life",
    "How to Set Realistic, Motivating Goals?",
    "Developing a Learning Routine and Maintaining Discipline",
    "Consistent Work Regardless of Immediate Results"
];

// Placeholder trainings for all others
const placeholderTrainings = {
    basic: ["Training 1", "Training 2", "Training 3", "Training 4", "Training 5"],
    intermediate: ["Training 1", "Training 2", "Training 3"],
    master: ["Training 1", "Training 2"]
};

// Generate simple placeholder quiz
function generatePlaceholderQuiz(trainingTitle) {
    return [
        {
            questionId: 1,
            text: `What is the main idea of "${trainingTitle}"?`,
            answers: ["Option A", "Option B", "Option C", "Option D"],
            correctAnswer: "Option A"
        },
        {
            questionId: 2,
            text: `Which skill is improved by "${trainingTitle}"?`,
            answers: ["Skill A", "Skill B", "Skill C", "Skill D"],
            correctAnswer: "Skill B"
        },
        {
            questionId: 3,
            text: `How can you apply "${trainingTitle}" in real life?`,
            answers: ["Method A", "Method B", "Method C", "Method D"],
            correctAnswer: "Method C"
        }
    ];
}

// --- SEEDING LOGIC ---

async function seed() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Connected to MongoDB.");

        // wipe everything before seeding
        await Promise.all([
            Pillar.deleteMany({}),
            Training.deleteMany({}),
            Quiz.deleteMany({})
        ]);

        console.log("Cleared existing data.");

        for (const pillarData of pillars) {
            const { title, order: pillarOrder } = pillarData;

            const difficulties = [
                { order: 1, name: "basic", subTitle: "Discover the foundations that shape your personal growth and mindset.", subText: `${pillarData.title} basic` },
                { order: 2, name: "intermediate", subTitle: "Discover the foundations that shape your personal growth and mindset.", subText: `${pillarData.title} intermediate` },
                { order: 3, name: "master", subTitle: "Discover the foundations that shape your personal growth and mindset.", subText: `${pillarData.title} master` }
            ];

            // create pillar
            const pillar = new Pillar({
                title,
                order: pillarOrder,
                difficulties
            });
            await pillar.save();

            console.log(`Created pillar: ${pillar.title}`);

            for (const difficulty of difficulties) {
                const { order: difficultyOrder, name: difficultyName } = difficulty;

                const isPillar1Basic = pillarOrder === 1 && difficultyName === "basic";
                const trainingsList = isPillar1Basic
                    ? pillar1BasicTrainings
                    : placeholderTrainings[difficultyName] || [];

                let trainingOrder = 1;
                for (const title of trainingsList) {
                    const path = `${pillarOrder}.${difficultyOrder}.${trainingOrder}`;

                    const training = new Training({
                        title: isPillar1Basic ? title : `${title} for Pillar ${pillarOrder} ${difficultyName}`,
                        description: `Placeholder description for ${title}`,
                        order: trainingOrder,
                        path,
                        pillarOrder,
                        difficultyOrder,
                        version: 1
                    });

                    await training.save();

                    // create a placeholder quiz for each training
                    const quiz = new Quiz({
                        trainingId: training._id,
                        questions: generatePlaceholderQuiz(training.title)
                    });

                    await quiz.save();

                    console.log(`  Added training: ${training.title}`);
                    trainingOrder++;
                }
            }
        }

        console.log("✅ Seeding completed successfully.");
        process.exit(0);
    } catch (err) {
        console.error("❌ Seeding failed:", err);
        process.exit(1);
    }
}

seed();