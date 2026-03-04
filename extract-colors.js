const fs = require('fs');
const css = fs.readFileSync('main.css', 'utf8');
const hexRegex = /#[0-9a-fA-F]{3,8}\b/g;
const colors = css.match(hexRegex) || [];

const counts = {};
colors.forEach(c => {
    let hex = c.toLowerCase();
    // Normalize 3 char hex to 6 char
    if (hex.length === 4) {
        hex = '#' + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
    }
    counts[hex] = (counts[hex] || 0) + 1;
});

const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
console.log('Top 30 colors found:');
sorted.slice(0, 30).forEach(([hex, count]) => {
    console.log(`${hex}: ${count} times`);
});
