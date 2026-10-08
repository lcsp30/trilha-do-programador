import estilo from "./Text06.module.css";

/**
 * Text06 — a placa DE PÉ, girada ~93°, com o letreiro "PSEUDOCÓDIGO" escrito de
 * cima para baixo. Irmã da `Text03`: mesma ideia (placa girada e letreiro vivo
 * em `<tspan>`) e mesma chapa da família `Text04`/`Text05`/`Text07`.
 *
 * O LETREIRO é VIVO: doze `<tspan>`, uma letra cada, em Orbitron 18/600 com
 * `text-anchor: middle`. Trocar a palavra é mexer no JSX, sem editor vetorial.
 *
 * Duas coisas do arquivo de origem que NÃO são enfeite:
 *   · o giro é uma `matrix` no `<g>` e o `transform-origin` de 472,575 462,839
 *     que vem com ela é o ponto em torno do qual a placa gira — sem ele a placa
 *     sai girando para fora do lugar;
 *   · as `<tspan>` entre as letras existiam só para carregar o `dy="1em"`, e
 *     cada uma tinha um espaço INVISÍVEL (U+200B) dentro, porque `dy` em `tspan`
 *     sem caractere nenhum é IGNORADO pelo navegador. Aqui o `x` e o `dy` moram
 *     na própria `tspan` da letra e os treze invisíveis saíram.
 * Saíram também um `<g fill="#231f20">` VAZIO e, dos dois paths, os `style=` com
 * `transform-origin` sem transform nenhum (inertes).
 *
 * TAMANHO: a placa em pé ocupa 65,28 por 244,05 unidades — é a placa de 241,61
 * por 52,65 girada ~93°, e o giro é que troca largura por altura. Já em escala de
 * tabuleiro, então NÃO há escala base: `tamanho = 1` é o tamanho da referência.
 * Decimal sempre com PONTO — `tamanho={0,5}` é o operador vírgula do JavaScript
 * e vale 5.
 *
 * POSIÇÃO: `x` e `y` apontam para o CENTRO da placa. Cuidado ao conferir esse
 * centro: a `matrix` do `<g>` de origem tem, além do giro, um translate de
 * (554,05 -336,22) — sobra do canvas de onde a peça foi recortada. Ficar só com o
 * centro das coordenadas dos paths desloca a peça em meia placa (foi o erro da
 * `Text03`).
 * A conta "origem do giro + translate" = (1026,63 126,62) vale para a `Text03`,
 * cujo giro é em torno do PRÓPRIO centro da placa. Aqui a origem do giro é
 * (472,575 462,839) e o centro da placa é (490,40 462,50) — não coincidem —,
 * então essa soma NÃO fecha: o `translate` interno é o MEDIDO, (1026,03 144,45).
 * A diferença (0,6 17,8) é exatamente o quanto o giro em torno de um ponto fora
 * do centro desloca o centro do desenho.
 */
export default function Text06({ x, y, tamanho = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${tamanho})`}>
      <g transform="translate(-1026.03 -144.45)">
        <g
          transform="matrix(-0.052589 0.998616 -0.998616 -0.052589 554.053955 -336.215271)"
          transformOrigin="472.575px 462.839px"
        >
          <path
            className={estilo.placaTras}
            stroke="#231f20"
            strokeLinejoin="round"
            strokeWidth="1.23"
            d="M 603.846 483.21 L 375.178 488.828 L 370.8 441.477 L 611.211 438.859 L 603.846 483.21 Z"
          />
          <path
            className={estilo.placaFrente}
            stroke="#231f20"
            strokeLinejoin="round"
            strokeWidth="1.23"
            d="M 600.967 481.64 L 371.472 488.75 L 369.597 441.367 L 607.818 436.18 L 600.967 481.64 Z"
          />
          <text
            className={estilo.letreiro}
            transform="matrix(-0.052589 -0.998617 0.998617 -0.052589 196.755966 529.190369)"
          >
            <tspan x="52.186" y="198.744">P</tspan>
            <tspan x="52.186" dy="1em">S</tspan>
            <tspan x="52.186" dy="1em">E</tspan>
            <tspan x="52.186" dy="1em">U</tspan>
            <tspan x="52.186" dy="1em">D</tspan>
            <tspan x="52.186" dy="1em">O</tspan>
            <tspan x="52.186" dy="1em">C</tspan>
            <tspan x="52.186" dy="1em">Ó</tspan>
            <tspan x="52.186" dy="1em">D</tspan>
            <tspan x="52.186" dy="1em">I</tspan>
            <tspan x="52.186" dy="1em">G</tspan>
            <tspan x="52.186" dy="1em">O</tspan>
          </text>
        </g>
      </g>
    </g>
  );
}
