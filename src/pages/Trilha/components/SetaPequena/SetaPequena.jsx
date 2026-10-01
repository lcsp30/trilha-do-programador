import estilo from "./SetaPequena.module.css";

/**
 * SetaPequena — a seta pequena do tabuleiro, em DUAS camadas como a `Seta` e a
 * `Seta01`: a de trás (o relevo, escura) deslocada em relação à da frente
 * (clara), e é o deslocamento entre elas que dá espessura à forma. Aponta um
 * ponto sem competir com as setas maiores.
 *
 * O DESENHO é do usuário, feito no editor vetorial, e chegou pela área de
 * transferência JÁ RENDERIZADO pelo navegador — o que se reconhece por três
 * marcas, todas normalizadas aqui:
 *   · `class="_seta_vlaqy_15"`, a classe do CSS module com hash, virou
 *     `className={estilo.seta}` — o hash é o número da linha e MUDA a cada
 *     edição do CSS, então no código ele apodreceria;
 *   · `style="..."` como STRING é inválido no React (ele espera objeto), o
 *     navegador descarta tudo e as duas formas sairiam pretas: as cores foram
 *     para as classes, no `.module.css`;
 *   · `stroke-width: 6.25` nos dois paths saiu — sem `stroke` (a tinta do
 *     contorno) ele não pinta nada: era sobra do editor. Se a peça um dia
 *     precisar de contorno, é declarar `stroke` na classe.
 * O `transform-origin: 50% 50%` do segundo path também saiu: ele só teria efeito
 * se o path tivesse `transform` próprio, e ele não tem.
 *
 * TAMANHO: o desenho do editor rende 44,32 por 56,56 unidades em `tamanho = 1`
 * — a versão anterior desta peça dava 71,21 por 100. Para chegar àquela altura
 * de 100, usar `tamanho={1.8}`. Não há outra escala base: o `0,5` já vem dentro
 * do `matrix`. Decimal sempre com PONTO — `tamanho={0,5}` é o operador vírgula
 * do JavaScript e vale 5, não 0,5.
 *
 * POSIÇÃO: `x` e `y` apontam para o CENTRO da peça, e `rotacao` (em graus, 0 por
 * padrão) gira em torno dela. O `matrix` do desenho JÁ traz um giro de 86° e uma
 * escala de 0,5 — ele não é redundante com o `rotate` daqui: um é o desenho, o
 * outro é o seu ajuste. A ORDEM importa: `scale` antes do `rotate`.
 */
export default function SetaPequena({ x, y, tamanho = 1, rotacao = 0 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${tamanho}) rotate(${rotacao})`}>
      <g transform="translate(-1075.38 -223.56)">
        <g transform="matrix(0.034878 0.498782 -0.498782 0.034878 1076.474731 223.476761)">
          <path
            className={estilo.relevo}
            d="M -36.756 -49.6 L 37.763 1.3 L -36.756 52.238 L -36.756 -49.6 Z"
          />
          <path
            className={estilo.seta}
            d="M -37.85 -46.675 L 33.531 3.65 L -37.85 54.006 L -37.85 -46.675 Z"
          />
        </g>
      </g>
    </g>
  );
}
