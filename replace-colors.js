const fs = require('fs');

const cssPath = 'main.css';
let css = fs.readFileSync(cssPath, 'utf8');

const colorMap = {
    // 1. Greens & Darks -> Navy (#2c2f52)
    '#5f6754': '#2c2f52', // predominant green
    '#5F7564': '#2c2f52', // css variable boda
    '#656f52': '#2c2f52', // dark green variant
    '#6d7882': '#2c2f52', // grayish green

    // 2. Golds & Accents -> Terracotta (#d95c4a)
    '#876e44': '#d95c4a', // predominant gold
    '#af9969': '#d95c4a', // secondary gold
    '#ffe1ba': '#d95c4a', // light gold
    '#5cb85c': '#d95c4a', // success button green -> terracotta
    '#f0ad4e': '#d95c4a', // warning button
    '#008A20': '#d95c4a', // icon fill (form)
};

let replaceCount = 0;

for (const [oldColor, newColor] of Object.entries(colorMap)) {
    // Create a RegExp for global, case-insensitive replacement
    const regex = new RegExp(oldColor, 'gi');
    const matches = css.match(regex);
    if (matches) {
        replaceCount += matches.length;
        css = css.replace(regex, newColor);
    }
}

fs.writeFileSync(cssPath, css);
console.log(`✅ Color replacement complete. Replaced ${replaceCount} hex color occurrences in main.css.`);
