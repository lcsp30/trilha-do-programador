import estilo from "./Seta02.module.css";

/**
 * Seta02 — a terceira seta do tabuleiro. Mesma ideia da `Seta`/`Seta01` (duas
 * camadas cheias, o relevo vindo do deslocamento entre elas), com desenho
 * próprio: aqui a curva é mais aberta e o conjunto tem 106,11 por 67,14
 * unidades.
 *
 * DIFERENÇA em relação à `Seta`: o arquivo de origem trazia `stroke="#231f20"`
 * de espessura 1,23 no `<g>` (e nenhum transform), então esta peça TEM contorno
 * e as classes do `Seta02.module.css` não declaram `stroke`. O contorno vale
 * para as duas camadas, como nas placas da `Text01`.
 *
 * TAMANHO: já em escala de tabuleiro, então NÃO há escala base — `tamanho = 1`
 * é o tamanho da referência. Decimal sempre com PONTO: `tamanho={0,5}` é o
 * operador vírgula do JavaScript e vale 5.
 *
 * POSIÇÃO: `x` e `y` apontam para o CENTRO da peça, e o `translate` interno
 * leva o centro do desenho de origem (119,18 257,10) para a origem.
 */
export default function Seta02({ x, y, tamanho = 1, rotacao = 0 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${tamanho}) rotate(${rotacao})`}>
      <g
        stroke="#231f20"
        strokeLinejoin="round"
        strokeWidth="1.23"
        transform="translate(-119.18 -257.1)"
      >
        <path
          className={estilo.relevo}
          d="m172.23 243.59-1.96-16.89c-41.77 4.85-71.93 18.25-91.95 40.89l-7.97-8.77-3.05 30.85 31.99 1-9.45-10.4c17.27-20.48 43.57-32.16 82.4-36.67Z"
        />
        <path
          className={estilo.seta}
          d="m171.06 240.42-1.96-16.89c-41.77 4.85-71.93 18.25-91.95 40.89l-7.97-8.77-3.05 30.85 31.99 1-9.45-10.4c17.27-20.48 43.57-32.16 82.4-36.67Z"
        />
      </g>
    </g>
  );
}
