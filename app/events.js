const { ipcMain } = require('electron');
module.exports = { init }

async function init() {
    ipcMain.on("ping", (event) => {
        event.sender.send("ping-back", "asd")
    })
}
