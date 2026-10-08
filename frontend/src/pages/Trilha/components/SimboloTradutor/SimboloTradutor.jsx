import estilo from "./SimboloTradutor.module.css";

/**
 * Símbolo de traduzir — o `A` de um lado, o ideograma do outro, e duas setas
 * curvas mostrando a passagem de um para o outro. É o brasão do produto: a
 * plataforma existe para traduzir português para JavaScript.
 *
 * Peça de TRAÇO: nada aqui é preenchido. O `fill="none"`, a espessura 2 e os
 * acabamentos redondos valem para a peça inteira e por isso ficam num único
 * `<g>`; o CSS cuida só da cor — veja `SimboloTradutor.module.css`.
 *
 * TAMANHO: o desenho ocupa 52 por 46 unidades. O `scale(2.31)` é a BASE e a
 * prop `tamanho` MULTIPLICA: `tamanho = 1` dá 120 por 106 unidades, a mesma
 * ordem das outras peças. Decimal sempre com PONTO.
 *
 * Atenção a duas cores que também são nossas: o `#071a20` dos dois caracteres
 * é o Petróleo Noturno, a cor do fundo da página. Sobre o leito claro da trilha
 * ele lê como tinta; sobre o fundo escuro, some.
 */
export default function SimboloTradutor({ x, y, tamanho = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${tamanho})`}>
      <g transform="scale(2.31) translate(-31 -32)">
        <g
          fill="none"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline className={estilo.letraA} points="0 46 10 26 20 46" /> <path className={estilo.letraA} d="M4,38 L16,38" /> <path className={estilo.ideograma} d="M38,0 L42,0" /> <path className={estilo.ideograma} d="M28,4 L52,4" /> <path className={estilo.ideograma} d="M30,20 C39.813,20 46,10.062 46,4" /> <path className={estilo.ideograma} d="M50,20 C42.156,20 36.63,13.651 34.727,8.006" /> <path className={estilo.setas} d="M22,4 C15.373,4 10,9.373 10,16 L10,20" /> <path className={estilo.setas} d="M28,42 C34.627,42 40,36.627 40,30 L40,26" /> <polyline className={estilo.setas} points="36 30 40 26 44 30" /> <polyline className={estilo.setas} points="6 16 10 20 14 16" />
        </g>
      </g>
    </g>
  );
}