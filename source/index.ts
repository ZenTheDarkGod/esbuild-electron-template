
import { testSend } from "./demo";
import elConsole from "./tools/elConsole";

async function main() {
    const res = await testSend();
    elConsole.log("asd");
}

main()
