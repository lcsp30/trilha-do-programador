
import estilo from "./Text01.module.css";

/**
 * Text01 — a placa com o letreiro "DIVIRTA-SE / NESSA JORNADA". É o último
 * recado do board01: depois dela o aluno entra no desafio.
 *
 * Peça de CHAPA, como a Seta: as duas formas da placa são cheias e o relevo
 * vem do deslocamento entre elas. As tintas estão no `Text01.module.css`; o
 * contorno de 1,23 fica aqui, porque vale para as duas placas.
 *
 * O LETREIRO é o único texto do tabuleiro. No arquivo de origem ele vem como
 * `<text>` — são as fontes do sistema que desenham as letras, com a `matrix`
 * que encaixa o bloco na placa (veja `.letreiro`). Trocar a frase é trocar as
 * duas `tspan`, mas os CINCO espaços antes de "DIVIRTA-SE" não são enfeite: com
 * o `white-space: pre` da classe, é o que centra a primeira linha na placa.
 *
 * TAMANHO: o desenho já vem em unidades do tabuleiro — 216 por 55 — então, ao
 * contrário de `JanelaEditor` e `Note`, não há escala base para compensar:
 * `tamanho = 1` é o tamanho da referência. Decimal sempre com PONTO, porque
 * `tamanho={0,5}` é o operador vírgula do JavaScript e vale 5.
 *
 * POSIÇÃO: `x` e `y` apontam para o CENTRO da peça. O desenho de origem vai de
 * (360,51 436,18) a (576,99 490,73), ou seja centro (468,75 463,46) — é o que o
 * `translate` abaixo leva para a origem.
 */
export default function Text01({ x, y, tamanho = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${tamanho})`}>
      <g transform="translate(-468.75 -463.46)">
        {/* a placa de trás, deslocada — é o relevo */}
        <path
          className={estilo.placaTras}
          stroke="#231f20"
          strokeLinejoin="round"
          strokeWidth="1.23"
          d="m571.14 483.62-196.3 7.11-10.68-50.6 212.83-1.97-5.85 45.46z"
        />
        {/* a placa da frente, que recebe o letreiro */}
        <path
          className={estilo.placaFrente}
          stroke="#231f20"
          strokeLinejoin="round"
          strokeWidth="1.23"
          d="m567.49 481.64-196.29 7.11-10.69-50.59 212.84-1.98-5.86 45.46z"
        />
        <text
          className={estilo.letreiro}
          transform="matrix(0.514323 -0.015742 0.013394 0.437616 49.618156 -22.400085)"
        >
          <tspan x="290.692" y="481.673">{"     DIVIRTA-SE"}</tspan>
          {/* o `dy` mora na LINHA SEGUNDA, e não numa `tspan` vazia entre as
              duas: `dy` em `tspan` sem caráter nenhum é ignorado pelo navegador
              e as linhas viram uma só. (No arquivo de origem havia um espaço
              invisível ali só para o navegador não ignorar — é mais frágil.) */}
          <tspan x="290.692" dy="1em">NESSA JORNADA</tspan>
        </text>
      </g>
    </g>
  );
}

