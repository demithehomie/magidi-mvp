import { Injectable } from '@nestjs/common';
import { PilarDto } from './dto/pilar.dto';

@Injectable()
export class PilaresService {

    dimensaoMinima(pilar: PilarDto): any {
        const { dimensaoMenor, dimensaoMaior } = pilar;
        let coeficienteMajoracao = 1;
        let valido = true;
        let mensagem = 'Dimensões válidas.';

        if (dimensaoMenor < 14) {
            if (dimensaoMaior < 26) {
                valido = false;
                mensagem = 'Se a menor dimensão for menor que 14cm, a maior dimensão deve ser pelo menos 26cm.';
            }
        } else if (dimensaoMenor < 19) {
            coeficienteMajoracao = 0.0/* Valor de γn baseado em suas especificações */;
            mensagem = 'Necessário multiplicar os esforços solicitantes pelo coeficiente de majoração.';
        }

        const area = dimensaoMenor * dimensaoMaior;
        if (area < 360) {
            valido = false;
            mensagem = 'Área da seção transversal não pode ser menor que 360 cm².';
        }

        return {
            valido,
            coeficienteMajoracao,
            mensagem
        };
    }

    comprimentoEquivalente(pilar: PilarDto): number {
        const { l0, h, l, tipo } = pilar;

        if (tipo === 'balanco') {
            return 2 * l;
        }
        return l0 + (0.5 * h) + (0.3 * l);
    }

    indiceEsbeltez(pilar: PilarDto): number {
        const { dimensaoMenor, l0, h, l, tipo } = pilar;
        const i = dimensaoMenor / Math.sqrt(12);
        const le = this.comprimentoEquivalente(pilar);
        return le / i;
    }

    classificacaoEsbeltez(lambda: number): string {
        if (lambda <= 35) return 'Robusto ou pouco esbelto';
        if (lambda <= 90) return 'Esbeltez média';
        if (lambda <= 140) return 'Esbelto ou muito esbelto';
        if (lambda <= 200) return 'Excessivamente esbelto';
        return 'Não permitido pela NBR 6118:2014';
    }

    momentoMinimo(pilar: PilarDto, Nd: number): number {
        const { h } = pilar;
        return Nd * (0.015 + 0.03 * h);
    }

    efeitos2Ordem(pilar: PilarDto): string {
        return 'Análise dos efeitos de 2ª ordem requerida';
    }
}
