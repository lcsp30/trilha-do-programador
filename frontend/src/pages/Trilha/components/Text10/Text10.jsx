import estilo from "./Text10.module.css";

/**
 * Text10 — a placa DEITADA com o letreiro "INSTRUÇÕES". É da família da `Text01`
 * (DIVIRTA-SE / NESSA JORNADA), da `Text04` (PROGRAMAÇÃO), da `Text05` (LÓGICA
 * SIMPLES) e da `Text07` (PORTUGUÊS - BR): DUAS CHAPAS, a de trás em Carvão do
 * Traço e a da frente no Papel do Mapa, com o relevo vindo do desencontro entre
 * elas.
 *
 * O contorno de 1,23 vive num `<g>` no componente, em volta das DUAS chapas — o
 * letreiro fica FORA dele, senão herda o traço.
 *
 * O LETREIRO É TEXTO VIVO, de uma linha só (ao contrário das placas de pé, que
 * têm uma `<tspan>` por letra). Ele traz um `matrix` próprio, que é um
 * encolhimento NÃO-uniforme com um fio de giro (0,514491 por 0,437759) — é ele
 * que faz a palavra caber na placa —, e por isso esse `transform` fica. O
 * `transform-box: fill-box` e o `transform-origin: 49.169% 63.6174%` que vinham
 * com ele foram para o CSS, não para o JSX: o React não conhece o atributo
 * `transformBox` (avisa no console e emite `transformbox`, que o navegador
 * ignora). Sem a caixa de referência, o `49,169%` seria medido contra a viewport
 * do SVG e a palavra sairia do lugar.
 * O `line-height` de 51,1569px que veio junto é inerte (uma linha só) e saiu.
 *
 * SOBRAS do arquivo de origem: o `matrix(1, 0, 0, 1, 475.650818, 60.516804)` do
 * `<g>` de fora (era a colocação no canvas — quem posiciona é o `translate` de
 * centralização), um `style=""` VAZIO na chapa de trás e o `<g fill="#231f20">`
 * vazio do fim do arquivo. ATENÇÃO a esse translate: como ele SAI, o centro do
 * desenho é o das coordenadas das chapas (480,07 466,40) e NÃO esse valor mais o
 * do `<g>` — somar os dois joga a peça 475,65 e 60,52 para fora do alvo.
 *
 * TAMANHO: as chapas deitadas medem cerca de 231,4 por 53,2 unidades cruas e a
 * peça rende 238,18 por 54,06 em `tamanho = 1`. Ela já está na escala do traçado
 * do board, então NÃO há escala base. Decimal sempre com PONTO — `tamanho={0,5}`
 * é o operador vírgula do JavaScript e vale 5.
 *
 * POSIÇÃO: `x` e `y` apontam para o CENTRO do desenho, e o `translate` interno
 * leva o centro do desenho de origem (480,07 466,40) para a origem.
 *
 * A prop `rotacao` gira a placa e o giro é em torno da ORIGEM, que é o centro da
 * peça (o `translate` de centralização fica dentro do `rotate`) — é o que se quer.
 * O DEFAULT 0 não é enfeite: sem ele, um call site que esqueça a prop gera
 * `rotate(undefined)`, e aí o navegador REJEITA o atributo `transform` inteiro:
 * a placa cai nas coordenadas cruas, sem aviso na tela.
 */
export default function Text10({ x, y, tamanho = 1, rotacao = 0 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${tamanho}) rotate(${rotacao})`}>
      <g transform="translate(-480.07 -466.40)">
        <g stroke="#231f20" strokeWidth="1.23" strokeLinejoin="round">
          <path
            className={estilo.placaTras}
            d="M 594.818 488.306 L 372.073 493.428 L 370.574 443.543 L 599.158 442.318 L 594.818 488.306 Z"
          />
          <path
            className={estilo.placaFrente}
            d="M 593.847 485.621 L 369.607 489.148 L 360.978 440.975 L 596.841 439.365 L 593.847 485.621 Z"
          />
        </g>
        <text
          className={estilo.letreiro}
          transform="matrix(0.514491 -0.00865 0.007359 0.437759 40.871304 -5.302142)"
          x="290.692"
          y="481.673"
        >
          INSTRUÇÕES
        </text>
      </g>
    </g>
  );
}

