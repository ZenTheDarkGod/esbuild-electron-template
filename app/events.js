const { ipcMain, BrowserWindow } = require('electron');

/**
 * Set up all ipcMain events here
 * @param {BrowserWindow} win 
 */
async function setUpEvents(win) {
    const { log } = await import('../tools/text.mjs')
    if (!win || !win.webContents || !win.webContents.send) {
        log("FAIL", "Window does not have property webContents.send\r")
        throw new Error("Window does not have property webContents.send\r")
    }

    ipcMain.on("ping", (event) => {
        event.sender.send("ping-back", "asd")
    })
}

module.exports = {setUpEvents}