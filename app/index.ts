import { application } from "./application"
import { ipcMain } from "electron"

application.init({
    width: 1280,
    height: 720,
    webPreferences: {
        backgroundThrottling: false,
        nodeIntegration: true,
        contextIsolation: false,
    },
    icon: './assets/icon.ico'
}, () => {
    ipcMain.on("ping", (event) => {
        event.sender.send("ping-back", "asd")
    });
})