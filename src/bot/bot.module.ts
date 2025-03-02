import { Module } from '@nestjs/common';
import { BotService } from './bot.service';
import { BotHandler } from './bot.handler';
import { PrismaModule } from '../prisma/prisma.module';
import { NitradoApiService } from '../nitrado_api/nitrado_api.service';
import { CommandHandler } from './interaction_handlers/command.interaction_handler';
import { SelectMenuHandler } from './interaction_handlers/select_menu.interaction_handler';
import { BotLoader } from './bot.loader';

@Module({
  imports: [PrismaModule],
  providers: [
    BotService,
    BotHandler,
    CommandHandler,
    NitradoApiService,
    SelectMenuHandler,
    BotLoader,
  ],
})
export class BotModule {}
