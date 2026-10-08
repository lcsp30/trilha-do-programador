import estilo from "./Seta.module.css";

/**
 * Seta — o arco grosso com ponta para baixo, copiado do `board-01` da
 * referência. É o "siga por aqui" do tabuleiro.
 *
 * Duas camadas cheias: uma forma deslocada para baixo/direita e a forma clara
 * por cima, o que dá o relevo de adesivo. Veja `Seta.module.css`.
 *
 * As coordenadas originais foram deslocadas para o centro da forma cair na
 * origem, então `x` e `y` posicionam o CENTRO da seta, como nas outras peças.
 * A caixa original vai de (768,103) a (973,300): cerca de 205 por 197, ou seja
 * `tamanho = 1` já dá uma peça de 205 unidades de largura.
 */
export default function Seta({ x, y, tamanho = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${tamanho})`}>
      <g transform="translate(-870.5 -201.5)">
        <path
          className={estilo.relevo}
          d="M959.64 276.95c-1.51-38.88-17.55-76.85-44.37-104.72-29.05-30.19-77.18-53.48-143.04-69.21l-3.95 16.54c61.76 14.76 108.35 37.05 134.74 64.47 23.81 24.74 38.1 58.41 39.61 92.94h-12.88l20.78 23 22.25-23h-13.14Z"
        />
        <path
          className={estilo.seta}
          d="M956.36 276.95c-1.51-38.88-17.55-76.85-44.37-104.72-29.05-30.19-77.18-53.48-143.04-69.21L765 119.56c61.76 14.76 108.35 37.05 134.74 64.47 23.81 24.74 38.1 58.41 39.61 92.94h-12.88l20.78 23 22.25-23h-13.14Z"
        />
      </g>
    </g>
  );
}
