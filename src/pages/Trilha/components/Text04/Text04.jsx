import estilo from "./Text04.module.css";

/**
 * Text04 — a placa com o letreiro "PROGRAMAÇÃO". Irmã da `Text01`: a placa é a
 * mesma ideia (duas chapas deslocadas, o relevo entre elas) e o letreiro também
 * é `<text>` — só a palavra e o tamanho dela mudam.
 *
 * O arquivo de origem chegou como um `<g>` com `matrix(1, 0, 0, 1, -9,77
 * -352,06)` e sobras: um `<g fill="#231f20">` VAZIO e um `style=""` vazio no
 * primeiro path. Os três foram descartados — inclusive o `matrix`: ele é a
 * posição da placa dentro do canvas de onde a peça foi recortada, e o
 * `translate` de centralização abaixo usa as coordenadas dos PRÓPRIOS paths.
 * Somar os dois (foi o primeiro erro aqui) joga a placa 176 unidades para baixo
 * do ponto pedido. O contorno de 1,23 fica no componente, porque vale para as
 * duas placas — veja o comentário do `Text04.module.css`.
 *
 * TAMANHO: as duas chapas vão de (369,60 436,18) a (575,55 489,50), ou seja
 * 205,96 por 53,32 unidades, já em escala de tabuleiro — NÃO há escala base:
 * `tamanho = 1` é o tamanho da referência. Decimal sempre com PONTO —
 * `tamanho={0,5}` é o operador vírgula do JavaScript e vale 5.
 *
 * POSIÇÃO: `x` e `y` apontam para o CENTRO da placa (472,58 462,84 nas
 * coordenadas dos paths), e não do letreiro: quem tem de cair no lugar é a
 * chapa. O letreiro fica ~15 unidades para dentro da borda esquerda e ~18 da
 * direita — conferido no navegador, sem mexer no `transform-origin` que veio do
 * arquivo de origem.
 */
export default function Text04({ x, y, tamanho = 1, rotacao = 0 }) {
  return (
    <g
      transform={`translate(${x} ${y}) scale(${tamanho}) rotate(${rotacao})`}
    >
      <g transform="translate(-472.58 -462.84)">
        <path
          className={estilo.placaTras}
          stroke="#231f20"
          strokeLinejoin="round"
          strokeWidth="1.23"
          d="M 569.743 482.555 L 374.81 489.498 L 370.574 442.172 L 575.553 438.16 L 569.743 482.555 Z"
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
          transform="matrix(0.514323 -0.015742 0.013394 0.437616 36.886494 -9.257724)"
          x="290.692"
          y="481.673"
        >
          PROGRAMAÇÃO
        </text>
      </g>
    </g>
  );
}

