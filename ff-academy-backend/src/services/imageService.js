// src/services/imageService.js
const { createCanvas, loadImage, registerFont } = require('canvas');
const path = require('path');

// Register fonts once at startup
registerFont(path.join(__dirname, 'imageServiceFiles', 'SofiaProSemiBold.OTF'), {
    family: 'SofiaPro',
    weight: 'bold'
});

async function generateCertificate({ 
    name, 
    lessonTitle, 
    moduleTitle, 
    completionDate 
}) {
    const templatePath = path.join(__dirname, "imageServiceFiles", "certificate.png");
    // TODO add error handling so progress saving and errors here are different
    const template = await loadImage(templatePath);

    const width = template.width;
    const height = template.height;

    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext("2d");

    // Draw base template
    ctx.drawImage(template, 0, 0, width, height);

    // Common styles
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // 2. Name (“John Smith”)
    ctx.font = "30px SofiaPro";
    ctx.fillStyle = "#505D65"; // or #333 if you want black
    ctx.fillText(name, width / 2, height * 0.457);

    // 4. LESSON TITLE (the red one in your screenshot)
    ctx.font = "30px SofiaPro";
    ctx.fillStyle = "#505D65"; 
    ctx.fillText(lessonTitle, width / 2, height * 0.575);

    // 6. MODULE TITLE (red, larger)
    ctx.font = "30px SofiaPro";
    ctx.fillStyle = "#0596AE";
    ctx.fillText(moduleTitle, width / 2, height * 0.675);

    // 7. Completion date — bottom center-ish
    ctx.font = "20px SofiaPro";
    ctx.fillStyle = "#505D65";
    ctx.fillText('Date of Completion: ' + completionDate, width / 2, height * 0.792);

    return canvas.toBuffer("image/png");
}

module.exports = {
    generateCertificate
};
