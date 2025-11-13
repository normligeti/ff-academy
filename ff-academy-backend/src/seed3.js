const mongoose = require("mongoose");
const Training = require("./models/Training.js");

async function seedTrainingContent() {
    await mongoose.connect("mongodb://root:password@localhost:27008/ff-academy?authSource=admin");

    const content = [
        {
          "type": "paragraph",
          "data": {
            "text": "The Fireflies business doesn’t start with whether you have a good product or how many acquaintances you have — it starts with who YOU are. Your most important resource in this business is not money, not connections, and not even time. It’s YOU: your mindset, your habits, your decisions, and your attitude.",
            "translations": [
              { "lang": "en", "value": "The Fireflies business doesn’t start with whether you have a good product or how many acquaintances you have — it starts with who YOU are..." },
              { "lang": "hu", "value": "A Fireflies üzlet nem azzal kezdődik, hogy jó terméked van-e, vagy hány ismerősöd van — hanem azzal, hogy ki vagy TE..." }
            ]
          }
        },
        {
          "type": "image",
          "data": {
            "src": "assets/knowledgebase/lesson-l.png",
            "alt": "",
            "translations": [
              { "lang": "en", "value": "assets/knowledgebase/lesson-l.png" },
              { "lang": "hu", "value": "assets/knowledgebase/lesson-l.png" }
            ]
          }
        },
        {
          "type": "sectionTitle",
          "data": {
            "number": "01",
            "title": "You are the engine of your own business",
            "translations": [
              { "lang": "en", "value": "You are the engine of your own business" },
              { "lang": "hu", "value": "Te vagy a saját üzleted motorja" }
            ]
          }
        },
        {
          "type": "paragraph",
          "data": {
            "text": "The Fireflies business is an opportunity. A kind of engine that only starts if YOU ignite it. ...",
            "translations": [
              { "lang": "en", "value": "The Fireflies business is an opportunity..." },
              { "lang": "hu", "value": "A Fireflies üzlet egy lehetőség. Egy olyan motor, ami csak akkor indul be, ha TE beindítod..." }
            ]
          }
        },
        {
          "type": "subParagraph",
          "data": {
            "text": "Think of yourself as a business owner:",
            "translations": [
              { "lang": "en", "value": "Think of yourself as a business owner:" },
              { "lang": "hu", "value": "Gondolj magadra üzlettulajdonosként:" }
            ]
          }
        },
        {
          "type": "list",
          "data": {
            "items": [
              "<span class='mbold'>You decide</span> when you work on it.",
              "<span class='mbold'>You decide</span> how seriously you take it.",
              "<span class='mbold'>You decide</span> how much you stick to your own plans."
            ],
            "translations": [
              { "lang": "en", "value": "List of decisions you make about your work" },
              { "lang": "hu", "value": "Lista arról, hogyan döntesz a munkádról" }
            ]
          }
        },
        {
          "type": "callout",
          "data": {
            "text": "<span class='mbold'>Tip:</span> If you work on yourself every day (mentally, professionally, in relationships)...",
            "translations": [
              { "lang": "en", "value": "Tip: If you work on yourself every day..." },
              { "lang": "hu", "value": "Tipp: Ha minden nap dolgozol magadon..." }
            ]
          }
        },
        { "type": "divider", "data": { "translations": [] } },
        {
          "type": "sectionTitle",
          "data": {
            "number": "02",
            "title": "What happens if you are not in focus?",
            "translations": [
              { "lang": "en", "value": "What happens if you are not in focus?" },
              { "lang": "hu", "value": "Mi történik, ha nem vagy fókuszban?" }
            ]
          }
        },
        {
          "type": "subParagraph",
          "data": {
            "text": "If you don’t continuously develop yourself:",
            "translations": [
              { "lang": "en", "value": "If you don’t continuously develop yourself:" },
              { "lang": "hu", "value": "Ha nem fejleszted folyamatosan önmagad:" }
            ]
          }
        },
        {
          "type": "list",
          "data": {
            "items": [
              "You rely on others for inspiration.",
              "You lose control of your time.",
              "You get distracted easily.",
              "You start doubting whether “this is even for you.”"
            ],
            "translations": [
              { "lang": "en", "value": "Consequences of not developing yourself" },
              { "lang": "hu", "value": "A fejlődés hiányának következményei" }
            ]
          }
        },
        {
          "type": "callout",
          "data": {
            "text": "<span class='mbold'>The truth:</span> This business is for anyone who is <span class='mbold'>willing to work on themselves.</span>",
            "translations": [
              { "lang": "en", "value": "The truth: This business is for anyone willing to work on themselves." },
              { "lang": "hu", "value": "Az igazság: Ez az üzlet bárkié, aki hajlandó dolgozni önmagán." }
            ]
          }
        },
        { "type": "divider", "data": { "translations": [] } },
        {
          "type": "sectionTitle",
          "data": {
            "number": "03",
            "title": "Three questions to always keep in mind",
            "translations": [
              { "lang": "en", "value": "Three questions to always keep in mind" },
              { "lang": "hu", "value": "Három kérdés, amit mindig tarts szem előtt" }
            ]
          }
        },
        {
          "type": "textWrapper",
          "data": {
            "pairs": [
              {
                "question": "1. Why am I doing this business?",
                "answer": "Money? Freedom? Growth? Write it down and never forget it!"
              },
              {
                "question": "2. Which habits help me, and which ones hold me back?",
                "answer": "Be completely honest with yourself!"
              },
              {
                "question": "3. What example do I want to set for my team?",
                "answer": "Your team won’t do what you say, but what they see from you."
              }
            ],
            "translations": [
              { "lang": "en", "value": "Self-reflection questions" },
              { "lang": "hu", "value": "Önreflexiós kérdések" }
            ]
          }
        },
        { "type": "divider", "data": { "translations": [] } },
        {
          "type": "sectionTitle",
          "data": {
            "number": "04",
            "title": "Common excuse: “But I’m not good at this…”",
            "translations": [
              { "lang": "en", "value": "Common excuse: “But I’m not good at this…”" },
              { "lang": "hu", "value": "Gyakori kifogás: „De én nem vagyok ebben jó…”" }
            ]
          }
        },
        {
          "type": "subParagraph",
          "data": {
            "text": "Many say:",
            "translations": [
              { "lang": "en", "value": "Many say:" },
              { "lang": "hu", "value": "Sokan mondják:" }
            ]
          }
        },
        {
          "type": "list",
          "data": {
            "items": [
              "“I’m not a good salesperson.”",
              "“I don’t know how to talk to people.”"
            ],
            "translations": [
              { "lang": "en", "value": "Common doubts" },
              { "lang": "hu", "value": "Gyakori kételyek" }
            ]
          }
        },
        {
          "type": "callout",
          "data": {
            "text": "The good news: you don’t have to be. Only one thing is needed: <span class='mbold'>become teachable!</span>",
            "translations": [
              { "lang": "en", "value": "The good news: you don’t have to be perfect. Just be teachable." },
              { "lang": "hu", "value": "A jó hír: nem kell tökéletesnek lenned. Elég, ha tanulékony vagy." }
            ]
          }
        },
        {
          "type": "paragraph",
          "data": {
            "text": "No one is born a ready entrepreneur. Success is the result of <span class='mbold'>learning + practice + growth from mistakes.</span>",
            "translations": [
              { "lang": "en", "value": "No one is born a ready entrepreneur..." },
              { "lang": "hu", "value": "Senki sem születik kész vállalkozónak..." }
            ]
          }
        },
        { "type": "divider", "data": { "translations": [] } },
        {
          "type": "sectionTitle",
          "data": {
            "number": "05",
            "title": "You as a business success factor",
            "translations": [
              { "lang": "en", "value": "You as a business success factor" },
              { "lang": "hu", "value": "Te, mint az üzleti siker tényezője" }
            ]
          }
        },
        {
          "type": "subParagraph",
          "data": {
            "text": "You + Habit + Focus + Growth = Success",
            "translations": [
              { "lang": "en", "value": "You + Habit + Focus + Growth = Success" },
              { "lang": "hu", "value": "Te + Szokás + Fókusz + Fejlődés = Siker" }
            ]
          }
        },
        {
          "type": "list",
          "data": {
            "items": [
              "<span class='mbold'>You:</span> Are you committed and willing to sacrifice for your goals?",
              "<span class='mbold'>Habit:</span> Do you have a daily/weekly plan you follow with discipline and persistence?",
              "<span class='mbold'>Focus:</span> Do you know why you’re doing this, and are you ready to continuously work for it?",
              "<span class='mbold'>Growth:</span> Do you seek new solutions and are you willing to learn and change?"
            ],
            "translations": [
              { "lang": "en", "value": "Elements of success" },
              { "lang": "hu", "value": "A siker elemei" }
            ]
          }
        },
        {
          "type": "callout",
          "data": {
            "text": "If the answer is “yes” to all, and you’re not afraid to work, <span class='mbold'>no one can stop you.</span>",
            "translations": [
              { "lang": "en", "value": "If the answer is yes to all, no one can stop you." },
              { "lang": "hu", "value": "Ha mindenre igen a válasz, senki sem állíthat meg." }
            ]
          }
        },
        { "type": "divider", "data": { "translations": [] } },
        {
          "type": "subHeading",
          "data": {
            "text": "Practical example",
            "translations": [
              { "lang": "en", "value": "Practical example" },
              { "lang": "hu", "value": "Gyakorlati példa" }
            ]
          }
        },
        {
          "type": "borderedParagraph",
          "data": {
            "text": "A new Fireflies member who spends 30 minutes a day learning, talks to 5 new people a week, and reviews their goals every month can build a network in half a year that produces results on its own — but only because they started working on themselves (the first circle is yourself). ",
            "translations": [
              { "lang": "en", "value": "A new Fireflies member who spends 30 minutes a day learning..." },
              { "lang": "hu", "value": "Egy új Fireflies tag, aki napi 30 percet tanulással tölt..." }
            ]
          }
        },
        { "type": "divider", "data": { "translations": [] } },
        {
          "type": "taskWrapper",
          "data": {
            "title": "Task - Create your own value map",
            "goal": "to recognize which inner values and habits you can build on.",
            "translations": [
              { "lang": "en", "value": "Task - Create your own value map" },
              { "lang": "hu", "value": "Feladat - Készítsd el a saját értéktérképed" }
            ]
          }
        },
        {
          "type": "subParagraph",
          "data": {
            "text": "1. Answer in writing:",
            "translations": [
              { "lang": "en", "value": "1. Answer in writing:" },
              { "lang": "hu", "value": "1. Válaszolj írásban:" }
            ]
          }
        },
        {
          "type": "list",
          "data": {
            "items": [
              "Why did you choose Fireflies?",
              "What strengths help you?",
              "Which habits do you need to change?",
              "If you became a successful leader in 2 years..."
            ],
            "translations": [
              { "lang": "en", "value": "Self-reflection questions for task" },
              { "lang": "hu", "value": "Önreflexiós kérdések a feladathoz" }
            ]
          }
        },
        {
          "type": "subParagraph",
          "data": {
            "text": "2. <span class='bold'>Formulate your <span class='blue'>inner motivation in one sentence:</span></span>",
            "translations": [
              { "lang": "en", "value": "Formulate your inner motivation in one sentence" },
              { "lang": "hu", "value": "Fogalmazd meg belső motivációd egy mondatban" }
            ]
          }
        },
        {
          "type": "list",
          "data": {
            "items": [
              "“I work every day because…”",
              "Write this on a note and put it next to your workplace or laptop. This will be your goal."
            ],
            "translations": [
              { "lang": "en", "value": "Motivational writing tips" },
              { "lang": "hu", "value": "Motivációs írási tippek" }
            ]
          }
        },
        { "type": "divider", "data": { "translations": [] } },
        {
          "type": "sectionTitle",
          "data": {
            "title": "Action plan",
            "translations": [
              { "lang": "en", "value": "Action plan" },
              { "lang": "hu", "value": "Cselekvési terv" }
            ]
          }
        },
        {
          "type": "callout",
          "data": {
            "text": "For the next 7 days, spend at least 30 minutes every day on self-development (book, training, video).",
            "translations": [
              { "lang": "en", "value": "For the next 7 days, spend at least 30 minutes on self-development." },
              { "lang": "hu", "value": "A következő 7 napban tölts legalább 30 percet önfejlesztéssel." }
            ]
          }
        },
        {
          "type": "callout",
          "data": {
            "text": "Join at least 1 online group where successful Fireflies networkers share experiences.",
            "translations": [
              { "lang": "en", "value": "Join an online group where networkers share experiences." },
              { "lang": "hu", "value": "Csatlakozz egy online csoporthoz, ahol hálózatépítők tapasztalatokat osztanak meg." }
            ]
          }
        },
        {
          "type": "callout",
          "data": {
            "text": "Come up with one new positive habit that you will start this week and make sure to keep it for at least 30 days.",
            "translations": [
              { "lang": "en", "value": "Create one new positive habit and keep it for 30 days." },
              { "lang": "hu", "value": "Alakíts ki egy új pozitív szokást, és tartsd legalább 30 napig." }
            ]
          }
        }
    ];

    try {
        const trainings = await Training.find({});

        for (let index = 0; index < trainings.length; index++) {
            trainings[index].content = content;
            console.log(`✅ Updated training "${trainings[index].path}"`);
            await trainings[index].save();
        }
    } catch (err) {
        console.error("❌ Error while seeding training:", err);
    } finally {
        await mongoose.disconnect();
        console.log("🔌 MongoDB disconnected.");
    }
}

seedTrainingContent();
