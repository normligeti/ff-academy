// seed.js
const mongoose = require("mongoose");
const Pillar = require("./models/Pillar.js");
const Difficulty = require("./models/Difficulty.js");
const Training = require("./models/Training.js");
const Quiz = require("./models/Quiz.js");

// 📌 MongoDB connection
const MONGO_URI = "mongodb://root:password@localhost:27008/ff-academy?authSource=admin";

async function seed() {
    try {
        await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("✅ Connected to MongoDB");

        // CLEANUP
        await Pillar.deleteMany({});
        await Difficulty.deleteMany({});
        await Training.deleteMany({});
        await Quiz.deleteMany({});
        console.log("🧹 Cleared existing pillars, difficulties, trainings, quizzes");

        // Pillars data
        const pillars = [
            { title: "Personal Growth & Mindset", order: 1 },
            { title: "Fireflies System & Company Knowledge", order: 2 },
            { title: "Basics of Network Marketing", order: 3 },
            { title: "Activity Tracking & Work Management", order: 4 }
        ];

        // Difficulties data
        const difficulties = [
            { name: "basic", order: 1 },
            { name: "intermediate", order: 2 },
            { name: "master", order: 3 }
        ];

        // Trainings for Pillar 1 (real data for Basic)
        const pillar1BasicTrainings = [
            "Why are YOU your most important resource?",
            "Taking Responsibility for Your Own Life",
            "How to Set Realistic, Motivating Goals?",
            "Developing a Learning Routine and Maintaining Discipline",
            "Consistent Work Regardless of Immediate Results"
        ];

        // Placeholder trainings
        const placeholderTrainings = {
            basic: ["Training 1", "Training 2", "Training 3", "Training 4", "Training 5"],
            intermediate: ["Training 1", "Training 2", "Training 3"],
            master: ["Training 1", "Training 2"]
        };

        // Placeholder quiz generator
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

        for (let p = 0; p < pillars.length; p++) {
            const pillar = await Pillar.create(pillars[p]);
            console.log(`📌 Created Pillar: ${pillar.title}`);

            for (let d = 0; d < difficulties.length; d++) {
                const difficulty = await Difficulty.create({
                    pillarId: pillar._id,
                    name: difficulties[d].name,
                    order: difficulties[d].order,
                    subTitle: `Subtitle for ${difficulties[d].name} of ${pillar.title}`,
                    subText: `Subtext for ${difficulties[d].name} of ${pillar.title}`
                });
                console.log(`   ➡️ Difficulty: ${difficulty.name}`);

                // Pick correct training set
                let trainingTitles;
                if (pillar.order === 1 && difficulty.name === "basic") {
                    trainingTitles = pillar1BasicTrainings; // real data
                } else {
                    trainingTitles = placeholderTrainings[difficulty.name];
                }

                const createdTrainings = [];
                for (let i = 0; i < trainingTitles.length; i++) {
                    const training = await Training.create({
                        difficultyId: difficulty._id,
                        title: `${trainingTitles[i]} for ${pillar.title} ${difficulty.name}`,
                        description: `This is a placeholder text lecture for training ${i+1} ${difficulty.name}.`,
                        order: i + 1
                    });
                    createdTrainings.push(training);
                    console.log(`      📝 Training ${i + 1}: ${training.title}`);
                }

                // Add quizzes for each training
                for (let i = 0; i < createdTrainings.length; i++) {
                    const training = createdTrainings[i];

                    if (pillar.order === 1 && difficulty.name === "basic" && i === 0) {
                        // Real quiz for Pillar 1 Basic Training 1
                        await Quiz.create({
                            trainingId: training._id,
                            questions: [
                                {
                                    questionId: 1,
                                    text: "What is your most important resource in the business?",
                                    answers: ["Your money", "Your connections", "Yourself", "Your time", "Luck"],
                                    correctAnswer: "Yourself"
                                },
                                {
                                    questionId: 2,
                                    text: "What happens if you are not the focus?",
                                    answers: [
                                        "Sooner or later you’ll seek motivation elsewhere",
                                        "You get easily distracted and start doubting",
                                        "Your business develops faster",
                                        "You may not get closer to your goals",
                                        "You decide for others instead"
                                    ],
                                    correctAnswer: "You get easily distracted and start doubting"
                                },
                                {
                                    questionId: 3,
                                    text: "What is the first element of the success formula in the Fireflies business?",
                                    answers: ["Money", "Team", "Company", "Product", "Training", "You"],
                                    correctAnswer: "You"
                                },
                                {
                                    questionId: 4,
                                    text: "What does it mean to be teachable?",
                                    answers: [
                                        "You know everything from the beginning",
                                        "You are open to learning and applying new things",
                                        "You never make mistakes",
                                        "You listen to your sponsor line’s advice and carefully decide whether to apply it",
                                        "You try new methods"
                                    ],
                                    correctAnswer: "You are open to learning and applying new things"
                                },
                                {
                                    questionId: 5,
                                    text: "Why is it important to define your “why”?",
                                    answers: [
                                        "It helps you stay motivated",
                                        "It’s only important for your sponsor, that’s why they ask",
                                        "It only matters when launching a new product",
                                        "It actually distracts from the work",
                                        "It’s only important at the beginning, later it doesn’t matter"
                                    ],
                                    correctAnswer: "It helps you stay motivated"
                                }
                            ]
                        });
                        console.log("         ✅ Real quiz created for Training 1 of Pillar 1 Basic");
                    } else {
                        // Placeholder quiz
                        await Quiz.create({
                            trainingId: training._id,
                            questions: generatePlaceholderQuiz(training.title)
                        });
                        console.log(`         🔹 Placeholder quiz created for ${training.title}`);
                    }
                }
            }
        }

        console.log("🎉 Seeding completed!");
        mongoose.disconnect();
    } catch (error) {
        console.error("❌ Seeding error:", error);
        mongoose.disconnect();
    }
}

seed();
