import { Module } from '@nestjs/common';
import { NitradoApiService } from './nitrado_api.service';

@Module({
  providers: [NitradoApiService],
  exports: [NitradoApiService],
})
export class NitradoApiModule {}
