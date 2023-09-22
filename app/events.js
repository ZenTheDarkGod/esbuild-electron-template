const { ipcMain } = require('electron');

async function setUpEvents() {
    ipcMain.on("ping", (event) => {
        event.sender.send("ping-back", "asd")
    })
}

module.exports = { setUpEvents }