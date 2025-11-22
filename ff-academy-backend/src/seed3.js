const mongoose = require("mongoose");
const Training = require("./models/Training.js");

async function seedTrainingContent() {
    await mongoose.connect("mongodb://root:password@localhost:27008/ff-academy?authSource=admin");

    const content = [
        {
          "type": "paragraph",
          "data": {
            "text": [
              { "lang": "en", "value": "The Fireflies business doesn’t start with whether you have a good product or how many acquaintances you have — it starts with who YOU are. Your most important resource in this business is not money, not connections, and not even time. It’s YOU: your mindset, your habits, your decisions, and your attitude." },
              { "lang": "hu", "value": "A Fireflies üzlet nem azzal kezdődik, hogy jó terméked van-e, vagy hány ismerősöd van — hanem azzal, hogy ki vagy TE. A legfontosabb erőforrásod nem a pénz, nem a kapcsolatok és még csak nem is az idő. Hanem TE: a gondolkodásmódod, a szokásaid, a döntéseid és a hozzáállásod." }
            ]
          }
        },
      
        {
          "type": "image",
          "data": {
            "src": [
              { "lang": "en", "value": "assets/knowledgebase/lesson-l.png" },
              { "lang": "hu", "value": "assets/knowledgebase/lesson-l.png" }
            ],
            "alt": [
              { "lang": "en", "value": "" },
              { "lang": "hu", "value": "" }
            ]
          }
        },
      
        {
          "type": "sectionTitle",
          "data": {
            "number": "01",
            "title": [
              { "lang": "en", "value": "You are the engine of your own business" },
              { "lang": "hu", "value": "Te vagy a saját üzleted motorja" }
            ]
          }
        },
      
        {
          "type": "paragraph",
          "data": {
            "text": [
              { "lang": "en", "value": "The Fireflies business is an opportunity. A kind of engine that only starts if YOU ignite it. ..." },
              { "lang": "hu", "value": "A Fireflies üzlet egy lehetőség. Egy olyan motor, ami csak akkor indul be, ha TE beindítod. ..." }
            ]
          }
        },
      
        {
          "type": "subParagraph",
          "data": {
            "text": [
              { "lang": "en", "value": "Think of yourself as a business owner:" },
              { "lang": "hu", "value": "Gondolj magadra üzlettulajdonosként:" }
            ]
          }
        },
      
        {
          "type": "list",
          "data": {
            "items": [
              [
                { "lang": "en", "value": "<span class='mbold'>You decide</span> when you work on it." },
                { "lang": "hu", "value": "<span class='mbold'>Te döntöd el</span>, mikor dolgozol rajta." }
              ],
              [
                { "lang": "en", "value": "<span class='mbold'>You decide</span> how seriously you take it." },
                { "lang": "hu", "value": "<span class='mbold'>Te döntöd el</span>, mennyire veszed komolyan." }
              ],
              [
                { "lang": "en", "value": "<span class='mbold'>You decide</span> how much you stick to your own plans." },
                { "lang": "hu", "value": "<span class='mbold'>Te döntöd el</span>, mennyire tartod magad a saját tervedhez." }
              ]
            ]
          }
        },
      
        {
          "type": "callout",
          "data": {
            "text": [
              { "lang": "en", "value": "<span class='mbold'>Tip:</span> If you work on yourself every day (mentally, professionally, in relationships)..." },
              { "lang": "hu", "value": "<span class='mbold'>Tipp:</span> Ha minden nap dolgozol magadon (mentálisan, szakmailag, kapcsolatilag)..." }
            ]
          }
        },
      
        { "type": "divider", "data": {} },
      
        {
          "type": "sectionTitle",
          "data": {
            "number": "02",
            "title": [
              { "lang": "en", "value": "What happens if you are not in focus?" },
              { "lang": "hu", "value": "Mi történik, ha nem vagy fókuszban?" }
            ]
          }
        },
      
        {
          "type": "subParagraph",
          "data": {
            "text": [
              { "lang": "en", "value": "If you don’t continuously develop yourself:" },
              { "lang": "hu", "value": "Ha nem fejleszted folyamatosan önmagad:" }
            ]
          }
        },
      
        {
          "type": "list",
          "data": {
            "items": [
              [
                { "lang": "en", "value": "You rely on others for inspiration." },
                { "lang": "hu", "value": "Másokra támaszkodsz inspirációért." }
              ],
              [
                { "lang": "en", "value": "You lose control of your time." },
                { "lang": "hu", "value": "Elveszíted az időd feletti kontrollt." }
              ],
              [
                { "lang": "en", "value": "You get distracted easily." },
                { "lang": "hu", "value": "Könnyen elterelődsz." }
              ],
              [
                { "lang": "en", "value": "You start doubting whether “this is even for you.”" },
                { "lang": "hu", "value": "Elkezdesz kételkedni abban, hogy „ez való-e neked”." }
              ]
            ]
          }
        },
      
        {
          "type": "callout",
          "data": {
            "text": [
              { "lang": "en", "value": "<span class='mbold'>The truth:</span> This business is for anyone who is <span class='mbold'>willing to work on themselves.</span>" },
              { "lang": "hu", "value": "<span class='mbold'>Az igazság:</span> Ez az üzlet bárkié, aki <span class='mbold'>hajlandó dolgozni önmagán.</span>" }
            ]
          }
        },
      
        { "type": "divider", "data": {} },
      
        {
          "type": "sectionTitle",
          "data": {
            "number": "03",
            "title": [
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
                "question": [
                  { "lang": "en", "value": "1. Why am I doing this business?" },
                  { "lang": "hu", "value": "1. Miért csinálom ezt az üzletet?" }
                ],
                "answer": [
                  { "lang": "en", "value": "Money? Freedom? Growth? Write it down and never forget it!" },
                  { "lang": "hu", "value": "Pénz? Szabadság? Fejlődés? Írd le, és soha ne felejtsd el!" }
                ]
              },
              {
                "question": [
                  { "lang": "en", "value": "2. Which habits help me, and which ones hold me back?" },
                  { "lang": "hu", "value": "2. Mely szokások segítenek, és melyek gátolnak?" }
                ],
                "answer": [
                  { "lang": "en", "value": "Be completely honest with yourself!" },
                  { "lang": "hu", "value": "Légy teljesen őszinte magaddal!" }
                ]
              },
              {
                "question": [
                  { "lang": "en", "value": "3. What example do I want to set for my team?" },
                  { "lang": "hu", "value": "3. Milyen példát szeretnék mutatni a csapatomnak?" }
                ],
                "answer": [
                  { "lang": "en", "value": "Your team won’t do what you say, but what they see from you." },
                  { "lang": "hu", "value": "A csapatod nem azt fogja csinálni, amit mondasz, hanem amit tőled lát." }
                ]
              }
            ]
          }
        },
      
        { "type": "divider", "data": {} },
      
        {
          "type": "sectionTitle",
          "data": {
            "number": "04",
            "title": [
              { "lang": "en", "value": "Common excuse: “But I’m not good at this…”" },
              { "lang": "hu", "value": "Gyakori kifogás: „De én nem vagyok ebben jó…”" }
            ]
          }
        },
      
        {
          "type": "subParagraph",
          "data": {
            "text": [
              { "lang": "en", "value": "Many say:" },
              { "lang": "hu", "value": "Sokan mondják:" }
            ]
          }
        },
      
        {
          "type": "list",
          "data": {
            "items": [
              [
                { "lang": "en", "value": "“I’m not a good salesperson.”" },
                { "lang": "hu", "value": "„Nem vagyok jó értékesítő.”" }
              ],
              [
                { "lang": "en", "value": "“I don’t know how to talk to people.”" },
                { "lang": "hu", "value": "„Nem tudok beszélni az emberekkel.”" }
              ]
            ]
          }
        },
      
        {
          "type": "callout",
          "data": {
            "text": [
              { "lang": "en", "value": "The good news: you don’t have to be. Only one thing is needed: <span class='mbold'>become teachable!</span>" },
              { "lang": "hu", "value": "A jó hír: nem kell annak lenned. Csak egy dolog kell: <span class='mbold'>legyél tanulékony!</span>" }
            ]
          }
        },
      
        {
          "type": "paragraph",
          "data": {
            "text": [
              { "lang": "en", "value": "No one is born a ready entrepreneur. Success is the result of <span class='mbold'>learning + practice + growth from mistakes.</span>" },
              { "lang": "hu", "value": "Senki sem születik kész vállalkozónak. A siker a <span class='mbold'>tanulás + gyakorlás + hibákból való fejlődés</span> eredménye." }
            ]
          }
        },
      
        { "type": "divider", "data": {} },
      
        {
          "type": "sectionTitle",
          "data": {
            "number": "05",
            "title": [
              { "lang": "en", "value": "You as a business success factor" },
              { "lang": "hu", "value": "Te, mint az üzleti siker tényezője" }
            ]
          }
        },
      
        {
          "type": "subParagraph",
          "data": {
            "text": [
              { "lang": "en", "value": "You + Habit + Focus + Growth = Success" },
              { "lang": "hu", "value": "Te + Szokás + Fókusz + Fejlődés = Siker" }
            ]
          }
        },
      
        {
          "type": "list",
          "data": {
            "items": [
              [
                { "lang": "en", "value": "<span class='mbold'>You:</span> Are you committed and willing to sacrifice for your goals?" },
                { "lang": "hu", "value": "<span class='mbold'>Te:</span> Elkötelezett vagy és hajlandó vagy áldozatot hozni a céljaidért?" }
              ],
              [
                { "lang": "en", "value": "<span class='mbold'>Habit:</span> Do you have a daily/weekly plan you follow with discipline and persistence?" },
                { "lang": "hu", "value": "<span class='mbold'>Szokás:</span> Van napi/heti terved, amit kitartóan követsz?" }
              ],
              [
                { "lang": "en", "value": "<span class='mbold'>Focus:</span> Do you know why you’re doing this, and are you ready to continuously work for it?" },
                { "lang": "hu", "value": "<span class='mbold'>Fókusz:</span> Tudod, miért csinálod, és készen állsz folyamatosan dolgozni érte?" }
              ],
              [
                { "lang": "en", "value": "<span class='mbold'>Growth:</span> Do you seek new solutions and are you willing to learn and change?" },
                { "lang": "hu", "value": "<span class='mbold'>Fejlődés:</span> Keresel új megoldásokat, és hajlandó vagy tanulni és változni?" }
              ]
            ]
          }
        },
      
        {
          "type": "callout",
          "data": {
            "text": [
              { "lang": "en", "value": "If the answer is “yes” to all, and you’re not afraid to work, <span class='mbold'>no one can stop you.</span>" },
              { "lang": "hu", "value": "Ha mindenre igen a válasz, és nem félsz dolgozni, <span class='mbold'>senki sem állíthat meg.</span>" }
            ]
          }
        },
      
        { "type": "divider", "data": {} },
      
        {
          "type": "subHeading",
          "data": {
            "text": [
              { "lang": "en", "value": "Practical example" },
              { "lang": "hu", "value": "Gyakorlati példa" }
            ]
          }
        },
      
        {
          "type": "borderedParagraph",
          "data": {
            "text": [
              { "lang": "en", "value": "A new Fireflies member who spends 30 minutes a day learning..." },
              { "lang": "hu", "value": "Egy új Fireflies tag, aki napi 30 percet tanulással tölt..." }
            ]
          }
        },
      
        { "type": "divider", "data": {} },
      
        {
          "type": "taskWrapper",
          "data": {
            "title": [
              { "lang": "en", "value": "Task - Create your own value map" },
              { "lang": "hu", "value": "Feladat - Készítsd el a saját értéktérképed" }
            ],
            "goal": [
              { "lang": "en", "value": "to recognize which inner values and habits you can build on." },
              { "lang": "hu", "value": "hogy felismerd, mely belső értékekre és szokásokra tudsz építeni." }
            ]
          }
        },
      
        {
          "type": "subParagraph",
          "data": {
            "text": [
              { "lang": "en", "value": "1. Answer in writing:" },
              { "lang": "hu", "value": "1. Válaszolj írásban:" }
            ]
          }
        },
      
        {
          "type": "list",
          "data": {
            "items": [
              [
                { "lang": "en", "value": "Why did you choose Fireflies?" },
                { "lang": "hu", "value": "Miért választottad a Fireflies-t?" }
              ],
              [
                { "lang": "en", "value": "What strengths help you?" },
                { "lang": "hu", "value": "Mely erősségeid segítenek?" }
              ],
              [
                { "lang": "en", "value": "Which habits do you need to change?" },
                { "lang": "hu", "value": "Mely szokásokat kell megváltoztatnod?" }
              ],
              [
                { "lang": "en", "value": "If you became a successful leader in 2 years..." },
                { "lang": "hu", "value": "Ha két év múlva sikeres vezetővé válnál..." }
              ]
            ]
          }
        },
      
        {
          "type": "subParagraph",
          "data": {
            "text": [
              { "lang": "en", "value": "2. <span class='bold'>Formulate your <span class='blue'>inner motivation in one sentence:</span></span>" },
              { "lang": "hu", "value": "2. <span class='bold'>Fogalmazd meg <span class='blue'>belső motivációd egy mondatban:</span></span>" }
            ]
          }
        },
      
        {
          "type": "list",
          "data": {
            "items": [
              [
                { "lang": "en", "value": "“I work every day because…”" },
                { "lang": "hu", "value": "„Minden nap dolgozom, mert…”" }
              ],
              [
                { "lang": "en", "value": "Write this on a note and put it next to your workplace or laptop. This will be your goal." },
                { "lang": "hu", "value": "Írd ki egy cetlire, és tedd a munkahelyed mellé. Ez lesz a célod." }
              ]
            ]
          }
        },
      
        { "type": "divider", "data": {} },
      
        {
          "type": "sectionTitle",
          "data": {
            "title": [
              { "lang": "en", "value": "Action plan" },
              { "lang": "hu", "value": "Cselekvési terv" }
            ]
          }
        },
      
        {
          "type": "callout",
          "data": {
            "text": [
              { "lang": "en", "value": "For the next 7 days, spend at least 30 minutes every day on self-development (book, training, video)." },
              { "lang": "hu", "value": "A következő 7 napban tölts legalább 30 percet önfejlesztéssel (könyv, tréning, videó)." }
            ]
          }
        },
      
        {
          "type": "callout",
          "data": {
            "text": [
              { "lang": "en", "value": "Join at least 1 online group where successful Fireflies networkers share experiences." },
              { "lang": "hu", "value": "Csatlakozz egy online csoporthoz, ahol sikeres Fireflies hálózatépítők osztanak meg tapasztalatokat." }
            ]
          }
        },
      
        {
          "type": "callout",
          "data": {
            "text": [
              { "lang": "en", "value": "Come up with one new positive habit that you will start this week and make sure to keep it for at least 30 days." },
              { "lang": "hu", "value": "Találj ki egy új pozitív szokást, amelyet ezen a héten kezdesz el, és tartsd legalább 30 napig." }
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
