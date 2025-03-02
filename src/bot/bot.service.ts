import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, GatewayIntentBits } from 'discord.js';
import { ConfigService } from '@nestjs/config';
import { BotHandler } from './bot.handler';

@Injectable()
export class BotService implements OnModuleInit {
  private client: Client;

  constructor(
    private readonly configService: ConfigService,
    private readonly botHandler: BotHandler,
  ) {
    this.client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
      ],
    });
  }

  async onModuleInit() {
    const token = this.configService.get<string>('DISCORD_GESTION_TOKEN', '');

    if (!token) {
      throw new Error('❌ DISCORD_GESTION_TOKEN est manquant dans .env');
    }

    this.client.once('ready', () => {
      console.log(`🤖 Bot connecté en tant que ${this.client.user?.tag}`);
    });

    this.client.on('interactionCreate', async (interaction) => {
      await this.botHandler.handleInteraction(interaction);
    });

    await this.client.login(token);
  }
}
