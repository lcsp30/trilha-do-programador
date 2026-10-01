import estilo from "./Text05.module.css";

/**
 * Text05 — a placa com o letreiro "LÓGICA SIMPLES". Terceira da família da
 * `Text01`/`Text04`: a placa é a mesma ideia (duas chapas deslocadas, o relevo
 * entre elas) e o letreiro também é `<text>` — muda a palavra, a largura da
 * chapa e o `matrix` que deita o texto.
 *
 * O arquivo de origem chegou como um `<g>` com `matrix(1, 0, 0, 1, -9,77
 * -283,18)` e sobras: um `<g fill="#231f20">` VAZIO e um `style=""` vazio no
 * primeiro path. Os três foram descartados — inclusive o `matrix`: ele é a
 * posição da placa dentro do canvas de onde a peça foi recortada, e o
 * `translate` de centralização abaixo usa as coordenadas dos PRÓPRIOS paths.
 * Somar os dois desloca a placa (foi o que aconteceu na `Text04`). O contorno de
 * 1,23 fica no componente, porque vale para as duas placas.
 *
 * TAMANHO: as duas chapas vão de (369,60 439,37) a (598,65 490,29), ou seja
 * 229,05 por 50,93 unidades, já em escala de tabuleiro — NÃO há escala base:
 * `tamanho = 1` é o tamanho da referência. Decimal sempre com PONTO —
 * `tamanho={0,5}` é o operador vírgula do JavaScript e vale 5.
 *
 * POSIÇÃO: `x` e `y` apontam para o CENTRO DA PLACA (484,12 464,83 nas
 * coordenadas dos paths), e não do letreiro: quem tem de cair no lugar é a
 * chapa. Esta é a mais larga das três, porque "LÓGICA SIMPLES" é a palavra mais
 * longa — mas o letreiro continua Orbitron 36,5427/600, deitado pelo MESMO
 * `matrix` e pelo MESMO `transform-origin` das irmãs.
 */
export default function Text05({ x, y, tamanho = 1, rotacao = 0 }) {
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
          transform="matrix(0.514491 -0.00865 0.007359 0.437759 39.673592 -7.665094)"
          x="290.692"
          y="481.673"
        >
          {" LÓGICA SIMPLES"}
        </text>
      </g>
    </g>
  );
}
