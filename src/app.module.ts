import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RendererModule } from './renderer/renderer.module';

@Module({
  imports: [RendererModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
