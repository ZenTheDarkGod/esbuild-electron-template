
import * as cp from 'child_process';
import { log } from './text.mjs';

cp.exec("npm i --save-dev", (err, stdout, stderr) => {
    if (err) {
        log("FAIL", "Error: " + err)
        return;
    }
    log("SUCCESS", "Setup complete!")
});