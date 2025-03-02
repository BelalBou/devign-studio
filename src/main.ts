import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { NitradoApiService } from './nitrado_api/nitrado_api.service';
import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const port = configService.get<number>('PORT') || 3000;
  console.log(`🚀 Serveur NestJS démarré sur le port ${port}`);

  // 🔹 Définir les services en global
  global.prisma = app.get(PrismaService);
  global.nitradoApiService = app.get(NitradoApiService);

  await app.listen(port,'0.0.0.0');
}
bootstrap();
