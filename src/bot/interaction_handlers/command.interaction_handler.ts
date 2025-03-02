import { Injectable } from '@nestjs/common';
import { ChatInputCommandInteraction } from 'discord.js';
import { PingCommand } from '../commands/test/ping.command';
import { EmbedCommand } from '../commands/embed.command';

@Injectable()
export class CommandHandler {
  private commandsMap: Record<string, any>;

  constructor() {
    this.commandsMap = {
      ping: PingCommand,
      embed: EmbedCommand,
    };
  }

  async handle(interaction: ChatInputCommandInteraction) {
    const command = this.commandsMap[interaction.commandName];

    if (!command) {
      await interaction.reply({
        content: '❌ Commande inconnue.',
        ephemeral: true,
      });
      return;
    }

    try {
      // Vérification des services globaux
      if (!global.prisma || !global.nitradoApiService) {
        console.error(
          '❌ Erreur : PrismaService ou NitradoApiService non initialisé.',
        );
        await interaction.reply({
          content: '❌ Une erreur interne est survenue.',
          ephemeral: true,
        });
        return;
      }

      // Exécution de la commande
      await command.execute(
        interaction,
        global.prisma,
        global.nitradoApiService,
      );
    } catch (error) {
      console.error(
        `❌ Erreur lors de l’exécution de la commande ${interaction.commandName}:`,
        error,
      );
      await interaction.reply({
        content:
          '❌ Une erreur est survenue lors du traitement de votre demande.',
        ephemeral: true,
      });
    }
  }
}
