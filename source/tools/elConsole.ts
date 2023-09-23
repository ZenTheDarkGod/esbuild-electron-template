
import { ipcRenderer } from "electron"

/**
 * Electrton debug console
 */
namespace elConsole {

    let firstLog: boolean = true;
    let connected: boolean = false;

    function checkConnection() {
        return new Promise<void>((resolve, reject) => {
            ipcRenderer.send("debug-connecton");
            ipcRenderer.once("debug-connection-response", () => {
                connected = true;
                resolve();
            });
        })
    }

    export async function log(content: any) {
        if (firstLog) {
            await checkConnection();
            firstLog = false;
        }
        if (!connected) return;

        ipcRenderer.send("debug-log", `${content}`);
        return;
    }
}

export default elConsole;