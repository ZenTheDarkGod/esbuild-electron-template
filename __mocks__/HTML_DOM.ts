
const { JSDOM } = require('jsdom');

export function setDOM() {
    const dom = new JSDOM(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Test Document</title>
        </head>
        <body>
            <div id="app"></div>
        </body>
        </html>
    `);
    
    global.document = dom.window.document;
    global.window = dom.window;
}
