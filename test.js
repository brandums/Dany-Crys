const CleanCSS = require('clean-css');
const css = `
#v2-boton-control {
    pointer-events: auto !important;
    display: none;
    opacity: 0;
    transition: opacity 0.5s ease;
}
`;
const output = new CleanCSS({
    level: {
        2: {
            all: true,
            removeUnusedAtRules: true
        }
    },
    format: 'beautify'
}).minify(css);
console.log(output.styles);
