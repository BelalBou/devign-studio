import { Injectable } from '@nestjs/common';
import { StringSelectMenuInteraction } from 'discord.js';

@Injectable()
export class SelectMenuHandler {
  private menusMap: Record<string, any>;

  constructor() {
    this.menusMap = {
    };
  }

  async handle(interaction: StringSelectMenuInteraction) {
    const menu = this.menusMap[interaction.customId];

    if (menu) {
      await menu.execute(interaction, global.prisma, global.nitradoApiService);
    } else {
      console.log(`❌ Menu inconnu : ${interaction.customId}`);
      await interaction.reply({
        content: '❌ Menu inconnu.',
        ephemeral: true,
      });
    }
  }
}
