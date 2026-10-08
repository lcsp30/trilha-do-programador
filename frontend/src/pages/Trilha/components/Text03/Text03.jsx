
import estilo from "./Text03.module.css";

/**
 * Text03 — a placa DE PÉ, girada ~93°, com o letreiro "ALGORITMO" escrito de
 * cima para baixo. Irmã da `Text04`: é a MESMA placa, só girada e com outra
 * palavra — por isso as classes têm os mesmos nomes das dela.
 *
 * O LETREIRO aqui é VIVO: nove `<tspan>`, uma letra cada, em Orbitron 18/600 com
 * `text-anchor: middle`. Trocar a palavra (ou uma letra) é mexer no JSX, sem
 * editor vetorial — ao contrário do letreiro da `Text01`.
 *
 * Duas coisas do arquivo de origem que NÃO são enfeite:
 *   · o giro é uma `matrix` no `<g>` e o `transform-origin` de 472,575 462,839
 *     que vem com ela é o CENTRO DA PLACA. Sem ele a placa sai girando para
 *     fora do lugar — o transform-origin é do giro, não do posicionamento.
 *   · as `tspan` vazias do meio existiam só para carregar o `dy="1em"`, e cada
 *     uma tinha um espaço INVISÍVEL (U+200B) dentro, porque `dy` em `tspan` sem
 *     caractere nenhum é IGNORADO pelo navegador. Aqui o `x` e o `dy` moram na
 *     própria `tspan` da letra e os invisíveis saíram.
 *
 * TAMANHO: a placa em pé ocupa 63,42 por 208,58 unidades — é a placa de 205,96
 * por 53,32 da `Text04` girada ~93°, e o giro é que troca largura por altura.
 * Já em escala de tabuleiro, então NÃO há escala base: `tamanho = 1` é o tamanho
 * da referência. Decimal sempre com PONTO — `tamanho={0,5}` é o operador vírgula
 * do JavaScript e vale 5.
 *
 * POSIÇÃO: `x` e `y` apontam para o CENTRO da placa. Cuidado ao conferir esse
 * centro: a `matrix` do `<g>` de origem tem, além do giro, um translate de
 * (359,5 -333,07) — sobra do canvas de onde a peça foi recortada. Como o giro é
 * em torno do centro da placa, o centro DEPOIS do giro é centro + translate =
 * (832,08 129,77), e é esse número que o `translate` interno usa. Ficar só com o
 * centro das coordenadas dos paths (foi o primeiro erro aqui) desloca a peça em
 * meia placa: ela apareceria 180 unidades à direita e 166 acima do ponto pedido.
 */
export default function Text03({ x, y, tamanho = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${tamanho})`}>
      <g transform="translate(-832.08 -129.77)">
        <g
          transform="matrix(-0.052589 0.998616 -0.998616 -0.052589 359.506714 -333.068359)"
          transformOrigin="472.575px 462.839px"
        >
          <path
            className={estilo.placaTras}
            stroke="#231f20"
            strokeLinejoin="round"
            strokeWidth="1.23"
            d="M 569.548 483.21 L 374.534 488.828 L 370.8 441.477 L 575.829 438.859 L 569.548 483.21 Z"
          />
          <path
            className={estilo.placaFrente}
            stroke="#231f20"
            strokeLinejoin="round"
            strokeWidth="1.23"
            d="M 567.49 481.64 L 371.2 488.75 L 369.597 441.367 L 573.35 436.18 L 567.49 481.64 L 567.49 481.64 Z"
          />
          <text
            className={estilo.letreiro}
            transform="matrix(-0.052589 -0.998617 0.998617 -0.052589 204.452164 528.301147)"
          >
            <tspan x="52.186" y="198.744">A</tspan>
            <tspan x="52.186" dy="1em">L</tspan>
            <tspan x="52.186" dy="1em">G</tspan>
            <tspan x="52.186" dy="1em">O</tspan>
            <tspan x="52.186" dy="1em">R</tspan>
            <tspan x="52.186" dy="1em">I</tspan>
            <tspan x="52.186" dy="1em">T</tspan>
            <tspan x="52.186" dy="1em">M</tspan>
            <tspan x="52.186" dy="1em">O</tspan>
          </text>
        </g>
      </g>
    </g>
  );
}

