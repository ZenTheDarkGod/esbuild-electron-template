const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('path');
const { setUpEvents } = require("./events")
const textHelper = {
    Reset: '\x1b[0m',
    Bright: '\x1b[1m',
    Dim: '\x1b[2m',
    Underscore: '\x1b[4m',
    Blink: '\x1b[5m',
    Reverse: '\x1b[7m',
    Hidden: '\x1b[8m',
    FgBlack: '\x1b[30m',
    FgRed: '\x1b[31m',
    FgGreen: '\x1b[32m',
    FgYellow: '\x1b[33m',
    FgBlue: '\x1b[34m',
    FgMagenta: '\x1b[35m',
    FgCyan: '\x1b[36m',
    FgWhite: '\x1b[37m',
    BgBlack: '\x1b[40m',
    BgRed: '\x1b[41m',
    BgGreen: '\x1b[42m',
    BgYellow: '\x1b[43m',
    BgBlue: '\x1b[44m',
    BgMagenta: '\x1b[45m',
    BgCyan: '\x1b[46m',
    BgWhite: '\x1b[47m'
};

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

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1280,
        height: 720,
        webPreferences: {
            backgroundThrottling: false,
            nodeIntegration: true,
            contextIsolation: false,
        },
        icon: './assets/icon.ico'
    });

    Menu.setApplicationMenu(null);

    win.loadFile('index.html');
    setUpEvents(win);

    ipcMain.on('debug-log', (event, content) => {
        console.log(
            `${textHelper.Bright}[${getCurrentTime()}]${textHelper.Reset} ${content}\r`
        );
    });
};



app.whenReady().then(() => {
    createWindow();
    console.log(
        `${textHelper.Bright}[${getCurrentTime()}]${textHelper.Reset} Debug console runnig...\r`
    );
});

app.on('window-all-closed', () => {
    app.quit();
    console.log("\r\n");
})
