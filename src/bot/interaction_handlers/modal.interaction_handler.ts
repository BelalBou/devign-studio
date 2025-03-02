import { ModalSubmitInteraction } from 'discord.js';
import { ExampleModal } from '../modals/example.modal';

const modalsMap: Record<string, any> = {
  example_modal: ExampleModal,
};

export class ModalHandler {
  static async handle(interaction: ModalSubmitInteraction) {
    const modal = modalsMap[interaction.customId];

    if (modal) {
      await modal.execute(interaction);
    }
  }
}
