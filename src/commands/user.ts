import { SlashCommandBuilder } from '@discordjs/builders';
import { CacheType, Interaction } from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('user')
    .setDescription('Replies with user info!');

export async function execute(interaction: Interaction<CacheType>) {
    if (!interaction.isCommand()) return;
    await interaction.reply(
        `Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`
    );
}
