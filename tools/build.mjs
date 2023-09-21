import * as esbuild from 'esbuild'
import { log, thc } from './text.mjs'
import { copyFolderContents } from './files.mjs'

const builds = {
    source : async function () {
        return new Promise(async (resolve, reject) => {
            try {
                await esbuild.build({
                    entryPoints: ['./source/index.ts'],
                    bundle: true,
                    outfile: './build/main.js',
                })
                log("SUCCESS", "Source build was successful!")
                resolve()
            }
            catch {
                log("FAIL", "Source build failed!")
                reject()
            }
        })
    },
    electron : async function () {
        return new Promise(async (resolve, reject) => {
            try {
                copyFolderContents("./app", "./build")
                copyFolderContents("./assets", "./build/assets")

                log("SUCCESS", "Electron build was successful!")
                resolve()
            }
            catch {
                log("FAIL", "Source build failed!")
                reject()
            }
        })
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
    const buildTypes = []

    switch (args[2]) {
        case "source":
            buildTypes.push("source")
            break;
        case "electron":
            buildTypes.push("electron")
            break;
        case "all":
            buildTypes.push("electron")
            buildTypes.push("source")
            break;
        case "__FAILTEST__":
            buildTypes.push("assdasd")
            break;
        default:
            break;
    }

    buildTypes.forEach(async (type) => {
        if (typeof builds[type] !== "function") {
            log("FAIL", "Somehow you managed to put in an incorrect type, ggs...")
            return;
        }
        await builds[type]()
    });
}

main()