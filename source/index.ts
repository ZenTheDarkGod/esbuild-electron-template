
import { testSend } from "./demo";
import { ipcRenderer } from "electron";

async function main() {
    const res = await testSend();
}

// ipcRenderer.send("debug-console", "anyad");
main()
