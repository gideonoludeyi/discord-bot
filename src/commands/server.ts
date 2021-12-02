import { SlashCommandBuilder } from '@discordjs/builders';
import { CacheType, Interaction } from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('server')
    .setDescription('Replies with server info!');

export async function execute(interaction: Interaction<CacheType>) {
    if (!interaction.isCommand()) return;
    await interaction.reply(
        `Server name: ${interaction.guild?.name}\nTotal members: ${interaction.guild?.memberCount}`
    );
}
