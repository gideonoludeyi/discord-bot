import { SlashCommandBuilder } from '@discordjs/builders';
import { CacheType, Interaction } from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('hello')
    .setDescription('replies the user with a greeting');

export async function execute(interaction: Interaction<CacheType>) {
    if (!interaction.isCommand()) return;
    await interaction.reply(`Hello ${interaction.user.username}`);
}
