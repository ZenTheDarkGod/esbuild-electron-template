export const thc = {
    Reset: '\x1b[0m',
    Bright: '\x1b[1m',
    Dim: '\x1b[2m',
    Underscore: '\x1b[4m',
    Blink: '\x1b[5m',
    Reverse: '\x1b[7m',
    Hidden: '\x1b[8m',
    FgBlack: '\x1b[30m',
    FgRed: '\x1b[31m',
    FgGreen: '\x1b[32m',
    FgYellow: '\x1b[33m',
    FgBlue: '\x1b[34m',
    FgMagenta: '\x1b[35m',
    FgCyan: '\x1b[36m',
    FgWhite: '\x1b[37m',
    BgBlack: '\x1b[40m',
    BgRed: '\x1b[41m',
    BgGreen: '\x1b[42m',
    BgYellow: '\x1b[43m',
    BgBlue: '\x1b[44m',
    BgMagenta: '\x1b[45m',
    BgCyan: '\x1b[46m',
    BgWhite: '\x1b[47m'
};

/**
 * 
 * @param {"SUCCESS" | "FAIL"} type 
 * @param {string} message 
 */
export function log(type, message, err) {
    type = type.toUpperCase();
    const textTransform = type === "FAIL" ? `${thc.BgRed}` : `${thc.BgGreen}`
    const symbol = type === "FAIL" ? `${thc.FgRed}✘` : `${thc.FgGreen}✔`

    console.log([
        `${symbol} ${textTransform} ${type} ${thc.Reset}`,
        message
    ].join(" "))

    if (type === "FAIL") {
        if (!err) throw new Error(message);
        throw new Error(err);
    }
}

const debug = {
    /**
     * 
     * @param {"SUCCESS" | "FAIL"} type 
     * @param {string} message 
     */
    log: function (type, message, err) {
        type = type.toUpperCase();
        const textTransform = type === "FAIL" ? `${thc.BgRed}` : `${thc.BgGreen}`
        const symbol = type === "FAIL" ? `${thc.FgRed}✘` : `${thc.FgGreen}✔`

        console.log([
            `${symbol} ${textTransform} ${type} ${thc.Reset}`,
            message
        ].join(" "))

        if (type === "FAIL") {
            if (!err) throw new Error(message);
            throw new Error(err);
        }
    },
    error: function (message, err) {
        debug.log("FAIL", message, err)
    },
    success: function (message) {
        debug.log("SUCCESS", message)
    }
}

/**
 * 
 * @param {string} text 
 * @param {{
 *  color?: "black" | "green" | "yellow" | "magenta" | "blue" | "cyan" | "white",
 *  bgColor?: "black" | "green" | "yellow" | "magenta" | "blue" | "cyan" | "white",
 *  dimness?: "dim" | "bright",
 *  hidden?: boolean,
 *  blink?: boolean,
 *  reverse?: boolean
 * }} as 
 */
function setText(text, as) {
    const textTransformList = [];

    /**
     * Pushes the text transform to textTransformList
     * @param {keyof thc} key 
     */
    function inThcPush(key) {
        if (thc[key]) {
            textTransformList.push(thc[key]);
        }
    }

    if (as.color) {
        const key = `FG${as.color[0].toUpperCase()}${as.color.slice(1, -1)}`;
        inThcPush(key);
    }
    if (as.bgColor) {
        const key = `FG${as.bgColor[0].toUpperCase()}${as.bgColor.slice(1, -1)}`;
        inThcPush(key);
    }
    if (as.dimness) {
        const key = as.dimness === "dim" ? "Dim" : "Bright";
        inThcPush(key);
    }
    if (as.hidden) {
        inThcPush("Hidden");
    }
    if (as.reverse) {
        inThcPush("Reverse");
    }
    if (as.blink) {
        inThcPush("Blink");
    }

    return `${textTransformList.join("")}${text}${thc.Reset}`;
}

const text = {
    debug: debug,
    coloring_dict: thc,
    setText: setText
}

export default text;