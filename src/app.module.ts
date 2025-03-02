import { Module } from '@nestjs/common';
import { BotModule } from './bot/bot.module';
import { PrismaModule } from './prisma/prisma.module';
import { AppConfigModule } from './config/config.module';
import { NitradoApiModule } from './nitrado_api/nitrado_api.module';
import { PrismaService } from './prisma/prisma.service';
import { NitradoApiService } from './nitrado_api/nitrado_api.service';

@Module({
  imports: [AppConfigModule, PrismaModule, BotModule, NitradoApiModule],
  providers: [PrismaService, NitradoApiService],
  exports: [PrismaService, NitradoApiService],
})
export class AppModule {}
