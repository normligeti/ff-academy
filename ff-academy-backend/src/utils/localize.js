// utils/localize.js
const mongoose = require("mongoose");

/**
 * Extracts the correct language value from a localized string array.
 * Example: [{lang:"en",value:"Hi"}, {lang:"hu",value:"Szia"}]
 */
function extractLocalizedValue(arr, lang) {
    if (!Array.isArray(arr)) return arr;

    const item = arr.find(x => x && x.lang === lang);
    if (item) return item.value;

    // fallback to English
    const fallback = arr.find(x => x && x.lang === "en");
    if (fallback) return fallback.value;

    // fallback to first available
    return arr[0]?.value ?? "";
}

/**
 * Recursively walks through any MongoDB document or JS object and
 * replaces all localized arrays with their language-selected values.
 */
function getLocalized(input, lang) {
    if (input == null) return input;

    // Prevent recursion into special Mongo/JS types
    if (input instanceof mongoose.Types.ObjectId) return input.toString();
    if (input instanceof Date) return input; // or input.toISOString()
    if (Buffer.isBuffer(input)) return input; 
    if (input instanceof RegExp) return input;

    // Localized array: [{ lang, value }]
    if (Array.isArray(input) && input[0] && input[0].lang && "value" in input[0]) {
        return extractLocalizedValue(input, lang);
    }

    // Normal array
    if (Array.isArray(input)) {
        return input.map(item => getLocalized(item, lang));
    }

    // Regular object: recurse
    if (typeof input === "object") {
        const out = {};
        for (const key in input) {
            out[key] = getLocalized(input[key], lang);
        }
        return out;
    }

    // Primitive
    return input;
}

module.exports = { getLocalized };
