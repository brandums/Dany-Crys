const fs = require('fs');
const { PurgeCSS } = require('purgecss');
const CleanCSS = require('clean-css');
const { execSync } = require('child_process');

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

async function optimizeCSS() {
    console.log('Starting CSS Optimization Pipeline...');
    let purgeableCSS = '';
    let safeCSS = '';

    for (let file of cssFiles) {
        const backupPath = 'backup_css/' + file;
        if (fs.existsSync(backupPath)) {
            const fileContent = `\n/* === ${file.toUpperCase()} === */\n\n` + fs.readFileSync(backupPath, 'utf8') + '\n';
            if (file === 'styles.css' || file === 'post-26022.css') {
                safeCSS += fileContent;
            } else {
                purgeableCSS += fileContent;
            }
        }
    }

    console.log('Running PurgeCSS on bloated library files...');
    const purgeCSSResults = await new PurgeCSS().purge({
        content: ['index.html'],
        css: [{ raw: purgeableCSS }],
        safelist: [
            /^elementor-/, /^dialog-/, /^swiper-/, /^animated/, /^fadeIn/, /^zoomIn/, /^zoomOut/, /^e-gallery-/, /^fa-/, /^fas/, /^fab/, /^far/, /remove-before/, /select-caret-down-wrapper/
        ],
        variables: true,
        keyframes: true,
        fontFace: true
    });

    let purgedCSS = purgeCSSResults[0].css;
    let combinedCSS = purgedCSS + '\n' + safeCSS;

    // DEBUG OUTPUT
    fs.writeFileSync('main-combined-debug.css', combinedCSS);

    console.log('Deduplicating & Merging repeated rules with CleanCSS...');
    const output = new CleanCSS({
        level: { 2: { all: true, removeUnusedAtRules: true } },
        format: 'beautify'
    }).minify(combinedCSS);

    fs.writeFileSync('main.css', output.styles);

    try {
        execSync('npx prettier --write main.css', { stdio: 'inherit' });
        console.log('✅ Formatting Complete!');
    } catch (err) { }
}

optimizeCSS().catch(err => console.error(err));
