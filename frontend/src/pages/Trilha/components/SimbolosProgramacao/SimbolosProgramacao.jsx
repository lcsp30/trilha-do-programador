import estilo from "./SimbolosProgramacao.module.css";

/**
 * SimbolosProgramacao — os selos hexagonais com o símbolo da programação dentro,
 * um por símbolo: hoje o `</>` e o `{ }`.
 * Peça MISTA: as duas chapas do selo são CHAPA (formas cheias, o relevo vindo do
 * deslocamento entre elas, como nas placas da `Text01`) e o símbolo de dentro é
 * TEXTO vivo — trocar o símbolo é mexer no JSX.
 *
 * Diferença em relação às outras peças: aqui moram VÁRIOS selos no MESMO arquivo.
 * A chapa é sempre a MESMA (o mesmo hexágono, com a placa de trás deslocada
 * fazendo o relevo) e só o símbolo muda, então um componente base + uma chamada
 * por símbolo dá menos arquivo do que uma pasta por selo e garante que a chapa
 * saia idêntica em todos. Mesmo arranjo do `Numeros.jsx`.
 *
 * O arquivo de origem é um ícone do SVGRepo e veio com sobras:
 *   · um `<g>` de fora sem transform nenhum, só invólucro;
 *   · os `matrix(1, 0, 0, 1, ...)` de POSIÇÃO no canvas. O do grupo da frente NÃO
 *     era sobra: é ele que dá METADE do deslocamento do relevo (a outra metade é
 *     o `matrix` do grupo de trás, que também deixa a placa de trás ~2% maior).
 *     Na conversão esses deslocamentos foram DOBRADOS nos `translate` dos grupos
 *     — e as coordenadas do `<text>` andaram o mesmo tanto, porque o texto era a
 *     única parte em coordenadas ABSOLUTAS. Mesmo desenho, grupos a menos;
 *   · o `id="SVGRepo_bgCarrier"` do grupo da frente (nome de serviço do export,
 *     que aqui embrulhava desenho de verdade) e o `stroke-width="0"` dele;
 *   · `strokewidth="0"` (sem hífen) nos paths: atributo INVÁLIDO, que o
 *     navegador ignora e que o React reclamaria como prop desconhecida;
 *   · em CADA chapa havia DUAS paths do mesmo hexágono, com a mesma caixa: uma
 *     vinda de um path de ícone de 24 unidades com `translate(-6 -6)
 *     scale(2.25)` e outra já em coordenadas absolutas. A primeira fica embaixo
 *     da segunda, com o mesmo preenchimento — invisível. Saiu, e sobrou um
 *     hexágono por chapa.
 *
 * TAMANHO: a placa da frente tem 33,75 por 35,98 unidades cruas; com a escala
 * base de 3 ela rende 101,25 por 107,94, na faixa das peças de ícone (Teclado
 * 104, SimboloTradutor 120). O conjunto todo, com o relevo, mede 35,35 por 38,20
 * crus — o relevo é discreto de propósito: a placa de trás é ~3% maior e fica
 * cerca de 1 unidade abaixo e à direita. A prop `tamanho` multiplica essa base e
 * o `</>` acompanha, porque é texto dentro do mesmo grupo. Decimal sempre com
 * PONTO — `tamanho={0,5}` é o operador vírgula do JavaScript e vale 5.
 *
 * POSIÇÃO: `x` e `y` apontam para o CENTRO DA PLACA DA FRENTE, como nas outras
 * placas: quem tem de cair no lugar é a chapa, e o relevo fica pendurado para
 * baixo e para a direita (o centro da SILHUETA fica 0,8 por 1,1 adiante).
 */

/* O hexágono da chapa. As duas placas usam o MESMO `d` — o que muda entre elas é
   só o deslocamento e a escala do grupo de trás. O centro dele já é (12 12), e é
   esse par que a centralização desconta. */
const CHAPA =
  "M 14.624 -5.257 C 13.011 -6.235 10.989 -6.235 9.377 -5.257 L -2.436 1.902 C -3.95 2.819 -4.875 4.461 -4.875 6.231 L -4.875 17.769 C -4.875 19.539 -3.95 21.181 -2.436 22.098 L 9.377 29.258 C 10.989 30.235 13.011 30.235 14.624 29.258 L 26.436 22.098 C 27.95 21.181 28.875 19.539 28.875 17.769 L 28.875 6.231 C 28.875 4.461 27.95 2.819 26.436 1.902 L 14.624 -5.257 Z";

/* A chapa do selo: a placa de trás (deslocada ~1,1 para baixo/direita e um fio
   maior) e a da frente, com o símbolo por cima. O `children` entra no sistema da
   placa da frente, que é o do próprio hexágono — então quem chama só posiciona o
   símbolo DENTRO dele, e o `tamanho` leva o conjunto todo junto. */
function Selo({ x, y, tamanho = 1, children }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${tamanho})`}>
      <g transform="scale(3) translate(-12 -12)">
        <g transform="translate(1.081 1.282) scale(1.017936 1.031353)">
          <path className={estilo.placaTras} d={CHAPA} />
        </g>
        <g>
          <path className={estilo.placaFrente} d={CHAPA} />
          {children}
        </g>
      </g>
    </g>
  );
}

/**
 * O selo do `</>`, o símbolo da programação. O símbolo é TEXTO vivo: mudar o
 * desenho é mexer aqui — e ele precisa vir entre chaves (`{"</>"}`), senão o
 * parser lê como fragmento vazio.
 */
export function SimboloProgramacao01({ x, y, tamanho = 1 }) {
  return (
    <Selo x={x} y={y} tamanho={tamanho}>
      <text className={estilo.letreiro} x="-0.034" y="17.378">
        {"</>"}
      </text>
    </Selo>
  );
}

/**
 * O selo do `{ }`. O símbolo é TEXTO vivo, como o do `01` — e aqui, de novo, ele
 * precisa vir entre chaves (`{"{ }"}`): solto, o JSX lê o `{` como início de
 * expressão e o selo sai vazio.
 *
 * O `{ }` é o único texto das peças que NÃO é Orbitron: no arquivo de origem ele
 * está em Arial 19px. Ficou como veio; é uma linha no `.module.css` para trocar.
 */
export function SimboloProgramacao02({ x, y, tamanho = 1 }) {
  return (
    <Selo x={x} y={y} tamanho={tamanho}>
      <text className={estilo.chaves} x="2.712" y="16.505">
        {"{ }"}
      </text>
    </Selo>
  );
}
