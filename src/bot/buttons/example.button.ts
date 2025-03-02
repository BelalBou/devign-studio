import { ButtonInteraction } from 'discord.js';

export class ExampleButton {
  static async execute(interaction: ButtonInteraction) {
    await interaction.reply('🔘 Bouton cliqué !');
  }
}
