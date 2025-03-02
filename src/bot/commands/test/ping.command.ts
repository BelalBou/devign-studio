import {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    MessageFlags,
  } from 'discord.js';
  
  export const pingCommand = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Renvoie Pong!');
  
  export class PingCommand {
    static async execute(interaction: ChatInputCommandInteraction) {
      await interaction.reply({
        content: `Pong`,
        flags: MessageFlags.Ephemeral,
      });
    }
  }
  