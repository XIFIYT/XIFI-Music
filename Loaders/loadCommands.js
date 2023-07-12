const {opendir} = require('node:fs/promises');
const {join: pathJoin} = require('node:path');
const {Client, Collection} = require('discord.js');

/**
 * Log as a directory tree
 * @param {(string|object)[]} array
 * @param {string|null} [rootText='/']
 * @param {string[]} paddings
 */
function logDirectoryTree(array, rootText = '/', paddings = []) {
    if (paddings.length === 0) console.log(rootText);
    for (let i = 0; i < array.length; i++) {
        const elt = array[i];
        const isLast = i === array.length - 1;
        process.stdout.write(paddings.join('') + (isLast ? '└── ' : '├── '));
        switch (typeof elt) {
            case "object":
                console.log(`${elt.name} (${elt.sub.length})`);
                logDirectoryTree(elt.sub, null, paddings.concat(isLast ? '    ' : '│   '));
                break;
            case "string":
                console.log(elt);
                break;
            default:
                throw new Error('Invalid element type');
        }
    }
}

/**
 * Build a directory tree from a path
 * @param {string} path
 * @returns {Promise<(string|object)[]>}
 */
async function buildDirectoryTree(path) {
    const result = [];
    const dir = await opendir(path);
    for await (const dirent of dir) {
        if (dirent.isDirectory()) {
            result.push({ name: dirent.name, sub: await buildDirectoryTree(pathJoin(path, dirent.name)) });
        } else  {
            result.push(dirent.name);
        }
    }
    return result;
}

/**
 * Build paths from a directory tree
 * @param {string} basePath
 * @param {(string|object)[]} directoryTree
 * @returns {string[]}
 */
function buildPaths(basePath, directoryTree) {
    const paths = [];
    for (const elt of directoryTree) {
        switch (typeof elt) {
            case "object":
                for (const subElt of buildPaths(elt.name, elt.sub)) {
                    paths.push(pathJoin(basePath, subElt));
                }
                break;
            case "string":
                paths.push(pathJoin(basePath, elt));
                break;
            default:
                throw new Error('Invalid element type');
        }
    }
    return paths;
}

/**
 * Load commands from a path
 * @param {Client} client
 * @param {string} path
 * @returns {Promise<void>}
 */
async function loadCommands(client, path) {
    const directoryTree = await buildDirectoryTree(path);
    const paths = buildPaths(path, directoryTree);
    if (!client.commands) client.commands = new Collection();
    for (const path of paths) {
        const command = require(path);
        client.commands.set(command.name, command);
    }
    logDirectoryTree(directoryTree, "Commands");
}

module.exports = loadCommands;