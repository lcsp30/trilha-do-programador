import estilo from "./Text09.module.css";

/**
 * Text09 — a placa DE PÉ com o letreiro "SOLUÇÕES". É da família da `Text03`
 * (ALGORITMO) e da `Text06` (PSEUDOCÓDIGO): a mesma placa deitada da `Text01`
 * girada ~93°, com o letreiro escrito de cima para baixo.
 *
 * DUAS CHAPAS, como todas as placas: a de TRÁS em Carvão do Traço (o `#231f20`
 * do arquivo) e a da FRENTE no Papel do Mapa (o `rgb(247, 243, 229)` é o token
 * `--cor-texto`). O contorno de 1,23 que vem em cada path fica no componente, num
 * `<g>` em volta das DUAS chapas — o letreiro NÃO pode entrar nesse grupo, senão
 * herda o traço.
 *
 * Nesta exportação as chapas NÃO têm `transform` próprio, e por isso os
 * `transform-origin` que vinham nos `style` delas são INERTES (sem `transform`,
 * origem não faz nada): saíram junto com os `style`, e só o `fill` de cada uma
 * virou classe.
 *
 * O LETREIRO É TEXTO VIVO: trocar a palavra é mexer no JSX. Cada letra mora na
 * própria `<tspan>`, com o `x` da coluna e o `dy` de 1.4em, que é o avanço de uma
 * linha. No arquivo de origem as letras vinham SOLTAS entre `<tspan>` vazias
 * (cada uma com um espaço invisível U+200B dentro) e ainda sobrava uma tspan
 * vazia no fim: aqui as letras foram para dentro das tspans e os nove espaços
 * saíram.
 *
 * ARMADILHA DO GIRO (a mesma da `Text06`, que não é a da `Text03`): o `<g>` de
 * origem traz um `matrix` E um `transform-origin` de (472,575 462,839). Esse
 * origin é a origem do GIRO, não o centro da placa (490,71 463,83) — e, somados,
 * o centro depois do giro não é "origem + translate". O caminho que dá certo:
 * girar o CENTRO DA PLACA em torno do origin, isto é `origem + R·(centro −
 * origem)`, e só então somar o translate do `matrix`, que nesta exportação é
 * (271,383301 39,583424). Deu (744,86 516,74), já descontado o resíduo de
 * (0,16 1,59) que a conferência no navegador acusou.
 *
 * TAMANHO: as chapas deitadas medem cerca de 231,4 por 53,2 unidades cruas; de
 * pé, a peça rende 67,55 por 237,04 em `tamanho = 1`. Ela já está na escala do
 * traçado do board, então NÃO há escala base. Decimal sempre com PONTO —
 * `tamanho={0,5}` é o operador vírgula do JavaScript e vale 5.
 *
 * POSIÇÃO: `x` e `y` apontam para o CENTRO do desenho, e o `translate` interno
 * leva o centro do desenho de origem (744,86 516,74) para a origem.
 */
export default function Text09({ x, y, tamanho = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${tamanho})`}>
      <g transform="translate(-744.86 -516.74)">
        <g
          transform="matrix(-0.052589 0.998616 -0.998616 -0.052589 271.383301 39.583424)"
          transformOrigin="472.575px 462.839px"
        >
          <g stroke="#231f20" strokeWidth="1.23" strokeLinejoin="round">
            <path
              className={estilo.placaTras}
              d="M 604.054 479.6 L 375.178 488.828 L 370.8 441.477 L 602.602 433.536 L 604.054 479.6 Z"
            />
            <path
              className={estilo.placaFrente}
              d="M 600.967 481.64 L 371.472 488.75 L 369.597 441.367 L 599.526 435.575 L 600.967 481.64 Z"
            />
          </g>
        <text
          className={estilo.letreiro}
          transform="matrix(-0.052589 -0.998617 0.998617 -0.052589 210.396591 528.472046)"
          x="52.186"
          y="198.744"
        >
          <tspan x="52.186">S</tspan>
          <tspan x="52.186" dy="1.4em">O</tspan>
          <tspan x="52.186" dy="1.4em">L</tspan>
          <tspan x="52.186" dy="1.4em">U</tspan>
          <tspan x="52.186" dy="1.4em">Ç</tspan>
          <tspan x="52.186" dy="1.4em">Õ</tspan>
          <tspan x="52.186" dy="1.4em">E</tspan>
          <tspan x="52.186" dy="1.4em">S</tspan>
        </text>
        </g>
      </g>
    </g>
  );
}

