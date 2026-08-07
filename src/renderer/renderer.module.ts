import { Module } from '@nestjs/common';
import { RendererService } from './renderer.service';
import { RendererController } from './renderer.controller';
import { ConfigModule } from '@nestjs/config';
import { BrowserService } from './BrowserService.service';

@Module({
  providers: [RendererService, BrowserService],
  controllers: [RendererController],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    })
  ]
})
export class RendererModule {}
