import { Injectable } from '@nestjs/common';
import { Interaction } from 'discord.js';
import { CommandHandler } from './interaction_handlers/command.interaction_handler';
import { ButtonHandler } from './interaction_handlers/button.interaction_handler';
import { ModalHandler } from './interaction_handlers/modal.interaction_handler';
import { SelectMenuHandler } from './interaction_handlers/select_menu.interaction_handler';

@Injectable()
export class BotHandler {
  constructor(
    private readonly commandHandler: CommandHandler,
    private readonly selectMenuHandler: SelectMenuHandler, // ✅ Ajout de SelectMenuHandler
  ) {}

  async handleInteraction(interaction: Interaction) {
    if (interaction.isChatInputCommand()) {
      await this.commandHandler.handle(interaction);
    } else if (interaction.isButton()) {
      await ButtonHandler.handle(interaction);
    } else if (interaction.isModalSubmit()) {
      await ModalHandler.handle(interaction);
    } else if (interaction.isStringSelectMenu()) {
      await this.selectMenuHandler.handle(interaction); // ✅ Correction
    }
  }
}
