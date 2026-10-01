import estilo from "./Cerebro.module.css";

/**
 * Cerebro — o cérebro com os traços de circuito saindo à direita, em UMA cor.
 *
 * Os dois paths do arquivo de origem já eram `#231f20` — um com `fill="#231f20"`
 * inline e o outro com `style="fill: rgb(35, 31, 32)"` —, então não houve
 * tradução de paleta a fazer: a tinta é o Carvão do Traço e as duas formas saem
 * pela mesma classe.
 *
 * SOBRAS do export que saíram: o `matrix(1, 0, 0, 1, -372.129547, 186.659531)` do
 * `<g>` de fora (é a colocação no canvas do editor — quem posiciona é o
 * `translate` de centralização), os `opacity="1"` inertes e os `data-original="#..."`
 * que o editor deixa em cada forma.
 *
 * TAMANHO: o desenho cru ocupa 64,00 por 61,74 unidades, então aqui HÁ
 * escala base: o `scale(2)` traz a maior dimensão para 128,00 — o porte das outras
 * peças de ícone. Medido no tabuleiro: 128,00 por 123,48 com `tamanho = 1`. `tamanho = 1` já é o tamanho de uso; a prop multiplica essa base.
 * Decimal sempre com PONTO — `tamanho={0,5}` é o operador vírgula do JavaScript e
 * vale 5.
 *
 * POSIÇÃO: `x` e `y` apontam para o CENTRO do desenho. A centralização tem dois
 * passos, nesta ordem: `scale(2)` e depois `translate(-32.03 -32)` — o centro do
 * desenho, nas coordenadas locais, é (32,03, 32).
 *
 * CUIDADO ao corrigir esse translate: ele está DENTRO do `scale`, então mexer
 * 1 unidade nele move 2 na peça, e o sinal é o OPOSTO do resíduo — para matar um
 * resíduo `r` medido no tabuleiro, o translate anda `r / 2` para o outro lado
 * (`t_novo = t_velho − r / 2`). Foi assim que o `x` saiu de `-33.5`: o centro
 * medido caía 2,94 à esquerda do pedido → `-33.5 + 1,47 = -32,03` (aqui é soma
 * porque o resíduo era negativo).
 */
