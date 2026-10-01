import estilo from "./JanelaEditor.module.css";

/**
 * Janela do editor — a tela onde o aluno escreve o pseudocódigo. Fecha o
 * sentido do board01: a trilha abre com um prompt e chega numa janela de código.
 *
 * Material de CHAPA, não de traço: as formas são cheias, como no ícone de
 * origem. As cores dele foram trocadas pelas do projeto — veja o mapa em
 * `JanelaEditor.module.css`.
 *
 * TAMANHO: o desenho original vai de (99,4 188,1) a (925,2 828,1), ou seja 826
 * por 640 unidades — grande demais para o tabuleiro. O `scale(0.15)` é a BASE, e
 * a prop `tamanho` MULTIPLICA essa base: com `tamanho = 1` a peça fica em 124
 * por 96 unidades, `tamanho={0.5}` dá metade e `tamanho={2}` dá o dobro. É o
 * único botão de tamanho.
 *
 * ARMADILHA: escreva decimal com PONTO. Em JSX, `tamanho={0,5}` é o operador
 * vírgula do JavaScript — vale 5, e a peça explode em 5x em vez de encolher.
 */
export default function JanelaEditor({ x, y, tamanho = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${tamanho})`}>
      <g transform="scale(0.15) translate(-512.3 -508.1)">
        <path
          className={estilo.janela}
          d="M854.7 828.1H169.9c-38.9 0-70.5-31.6-70.5-70.5v-499c0-38.9 31.6-70.5 70.5-70.5h684.7c38.9 0 70.5 31.6 70.5 70.5v499c0.1 38.9-31.5 70.5-70.4 70.5z"
        />
        <path
          className={estilo.barra}
          d="M885.2 258.1c0-16.5-13.5-30-30-30H169.4c-16.5 0-30 13.5-30 30v120.1h745.7V258.1z m-649.7 96.1c-28.2 0-51.2-23-51.2-51.2s23-51.2 51.2-51.2 51.2 23 51.2 51.2-22.9 51.2-51.2 51.2z m281.8-6.8H374.7c-24.1 0-43.7-19.6-43.7-43.7s19.6-43.7 43.7-43.7h142.6c24.1 0 43.7 19.6 43.7 43.7s-19.6 43.7-43.7 43.7z"
        />
        <path
          className={estilo.canto}
          d="M213.3 752.8h298.8c5.5 0 10-4.5 10-10s-4.5-10-10-10H213.3c-8.5 0-15.4-6.9-15.4-15.4V524.6c0-5.5-4.5-10-10-10s-10 4.5-10 10v192.9c0.1 19.4 15.9 35.3 35.4 35.3z"
        />
        <path
          className={estilo.ponto}
          d="M235.5 271.8c-17.2 0-31.2 14-31.2 31.2s14 31.2 31.2 31.2 31.2-14 31.2-31.2-14-31.2-31.2-31.2z"
        />
        <path
          className={estilo.pontoBorda}
          d="M235.5 251.8c-28.2 0-51.2 23-51.2 51.2s23 51.2 51.2 51.2 51.2-23 51.2-51.2-22.9-51.2-51.2-51.2z m0 82.4c-17.2 0-31.2-14-31.2-31.2s14-31.2 31.2-31.2 31.2 14 31.2 31.2-14 31.2-31.2 31.2z"
        />
        <path
          className={estilo.campo}
          d="M517.3 280.1H374.7c-13 0-23.7 10.6-23.7 23.7s10.6 23.7 23.7 23.7h142.6c13 0 23.7-10.6 23.7-23.7s-10.7-23.7-23.7-23.7z"
        />
        <path
          className={estilo.campoBorda}
          d="M517.3 260.1H374.7c-24.1 0-43.7 19.6-43.7 43.7s19.6 43.7 43.7 43.7h142.6c24.1 0 43.7-19.6 43.7-43.7s-19.6-43.7-43.7-43.7z m0 67.3H374.7c-13 0-23.7-10.6-23.7-23.7s10.6-23.7 23.7-23.7h142.6c13 0 23.7 10.6 23.7 23.7s-10.7 23.7-23.7 23.7z"
        />
        <path
          className={estilo.moldura}
          d="M855.2 188.1H169.4c-38.6 0-70 31.4-70 70v500c0 38.6 31.4 70 70 70h685.7c38.6 0 70-31.4 70-70v-500c0.1-38.6-31.3-70-69.9-70z m30 570c0 16.5-13.5 30-30 30H169.4c-16.5 0-30-13.5-30-30V398.2h745.7v359.9z m0-379.9H139.5V258.1c0-16.5 13.5-30 30-30h685.7c16.5 0 30 13.5 30 30v120.1z"
        />
        <path
          className={estilo.codigo}
          d="M459.9 624.6l-114.3-45.3 114.3-43.7v-46.5L296.1 560v39.5l163.8 71.2zM568.7 454.8h-34.4L475.1 702h33.8zM747.9 560.3l-164-70.9v45.8l114.4 44.5-114.4 45v46.2l164-71.4z"
        />
      </g>
    </g>
  );
}
