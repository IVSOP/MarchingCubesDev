const fs = require('fs');
const { JSDOM } = require('jsdom');

const hljs = require('highlight.js');

const inputFilePath = process.argv[2];
const outputFilePath = process.argv[3];

// const hljs = require('highlight.js/lib/core');
// hljs.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'));
// hljs.registerLanguage('json', require('highlight.js/lib/languages/json'));
// hljs.registerLanguage('bash', require('highlight.js/lib/languages/bash'));
// hljs.registerLanguage('cpp', require('highlight.js/lib/languages/cpp'));
// hljs.registerLanguage('glsl', require('highlight.js/lib/languages/glsl'));

fs.readFile(inputFilePath, 'utf-8', (err, data) => {
    if (err) {
        console.error('Error reading the input file:', err);
        process.exit(1);
    }

    // Use jsdom to parse the HTML
    const dom = new JSDOM(data);
    const document = dom.window.document;

    // Find all code blocks and highlight them
    document.querySelectorAll('pre code').forEach((block) => {
		// console.log("'" + block.className + "'")
        // const language = block.className.split('language-')[1];
        // const result = hljs.highlight(block.textContent, { language }).value;
        // block.innerHTML = result;
		hljs.highlightElement(block);
    });

    // Write the modified HTML to the output file
    fs.writeFile(outputFilePath, dom.serialize(), (err) => {
        if (err) {
            console.error('Error writing the output file:', err);
            process.exit(1);
        }
        // console.log('Highlighting completed. Output saved to', outputFilePath);
    });
});
