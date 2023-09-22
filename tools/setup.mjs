
import * as cp from 'child_process';
import text from './text.mjs';

cp.exec("npm i --save-dev", (err, stdout, stderr) => {
    if (err) {
        text.debug.error("Error: " + err)
        return;
    }
    text.debug.success("Setup complete!")
});