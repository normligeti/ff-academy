// seed.js
const mongoose = require("mongoose");
const Pillar = require("./models/Pillar.js");
const Training = require("./models/Training.js");
const Quiz = require("./models/Quiz.js");

const MONGO_URI = "mongodb://root:password@localhost:27008/ff-academy?authSource=admin";

// --- LANGS ---

const LANGS = ["hu", "en", "slo", "cz", "ro", "pl", "de", "es"];

function makeLocalized(str) {
    return LANGS.map(lang => ({
        lang,
        value: `${lang}:${str}`
    }));
}

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

// Placeholder trainings for other difficulties
const placeholderTrainings = {
    basic: ["Training 1", "Training 2", "Training 3", "Training 4", "Training 5"],
    intermediate: ["Training 1", "Training 2", "Training 3"],
    master: ["Training 1", "Training 2"]
};

// Generate multilingual quiz
function generateMultilingualQuiz(trainingTitle) {
    return [
        {
            questionId: 1,
            text: makeLocalized(`What is the main idea of "${trainingTitle}"?`),
            answers: [
                { answerId: 1, text: makeLocalized("Option A") },
                { answerId: 2, text: makeLocalized("Option B") },
                { answerId: 3, text: makeLocalized("Option C") },
                { answerId: 4, text: makeLocalized("Option D") }
            ],
            correctAnswerId: 1
        },
        {
            questionId: 2,
            text: makeLocalized(`Which skill is improved by "${trainingTitle}"?`),
            answers: [
                { answerId: 1, text: makeLocalized("Skill A") },
                { answerId: 2, text: makeLocalized("Skill B") },
                { answerId: 3, text: makeLocalized("Skill C") },
                { answerId: 4, text: makeLocalized("Skill D") }
            ],
            correctAnswerId: 2
        },
        {
            questionId: 3,
            text: makeLocalized(`How can you apply "${trainingTitle}" in real life?`),
            answers: [
                { answerId: 1, text: makeLocalized("Method A") },
                { answerId: 2, text: makeLocalized("Method B") },
                { answerId: 3, text: makeLocalized("Method C") },
                { answerId: 4, text: makeLocalized("Method D") }
            ],
            correctAnswerId: 3
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

            // multilingual difficulties
            const difficulties = [
                {
                    order: 1,
                    name: makeLocalized("basic"),
                    subTitle: makeLocalized("Discover the foundations that shape your personal growth and mindset."),
                    subText: makeLocalized(`${pillarData.title} basic`)
                },
                {
                    order: 2,
                    name: makeLocalized("intermediate"),
                    subTitle: makeLocalized("Discover the foundations that shape your personal growth and mindset."),
                    subText: makeLocalized(`${pillarData.title} intermediate`)
                },
                {
                    order: 3,
                    name: makeLocalized("master"),
                    subTitle: makeLocalized("Discover the foundations that shape your personal growth and mindset."),
                    subText: makeLocalized(`${pillarData.title} master`)
                }
            ];

            // create multilingual pillar
            const pillar = new Pillar({
                title: makeLocalized(title),
                order: pillarOrder,
                difficulties
            });

            await pillar.save();
            console.log(`Created pillar: ${title}`);

            // TRAININGS
            for (const difficulty of difficulties) {
                const difficultyOrder = difficulty.order;
                const enName = difficulty.name.find(n => n.lang === "en");
                const difficultyNameRaw = enName?.value || "";
                const difficultyName = difficultyNameRaw.split(":")[1];

                const isPillar1Basic = pillarOrder === 1 && difficultyName === "basic";
                const trainingsList = isPillar1Basic
                    ? pillar1BasicTrainings
                    : placeholderTrainings[difficultyName] || [];

                let trainingOrder = 1;

                for (const baseTrainingTitle of trainingsList) {
                    const finalTitle = isPillar1Basic
                        ? baseTrainingTitle
                        : `${baseTrainingTitle} for Pillar ${pillarOrder} ${difficultyName}`;

                    const path = `${pillarOrder}.${difficultyOrder}.${trainingOrder}`;

                    const training = new Training({
                        title: makeLocalized(finalTitle),
                        description: makeLocalized(`Placeholder description for ${finalTitle}`),
                        order: trainingOrder,
                        path,
                        pillarOrder,
                        difficultyOrder,
                        version: 1,
                        content: [] // empty, as requested
                    });

                    await training.save();

                    // QUIZ
                    const quiz = new Quiz({
                        trainingId: training._id,
                        questions: generateMultilingualQuiz(finalTitle)
                    });
                    await quiz.save();

                    console.log(`  Added training: ${finalTitle}`);

                    trainingOrder++;
                }
            }
        }

        console.log("✅ Multilingual seeding completed successfully.");
        process.exit(0);

    } catch (err) {
        console.error("❌ Seeding failed:", err);
        process.exit(1);
    }
}

seed();
