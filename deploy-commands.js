require('dotenv/config');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const path = require('path');

const {
    CLIENT_TOKEN = '',
    CLIENT_ID = '',
    GUILD_ID = '',
    COMMAND_DATA_FILE = path.join(__dirname, './commands.json'),
} = process.env;

const commands = require(COMMAND_DATA_FILE);

const rest = new REST({ version: '9' }).setToken(CLIENT_TOKEN);

rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
    body: commands,
})
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);
