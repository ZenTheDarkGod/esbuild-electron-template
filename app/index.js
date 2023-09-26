const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('path');
const events = require("./events");
const debugconsole = require("./debug-console");

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
    events.init();

    debugconsole.init();

    ipcMain.on('exit-app', () => {
        win.close();
    });
};

app.whenReady().then(() => {
    createWindow();
});

app.on('window-all-closed', () => {
    app.quit();
    console.log("\r\n");
})

