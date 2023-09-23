
const { ipcMain } = require('electron');


function addLeadingZero(number) {
    return number.toString().padStart(2, '0');
}

function getCurrentTime() {
    const now = new Date();
    const hours = addLeadingZero(now.getHours());
    const minutes = addLeadingZero(now.getMinutes());
    const seconds = addLeadingZero(now.getSeconds());

    return `${hours}:${minutes}:${seconds}`;
}

/**
 * @type null | module
 */
let text;
/**
 * @type null | Function
 */
let logFunc;

/**
 * Logs to the debug console
 * @param {string} content 
 */
function log(content) {
    if (!text || !text.setText) {
        console.log(`[${getCurrentTime()}] ${content}`);
        return;
    }

    console.log(
        `${text.setText( `[${getCurrentTime()}]`, {dimness: "bright"})} ${content}`
    );
}

async function init() {
    text = (await import("../tools/text.mjs"))["default"];

    ipcMain.on('debug-log', (event, content) => {
        log(content);
    });

    ipcMain.on('debug-connecton', 
        /**
         * @param {import('electron').IpcMainEvent} event 
         */
        (event) => {
            event.sender.send("debug-connection-response");
        }
    );

    if (!text || !text.setText) {
        console.log(`[DEBUG CONSOLE RUNNING]`);
        return;
    }
    console.log(
        "\n\n\n\n\n\n\n",
        `${text.setText(">_ ", {color: "white", blink: true})} ${text.setText(" DEBUG CONSOLE RUNNING ", {bgColor: "white", color: "black"})}`,
        "\n\n\n"
    );
}

module.exports = { init };