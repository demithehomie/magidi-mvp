// pilares.controller.ts (continuação)
import { Controller, Get, Post, Body } from '@nestjs/common';
import { PilaresService } from './pilares.service';
import { PilarDto } from './dto/pilar.dto';

@Controller('pilares')
export class PilaresController {
    constructor(private readonly pilaresService: PilaresService) {}

    @Post('dimensao-minima')
    verificaDimensaoMinima(@Body() pilar: PilarDto) {
        return this.pilaresService.dimensaoMinima(pilar);
    }

    @Post('comprimento-equivalente')
    calculaComprimentoEquivalente(@Body() pilar: PilarDto) {
        return this.pilaresService.comprimentoEquivalente(pilar);
    }

    @Post('indice-esbeltez')
    calculaIndiceEsbeltez(@Body() pilar: PilarDto) {
        return this.pilaresService.indiceEsbeltez(pilar);
    }

    @Post('classificacao-esbeltez')
    determinaClassificacaoEsbeltez(@Body() pilar: PilarDto) {
        const lambda = this.pilaresService.indiceEsbeltez(pilar);
        return this.pilaresService.classificacaoEsbeltez(lambda);
    }

    @Post('momento-minimo')
    determinaMomentoMinimo(@Body() data: { pilar: PilarDto, Nd: number }) {
        return this.pilaresService.momentoMinimo(data.pilar, data.Nd);
    }

    @Post('efeitos-2ordem')
    analisaEfeitos2Ordem(@Body() pilar: PilarDto) {
        return this.pilaresService.efeitos2Ordem(pilar);
    }
}
