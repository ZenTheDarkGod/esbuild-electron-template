
import { IpcMainEvent } from 'electron/main';
import { ipcMain } from '../__mocks__/electron';
import { setDOM } from '../__mocks__/HTML_DOM';

// Your script
import { testSend } from "../source/demo";

describe("Unit testing for electron app", () => {
    beforeAll(() => {
        setDOM();

        ipcMain.once("ping", (event: IpcMainEvent) => {
            event.sender.send("ping-back", "asd")
        })
    })
    it("should resolve", async () => {
        const asd = await testSend()
        expect(asd).toBe(true)
    })
})