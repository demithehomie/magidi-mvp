import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PilaresModule } from './pilares/pilares.module';

@Module({
  imports: [PilaresModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
