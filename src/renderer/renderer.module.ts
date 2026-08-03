import { Module } from '@nestjs/common';
import { RendererService } from './renderer.service';
import { RendererController } from './renderer.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [RendererService],
  controllers: [RendererController],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    })
  ]
})
export class RendererModule {}
