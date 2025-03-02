import { ButtonInteraction } from 'discord.js';

const buttonsMap: Record<string, any> = {
};

export class ButtonHandler {
  static async handle(interaction: ButtonInteraction) {
    const button = buttonsMap[interaction.customId];

    if (button) {
      await button.execute(interaction);
    }
  }
}
