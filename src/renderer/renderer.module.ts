import { Module } from '@nestjs/common';
import { RendererService } from './renderer.service';
import { RendererController } from './renderer.controller';

@Module({
  providers: [RendererService],
  controllers: [RendererController]
})
export class RendererModule {}
