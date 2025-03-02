import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class ConfigService {
  constructor(private readonly nestConfigService: NestConfigService) {}

  get(key: string, defaultValue: string = ''): string {
    return this.nestConfigService.get<string>(key) ?? defaultValue;
  }
}