export default function Cerebro({ x, y, tamanho = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${tamanho})`}>
      <g transform="scale(2) translate(-32.03 -32)">
  <path d="M20.85 27.37a1 1 0 0 0 1.34.26 1 1 0 0 0 .26-1.35 5.48 5.48 0 0 0-7.64-1.55 1 1 0 0 0 1.08 1.61 3.57 3.57 0 0 1 4.96 1.03M16.66 41.55a3.57 3.57 0 0 1-2.77-4.24A1 1 0 0 0 12 37a5.48 5.48 0 0 0 4.31 6.5h.19a1 1 0 0 0 .18-1.92zM22 37.4a1 1 0 1 0-1.91.29 5.48 5.48 0 0 0 5.4 4.77 5.4 5.4 0 0 0 .8-.05 1 1 0 0 0 .82-1.1 1 1 0 0 0-1.1-.82A3.58 3.58 0 0 1 22 37.4" className={estilo.carvao} />
  <path d="M60.35 38.93a3.65 3.65 0 0 0-3.51 2.68h-3.35l-5.08-5.83a1 1 0 0 0-.73-.33H34.15v-6.87h13.53a1 1 0 0 0 .73-.33l5.08-5.83h3.35a3.66 3.66 0 1 0 0-1.94h-3.79a1 1 0 0 0-.73.33l-5.08 5.83H34.15V23h12.68a.94.94 0 0 0 .73-.34l3.54-4.16a.94.94 0 0 0 .23-.63V14a3.63 3.63 0 1 0-1.94 0v3.54l-3 3.52H34.15v-4.64h4.43a1 1 0 0 0 .82-.42l1.24-2a3.8 3.8 0 0 0 1 .16A3.66 3.66 0 1 0 38 10.47a3.6 3.6 0 0 0 1 2.47l-1 1.54h-3.85V6.99a.8.8 0 0 0 0-.21 8.42 8.42 0 0 0-8-5.65 8.51 8.51 0 0 0-7.69 5 8.43 8.43 0 0 0-10.94 8.04 8 8 0 0 0 .32 2.29A8.47 8.47 0 0 0 3 28.6a7.69 7.69 0 0 0 1.81 13.19A8.45 8.45 0 0 0 11 54.7a7.69 7.69 0 0 0 11.18 6.55 7.65 7.65 0 0 0 4.73 1.62 7.75 7.75 0 0 0 7.19-4.95 1 1 0 0 0 0-.23.5.5 0 0 0 0-.12v-8H38l1 1.54a3.6 3.6 0 0 0-1 2.47 3.66 3.66 0 1 0 3.66-3.65 3.8 3.8 0 0 0-1 .16L39.4 48a1 1 0 0 0-.82-.46h-4.43V43h12.23l3 3.52V50a3.68 3.68 0 1 0 1.94 0v-3.9a.94.94 0 0 0-.23-.63l-3.54-4.14a.94.94 0 0 0-.73-.34H34.15v-3.6h13.09l5.08 5.83a1 1 0 0 0 .73.33h3.79a3.65 3.65 0 1 0 3.51-4.62m0-19.23a1.72 1.72 0 1 1-1.72 1.72 1.72 1.72 0 0 1 1.72-1.72m-11.7-9.23a1.72 1.72 0 1 1 1.71 1.71 1.72 1.72 0 0 1-1.71-1.71m-7-1.72a1.72 1.72 0 1 1-1.72 1.72 1.72 1.72 0 0 1 1.73-1.72zm-9.45 6.7V20a5.43 5.43 0 0 0-5.43.35 1 1 0 0 0-.26 1.35 1 1 0 0 0 1.34.26 3.46 3.46 0 0 1 4.35.38v9.22a5.36 5.36 0 0 0-5.43.36 1 1 0 0 0 1.09 1.61 3.44 3.44 0 0 1 4.34.36v23.45a5.74 5.74 0 0 1-8.34 2.73 5.42 5.42 0 0 0 1.24-6.47 1 1 0 1 0-1.73.86 3.56 3.56 0 0 1-1.69 4.77 1.2 1.2 0 0 0-.21.17 5.73 5.73 0 0 1-8.56-4.85c1.7-.49 4.91-1.72 5.38-4.14a1 1 0 0 0-.77-1.14 1 1 0 0 0-1.12.73c-.29 1.44-3.31 2.51-4.51 2.77a6.5 6.5 0 0 1-4.74-10.85 1 1 0 0 0 .21-1 1 1 0 0 0-.74-.64A5.75 5.75 0 0 1 4.78 29.7a3.55 3.55 0 0 1 4.95 1 1 1 0 0 0 .8.42 1 1 0 0 0 .55-.17 1 1 0 0 0 .25-1.35 5.49 5.49 0 0 0-6.75-2 6.47 6.47 0 0 1 4-9.3 4.3 4.3 0 0 0 3.65 2.07 4.2 4.2 0 0 0 1.47-.26 1 1 0 1 0-.66-1.82 2.37 2.37 0 0 1-3-1.44.4.4 0 0 0 0-.09 6.49 6.49 0 0 1 8.64-8.48h.2c2.77.54 3.59 3.08 3.16 5.35a1 1 0 0 0 .77 1.13h.18a1 1 0 0 0 1-.79c.63-3.38-.82-6.22-3.58-7.29a6.54 6.54 0 0 1 5.83-3.66 6.46 6.46 0 0 1 6.07 4.22zm9.45 36.37a1.72 1.72 0 1 1-1.72 1.71 1.72 1.72 0 0 1 1.73-1.71zm10.42 1.71a1.72 1.72 0 1 1-1.72-1.71 1.72 1.72 0 0 1 1.73 1.71zm8.27-9.23a1.72 1.72 0 1 1 1.71-1.72 1.72 1.72 0 0 1-1.7 1.72z" className={estilo.carvao} />
      </g>
    </g>
  );
}

