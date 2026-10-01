import estilo from "./Text07.module.css";

/**
 * Text07 — a placa com o letreiro "PORTUGUÊS - BR". Quarta da família da
 * `Text01`/`Text04`/`Text05`: as coordenadas das duas chapas são IDÊNTICAS às
 * da `Text05` — só a palavra muda — e por isso as classes têm os mesmos nomes
 * das irmãs.
 *
 * O arquivo de origem chegou como um `<g>` com `matrix(1, 0, 0, 1, 237,58
 * -359,39)` e as MESMAS sobras da `Text05`: um `<g fill="#231f20">` VAZIO e um
 * `style=""` vazio no primeiro path. Os três saíram — inclusive o `matrix`, que
 * é a posição da placa dentro do canvas de onde a peça foi recortada, e não
 * entra na centralização (somar os dois desloca a placa).
 *
 * TAMANHO: as duas chapas vão de (369,60 439,37) a (598,65 490,29), ou seja
 * 229,05 por 50,93 unidades, já em escala de tabuleiro — NÃO há escala base:
 * `tamanho = 1` é o tamanho da referência. Decimal sempre com PONTO —
 * `tamanho={0,5}` é o operador vírgula do JavaScript e vale 5.
 *
 * POSIÇÃO: `x` e `y` apontam para o CENTRO DA PLACA (484,12 464,83 nas
 * coordenadas dos paths), e não do letreiro. O letreiro é o MESMO `<text>` de
 * 36,5427/600 das irmãs, com o MESMO `transform-origin` (117,499px 29,6277px);
 * o `matrix` dele é que muda um pouco, porque "PORTUGUÊS - BR" é mais longa. O
 * espaço antes do "P" vem do arquivo: em JSX ele precisa das chaves, e o
 * `white-space: pre` do CSS o preserva.
 */
export default function Text07({ x, y, tamanho = 1, rotacao = 0 }) {
  return (
    <g
      transform={`translate(${x} ${y}) scale(${tamanho}) rotate(${rotacao})`}
    >
      <g transform="translate(-484.12 -464.83)">
        <path
          className={estilo.placaTras}
          stroke="#231f20"
          strokeLinejoin="round"
          strokeWidth="1.23"
          d="M 594.818 486.935 L 374.424 490.294 L 370.574 442.172 L 598.647 440.947 L 594.818 486.935 Z"
        />
        <path
          className={estilo.placaFrente}
          stroke="#231f20"
          strokeLinejoin="round"
          strokeWidth="1.23"
          d="M 593.847 485.621 L 369.607 489.148 L 369.597 441.367 L 596.841 439.365 L 593.847 485.621 Z"
        />
        <text
          className={estilo.letreiro}
          transform="matrix(0.514491 -0.00865 0.007359 0.437759 36.078506 -6.227059)"
          x="290.692"
          y="481.673"
        >
          {" PORTUGUÊS - BR"}
        </text>
      </g>
    </g>
  );
}
