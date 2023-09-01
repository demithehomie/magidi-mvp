// pilares.module.ts

import { Module } from '@nestjs/common';
import { PilaresController } from './pilares.controller';
import { PilaresService } from './pilares.service';

@Module({
    imports: [],
    controllers: [PilaresController],
    providers: [PilaresService],
    exports: [PilaresService]  // Se necessário, para permitir que outros módulos usem o PilaresService
})
export class PilaresModule {}
