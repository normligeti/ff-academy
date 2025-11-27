// src/services/imageService.js
const { createCanvas, loadImage, registerFont } = require('canvas');
const path = require('path');

// Register fonts once at startup
registerFont(path.join(__dirname, 'imageServiceFiles', 'SofiaProSemiBold.woff2'), {
    family: 'SofiaPro',
    weight: 'bold'
});

async function generateCertificate({ userName, quizTitle, dateString }) {
    // Load background template
    const templatePath = path.join(__dirname, 'imageServiceFiles', 'certificate.png');
    const template = await loadImage(templatePath);

    // Create canvas same size as template
    const canvas = createCanvas(template.width, template.height);
    const ctx = canvas.getContext('2d');

    // Draw template
    ctx.drawImage(template, 0, 0);

    // Common text settings
    ctx.fillStyle = '#ffffff';
    ctx.textBaseline = 'top';

    // USER NAME
    ctx.font = 'bold 70px MyFont';
    ctx.fillText(userName, 300, 250);

    // QUIZ TITLE
    ctx.font = 'normal 50px MyFont';
    ctx.fillText(quizTitle, 300, 360);

    // DATE (e.g., "Completed on 2025-01-20")
    ctx.font = 'normal 38px MyFont';
    ctx.fillText(dateString, 300, 450);

    // Return buffer to controller
    return canvas.toBuffer('image/png');
}

module.exports = {
    generateCertificate
};
