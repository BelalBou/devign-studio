import { REST, Routes } from 'discord.js';
import { ConfigService } from '@nestjs/config';
import { Injectable, OnModuleInit } from '@nestjs/common';
import  { pingCommand } from './commands/test/ping.command';
import { embedCommand } from './commands/embed.command';

@Injectable()
export class BotLoader implements OnModuleInit {
  constructor(private readonly configService: ConfigService) {}

  async onModuleInit() {
    const token = this.configService.get<string>('DISCORD_GESTION_TOKEN', '');
    const clientId = this.configService.get<string>('DISCORD_CLIENT_ID', '');

    if (!token || !clientId) {
      throw new Error(
        '❌ DISCORD_GESTION_TOKEN ou DISCORD_CLIENT_ID est manquant dans .env',
      );
    }

    // 📌 Liste des commandes à enregistrer
    const commands = [
      pingCommand,
      embedCommand,
    ];

    console.log(
      '🛠 Commandes à enregistrer :',
      commands.map((cmd) => cmd.name),
    );

    const rest = new REST({ version: '10' }).setToken(token);

    try {
      console.log('🔄 Enregistrement des commandes globales...');
      await rest.put(Routes.applicationCommands(clientId), { body: commands });
      console.log('✅ Commandes enregistrées avec succès !');
    } catch (error) {
      console.error('❌ Erreur lors de l’enregistrement des commandes:', error);
    }
  }
}
