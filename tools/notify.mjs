
import text, { log } from './text.mjs'

const building = `${text.setText("⚒", { color: "yellow" })} ${text.setText(" BUILDING ", { bgColor: "yellow" })}`;
const executing = `${text.setText("⚡", { color: "yellow" })} ${text.setText(" EXECUTING ", { bgColor: "yellow"})}`;
const build_executing = `${text.setText("⚡", { color: "yellow" })} ${text.setText(" BUILDING & EXECUTING ", { bgColor: "yellow", color: "white" })}`;

const notifications = {
    build: {
        src: () => {
            console.log(
                `${building} Source`
            )
        },
        app: () => {
            console.log(
                `${building} Application`
            )
        },
        all: () => {
            console.log(
                `${building} Source & Application`
            )
        }
    },
    execute: {
        self: () => {
            console.log(
                `${executing} Current Build`
            )
        },
        src: () => {
            console.log(
                `${build_executing} Source`
            )
        },
        app: () => {
            console.log(
                `${build_executing} Application`
            )
        },
        all: () => {
            console.log(
                `${build_executing} Source & Application`
            )
        }
    }
}

async function main() {
    /**
     * Arguments provided by the node runtime
     * 
     * @type string[]
     */
    const args = process.argv;
    /**
     * @type string[]
     */
    const buildTypes = [[], []]

    switch (args[2]) {
        case "build":
            buildTypes[0].push("build")
            break;
        case "execute":
            buildTypes[0].push("execute")
            break;
        case "__FAILTEST__":
            buildTypes[0].push("assdasd")
            break;
        default:
            break;
    }
    switch (args[3]) {
        case "src":
            buildTypes[1].push("src")
            break;
        case "app":
            buildTypes[1].push("app")
        case "all":
            buildTypes[1].push("all")
            break;
        case "__FAILTEST__":
            buildTypes[1].push("assdasd")
            break;
        default:
            break;
    }
    if (!args[3] && args[2] === "execute") {
        buildTypes[1] = "self";
    }
    
    if (!(
        ["build", "execute"].includes(buildTypes[0]) ||
        ["self", "src", "app", "all"].includes(buildTypes[1])
        )) text.debug.error("Incorrect arguments provided!")
    
    console.log("\n\n\n\n\n\n");
    
    await notifications[buildTypes[0]][buildTypes[1]]()
    
    console.log("\n\n");
}

main()