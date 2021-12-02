import { SlashCommandBuilder } from '@discordjs/builders';
import { Client, Collection, Intents, Interaction } from 'discord.js';
import 'dotenv/config';
import { readdir } from 'fs/promises';
import * as path from 'path';

interface CommandModule {
    data: SlashCommandBuilder;
    execute(interaction: Interaction): Promise<void>;
}

const {
    CLIENT_TOKEN,
    COMMAND_PATH = path.join(__dirname, './commands'),
    COMMAND_MODULE_PATTERN = '.(js|ts)$',
} = process.env;

const moduleRegex = new RegExp(COMMAND_MODULE_PATTERN);

const isCommandModuleName = (filename: string) => moduleRegex.test(filename);

async function loadCommands() {
    const filenames = await readdir(COMMAND_PATH);

    const modules: CommandModule[] = await Promise.all(
        filenames
            .filter(isCommandModuleName)
            .map((name) => import(`${COMMAND_PATH}/${name}`))
    );

    const commands = new Collection<string, CommandModule>(
        modules.map((module) => [module.data.name, module])
    );

    return commands;
}

(async () => {
    const commands = await loadCommands();

    const client = new Client({ intents: Intents.FLAGS.GUILDS });

    client.on('interactionCreate', async (interaction) => {
        if (!interaction.isCommand()) return;

        const command = commands.get(interaction.commandName);
        if (!command) return;

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({
                content: 'There was an error while executing this command!',
                ephemeral: true,
            });
        }
    });

    client.once('ready', () => {
        console.log('ready');
    });

    await client.login(CLIENT_TOKEN);
})();
