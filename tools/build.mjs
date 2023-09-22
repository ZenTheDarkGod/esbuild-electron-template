import * as esbuild from 'esbuild'
import text, { log } from './text.mjs'
import { copyFolderContents } from './files.mjs'

const externalPackages = ['electron'];

const builds = {
    source: async function () {
        return new Promise(async (resolve, reject) => {
            try {
                await esbuild.build({
                    entryPoints: ['./source/index.ts'],
                    bundle: true,
                    platform: 'node',
                    external: externalPackages,
                    outfile: './build/main.js',
                })
                text.debug.success("Source build was successful!")
                resolve()
            }
            catch (err) {
                text.debug.error("Source build failed!", err)
                reject()
            }
        })
    },
    electron: async function () {
        return new Promise(async (resolve, reject) => {
            try {
                copyFolderContents("./app", "./build")
                copyFolderContents("./assets", "./build/assets")

                text.debug.success("Electron build was successful!")
                resolve()
            }
            catch {
                text.debug.error("Source build failed!")
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
            text.debug.error("Somehow you managed to put in an incorrect type, ggs...")
            return;
        }
        await builds[type]()
    });
}

main()