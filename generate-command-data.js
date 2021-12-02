const { readdir, writeFile } = require('fs/promises');
const path = require('path');

const {
    COMMAND_PATH = path.join(__dirname,'./build/commands'),
    DESTINATION = path.join(__dirname, './commands.json'),
    COMMAND_MODULE_PATTERN = '.js$',
} = process.env;

const moduleRegex = new RegExp(COMMAND_MODULE_PATTERN);

const isCommandModule = (filename) => moduleRegex.test(filename);

const extractSlashCommandData = async (module) => {
    const { data } = await import(module);
    return data.toJSON();
};

(async () => {
    const filenames = await readdir(COMMAND_PATH);

    const modules = filenames
        .filter(isCommandModule)
        .map((filename) => `${COMMAND_PATH}/${filename}`);

    const commands = await Promise.all(modules.map(extractSlashCommandData));

    writeFile(DESTINATION, JSON.stringify(commands));
})();
