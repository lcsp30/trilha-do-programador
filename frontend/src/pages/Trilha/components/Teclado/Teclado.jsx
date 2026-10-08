import estilo from "./Teclado.module.css";

/**
 * Teclado — o teclado do computador, para o vocabulário de máquina que a trilha
 * já usa (`Note`, `JanelaEditor`).
 *
 * O arquivo de origem é um export do SKETCH e traz três marcas disso, todas
 * resolvidas aqui:
 *   · cada forma vinha DUAS vezes — uma só com `fill` e outra só com `stroke`
 *     (os pares `Fill-NNN`/`Stroke-NNN` têm os MESMOS `points`). As duas continuam
 *     no arquivo (é a estrutura da origem), mas quem pinta agora são as classes: a
 *     de `fill` pinta a chapa, a de `stroke` desenha o contorno por cima;
 *   · quatro `<g>` aninhados com `translate` que se anulam — `(-265 -295)` mais
 *     `(270 300)` dão `(5 5)`, o deslocamento da peça dentro do viewBox de 64.
 *     Os três com transform SAÍRAM (o desenho voltou para a coordenada crua e a
 *     centralização abaixo cuida disso) e o grupo vazio `SLICES-64px` também;
 *   · `<title>`, `<desc>`, `<defs>` vazio e `fill="#000000"` no `<svg>`: fora.
 *
 * TAMANHO: o desenho tem 52 por 54 unidades num viewBox de 64 (o fio sobe até
 * `y = 0` e o corpo do teclado vai até `y = 54`), então a peça TEM escala base:
 * o `scale(2)` existe só para `tamanho = 1` dar uma peça de 104 por 108
 * unidades, na faixa das outras. Decimal sempre com PONTO — `tamanho={0,5}` é o
 * operador vírgula do JavaScript e vale 5.
 *
 * POSIÇÃO: `x` e `y` apontam para o CENTRO da peça, e o `translate` interno
 * (26 27, o meio do desenho cru — medido) leva o centro para a origem. A ORDEM
 * importa: `scale` antes de `translate`.
 */
export default function Teclado({ x, y, tamanho = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${tamanho})`}>
      <g transform="scale(2) translate(-26 -27)">
        <polygon className={estilo.corpo} points="0 54 52 54 52 26 0 26"> </polygon> <polygon className={estilo.teclas} points="4 50 8 50 8 46 4 46"> </polygon> <polygon className={estilo.teclas} points="12 50 40 50 40 46 12 46"> </polygon> <polygon className={estilo.teclas} points="4 42 8 42 8 38 4 38"> </polygon> <polygon className={estilo.teclas} points="4 34 8 34 8 30 4 30"> </polygon> <polygon className={estilo.teclas} points="12 42 16 42 16 38 12 38"> </polygon> <polygon className={estilo.teclas} points="12 34 16 34 16 30 12 30"> </polygon> <polygon className={estilo.teclas} points="20 42 24 42 24 38 20 38"> </polygon> <polygon className={estilo.teclas} points="20 34 24 34 24 30 20 30"> </polygon> <polygon className={estilo.teclas} points="28 42 32 42 32 38 28 38"> </polygon> <polygon className={estilo.teclas} points="28 34 32 34 32 30 28 30"> </polygon> <polygon className={estilo.teclas} points="36 42 40 42 40 38 36 38"> </polygon> <polygon className={estilo.teclas} points="36 34 40 34 40 30 36 30"> </polygon> <polygon className={estilo.teclas} points="44 42 48 42 48 38 44 38"> </polygon> <polygon className={estilo.teclas} points="44 50 48 50 48 46 44 46"> </polygon> <polygon className={estilo.teclas} points="44 34 48 34 48 30 44 30"> </polygon> <polygon className={estilo.contorno} points="0 54 52 54 52 26 0 26"> </polygon> <polygon className={estilo.contorno} points="4 50 8 50 8 46 4 46"> </polygon> <polygon className={estilo.contorno} points="12 50 40 50 40 46 12 46"> </polygon> <polygon className={estilo.contorno} points="4 42 8 42 8 38 4 38"> </polygon> <polygon className={estilo.contorno} points="4 34 8 34 8 30 4 30"> </polygon> <polygon className={estilo.contorno} points="12 42 16 42 16 38 12 38"> </polygon> <polygon className={estilo.contorno} points="12 34 16 34 16 30 12 30"> </polygon> <polygon className={estilo.contorno} points="20 42 24 42 24 38 20 38"> </polygon> <polygon className={estilo.contorno} points="20 34 24 34 24 30 20 30"> </polygon> <polygon className={estilo.contorno} points="28 42 32 42 32 38 28 38"> </polygon> <polygon className={estilo.contorno} points="28 34 32 34 32 30 28 30"> </polygon> <polygon className={estilo.contorno} points="36 42 40 42 40 38 36 38"> </polygon> <polygon className={estilo.contorno} points="36 34 40 34 40 30 36 30"> </polygon> <polygon className={estilo.contorno} points="44 42 48 42 48 38 44 38"> </polygon> <polygon className={estilo.contorno} points="44 50 48 50 48 46 44 46"> </polygon> <polygon className={estilo.contorno} points="44 34 48 34 48 30 44 30"> </polygon> <path d="M14,0 C14,3.313 16.687,6 20,6 L38,6 C41.313,6 44,8.687 44,12 C44,15.313 41.313,18 38,18 L32,18 C28.687,18 26,20.687 26,24 L26,26"
          className={estilo.fio}
        />
      </g>
    </g>
  );
}
