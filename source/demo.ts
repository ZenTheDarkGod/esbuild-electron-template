import { ipcRenderer } from 'electron';

export function testSend() {
    return new Promise<boolean>((resolve, reject) => {
        ipcRenderer.send("ping");
        ipcRenderer.once("ping-back", (event, content) => {
            // document.querySelector<HTMLElement>(".app")!.innerText = content;
            console.log("pinged-back", content);
            resolve(true);
        })
    })
}
