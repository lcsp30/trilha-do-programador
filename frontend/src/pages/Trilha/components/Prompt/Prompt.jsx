import estilo from "./Prompt.module.css";

/**
 * Prompt de terminal `>_` — o convite para digitar. É a primeira coisa que o
 * aluno vê num terminal, e o board01 é "a primeira instrução".
 *
 * A peça renderiza um `<g>`, não um `<svg>`: assim ela é posicionada DENTRO do
 * SVG do board e compartilha o mesmo sistema de coordenadas do traçado. `x` e
 * `y` são unidades do viewBox (1166 x 716), não pixels, e apontam para o
 * CENTRO da peça.
 *
 * Material de TRAÇO, o mesmo do `<Traco>` da trilha: duas camadas empilhadas,
 * a de trás mais grossa. `espessura` é a da camada da frente; a de trás sai 10
 * unidades maior. As espessuras ficam aqui como atributo, e não no CSS, porque
 * a diferença entre as camadas acompanha o tamanho da peça. O CSS cuida só da
 * cor e do acabamento — veja `Prompt.module.css`.
 */
export default function Prompt({ x, y, tamanho = 1, espessura = 11 }) {
  const d = "M-32 -24 L-4 0 L-32 24 M8 24 L38 24";

  return (
    <g transform={`translate(${x} ${y}) scale(${tamanho})`}>
      <path
        className={estilo.borda}
        strokeWidth={espessura + 10}
        d={d}
        stroke="#071a20"
      />
      <path className={estilo.sinal} strokeWidth={espessura} d={d} />
    </g>
  );
}
