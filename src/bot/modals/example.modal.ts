import { ModalSubmitInteraction } from 'discord.js';

export class ExampleModal {
  static async execute(interaction: ModalSubmitInteraction) {
    await interaction.reply('📄 Modal soumis avec succès !');
  }
}
