import estilo from "./Note.module.css";

/**
 * Note — o notebook com `</>` na tela. É onde o aluno escreve o pseudocódigo.
 *
 * Peça MISTA, e é a única assim: a tampa, a base e a tela são CHAPA (formas
 * cheias) e por cima vem o contorno e o `</>` como TRAÇO. Por isso os dois
 * grupos estão separados no JSX: as classes de chapa não declaram `fill: none`
 * e as de traço declaram — veja `Note.module.css`.
 *
 * TAMANHO: o desenho ocupa 56 por 38 unidades. O `scale(2.14)` é a BASE e a
 * prop `tamanho` MULTIPLICA: `tamanho = 1` dá 120 por 81 unidades. Decimal
 * sempre com PONTO.
 *
 * O contorno usa o `#071a20`, que é também a cor do fundo da página: sobre o
 * fundo escuro ele some, sobre o leito claro da trilha lê como tinta.
 */
export default function Note({ x, y, tamanho = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${tamanho})`}>
      <g transform="scale(2.14) translate(-31 -32)">
        <path className={estilo.tampa} d="M49,0 L7,0 C5.343,0 4,1.343 4,3 L4,32 L52,32 L52,3 C52,1.343 50.657,0 49,0" />         <path className={estilo.base} d="M56,32 L56,35 C56,36.657 54.657,38 53,38 L3,38 C1.343,38 0,36.657 0,35 L0,32 L56,32 Z" />         <polygon className={estilo.tela} points="8 28 48 28 48 4 8 4" />         <g
          fill="none"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path className={estilo.contorno} d="M52,32 L52,3 C52,1.343 50.657,0 49,0 L7,0 C5.343,0 4,1.343 4,3 L4,32" />           <path className={estilo.contorno} d="M56,32 L56,35 C56,36.657 54.657,38 53,38 L3,38 C1.343,38 0,36.657 0,35 L0,32 L56,32 Z" />           <polygon className={estilo.contorno} points="8 28 48 28 48 4 8 4" />           <polyline className={estilo.codigo} points="22 11 16 16 22 21" />           <polyline className={estilo.codigo} points="34 11 40 16 34 21" />           <path className={estilo.codigo} d="M26,24 L30,8" />
        </g>
      </g>
    </g>
  );
}