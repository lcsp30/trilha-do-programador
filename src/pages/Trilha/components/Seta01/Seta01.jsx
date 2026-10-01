import estilo from "./Seta01.module.css";

/**
 * Seta01 — a segunda seta do tabuleiro. Mesma ideia da `Seta` (duas camadas
 * cheias, o relevo vindo do deslocamento entre elas), mas com desenho PRÓPRIO:
 * aqui a curva é mais aberta e o conjunto tem 193,98 por 195,54 unidades, contra
 * os ~205 por ~197 da `Seta`.
 *
 * DIFERENÇA em relação à `Seta`: o arquivo de origem trazia `stroke="#231f20"`
 * de espessura 1,23 no `<g>`, então esta peça TEM contorno e as classes do
 * `Seta01.module.css` não declaram `stroke`. O contorno vale para as duas
 * camadas, como nas placas da `Text01`.
 *
 * TAMANHO: já em escala de tabuleiro, então NÃO há escala base — `tamanho = 1`
 * é o tamanho da referência. Decimal sempre com PONTO: `tamanho={0,5}` é o
 * operador vírgula do JavaScript e vale 5.
 *
 * POSIÇÃO: `x` e `y` apontam para o CENTRO da peça, e o `translate` interno
 * leva o centro do desenho de origem para a origem.
 */
export default function Seta01({ x, y, tamanho = 1, rotacao = 0 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${tamanho}) rotate(${rotacao})`}>
      <g
        stroke="#231f20"
        strokeLinejoin="round"
        strokeWidth="1.23"
        transform="translate(-140.9 -118)"
      >
        <path
          className={estilo.relevo}
          d="M235.32 202.58 214.1 176.8l-2.82 10.2c-28.47-7.1-52.98-17.29-72.98-30.38-.83-.54-1.74-1.13-2.72-1.76-9.99-6.42-26.72-17.17-41.93-37.48C75 92.48 64.32 60.47 61.92 22.24l-17.96 1.13c6.16 97.96 61.18 133.32 81.89 146.63.94.6 1.8 1.16 2.59 1.67 21.58 14.12 47.79 25.09 78.05 32.68l-3.14 11.38 31.96-13.16Z"
        />
        <path
          className={estilo.seta}
          d="m237.93 200.53-21.22-25.78-2.82 10.2c-28.47-7.1-52.98-17.29-72.98-30.38-.83-.54-1.74-1.13-2.72-1.76-9.99-6.42-26.72-17.17-41.93-37.48-18.65-24.9-29.33-56.91-31.73-95.14l-17.96 1.13c6.16 97.96 61.18 133.32 81.89 146.63.94.6 1.8 1.16 2.59 1.67 21.58 14.12 47.79 25.09 78.05 32.68l-3.14 11.38 31.96-13.16Z"
        />
      </g>
    </g>
  );
}
