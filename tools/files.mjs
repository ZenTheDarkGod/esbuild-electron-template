import * as fs from 'fs';
import * as path from 'path';
import { log } from './text.mjs';

/**
 * 
 * @param {string} sourceFolder 
 * @param {*} destinationFolder 
 * @returns 
 */
function createFolder(path) {
    // Check if the path already exists
    if (fs.existsSync(path)) {
        // console.log('Folder already exists at path:', path);
        return;
    }

    // Create the folder
    try {
        fs.mkdirSync(path);
        log("SUCCESS", `Folder created successfully at path: ${path}`);
    } catch (error) {
        log("FAIL", `An error occurred while creating the folder: ${error}`);
    }
}

export function copyFolderContents(sourceFolder, destinationFolder) {
    // Check if both folders exist
    if (!fs.existsSync(sourceFolder)) {
        log("FAIL", `Source folder '${sourceFolder}' does not exist`);
        return;
    }
    if (!fs.existsSync(destinationFolder)) {
        // console.log(`Creating folder '${destinationFolder}'`);
        createFolder(destinationFolder);
    }
    

    try {
        // Get the list of files and directories in the source folder
        const items = fs.readdirSync(sourceFolder);

        items.forEach((item) => {
            // Create the source and destination paths
            const sourcePath = path.join(sourceFolder, item);
            const destinationPath = path.join(destinationFolder, item);

            // Check if the item is a file or a directory
            const isFile = fs.lstatSync(sourcePath).isFile();

            if (isFile) {
                // If it's a file, copy it directly to the destination folder
                fs.copyFileSync(sourcePath, destinationPath);
            } else {
                if (item === "depracated") return;
                const isDirectoryAlreadyPresent = fs.existsSync(destinationPath) && fs.lstatSync(destinationPath).isDirectory();

                if (!isDirectoryAlreadyPresent) {
                    // If the directory is not present, create it in the destination folder
                    fs.mkdirSync(destinationPath);
                }

                // Recursively copy the contents of the directory
                copyFolderContents(sourcePath, destinationPath);
            }
        });

        log("SUCCESS", `${sourceFolder.replace(/^(?:\.\.\/|\.\/)+/, '')} has been compiled successfully!`);
    } catch (err) {
        log("FAIL", `Error compiling ${sourceFolder.replace(/^(?:\.\.\/|\.\/)+/, '')}: ${err}`);
    }
}