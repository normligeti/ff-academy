const fs = require("fs");
const path = require("path");
const { parse } = require("csv-parse/sync");

// paths
const inputFile = path.resolve("./src/assets/translations.csv");
const outputDir = path.resolve("./src/assets/i18n-generated");

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// read CSV
const csvContent = fs.readFileSync(inputFile, "utf8");

// parse CSV into objects
const records = parse(csvContent, {
  columns: true,
  skip_empty_lines: true,
});

// collect translations per language
const translations = {};

// build per-lang objects
records.forEach((row) => {
  const key = row["key"];
  Object.entries(row).forEach(([lang, value]) => {
    if (lang === "key") return;
    if (!translations[lang]) translations[lang] = {};
    // split dotted keys like HOME.TITLE into nested objects
    const parts = key.split(".");
    let current = translations[lang];
    parts.forEach((part, idx) => {
      if (idx === parts.length - 1) {
        current[part] = value;
      } else {
        current[part] = current[part] || {};
        current = current[part];
      }
    });
  });
});

// write out JSON files per language
for (const [lang, data] of Object.entries(translations)) {
  const outPath = path.join(outputDir, `${lang}.json`);
  fs.writeFileSync(outPath, JSON.stringify(data, null, 2), "utf8");
  console.log(`✔ Wrote ${outPath}`);
}
