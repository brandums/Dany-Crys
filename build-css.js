const fs = require('fs');

const cssFiles = [
    "frontend.css",
    "post-1947.css",
    "widget-spacer.css",
    "widget-heading.css",
    "widget-image.css",
    "fadeIn.css",
    "widget-countdown.css",
    "swipper.css",
    "widget-gallery.css",
    "e-gallery.css",
    "transitions.css",
    "widget-form.css",
    "lightbox.css",
    "widget-google_maps.css",
    "zoomIn.css",
    "conditionals.css",
    "post-26022.css",
    "styles.css"
];

let bundles = '';
for (let file of cssFiles) {
    const backupPath = 'backup_css/' + file;
    if (fs.existsSync(backupPath)) {
        bundles += `\n/* ==========================================================================\n   ${file.toUpperCase()}\n   ========================================================================== */\n\n`;
        bundles += fs.readFileSync(backupPath, 'utf8') + '\n';
    } else {
        console.warn(`File ${backupPath} not found!`);
    }
}

fs.writeFileSync('main.css', bundles);
console.log('Successfully created structured main.css. Formatting with prettier...');

const { execSync } = require('child_process');
try {
    execSync('npx prettier --write main.css', { stdio: 'inherit' });
    console.log('✅ Formatted main.css successfully!');
} catch (error) {
    console.warn('Formatting skipped. Prettier may not be installed.');
}
