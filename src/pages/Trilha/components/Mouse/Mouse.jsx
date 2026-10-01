import estilo from "./Mouse.module.css";

/**
 * Mouse — o mouse de computador desenhado em TRAÇO (linha), inclinado, com os
 * dois botões e a rodinha à mostra. Sem cabo: o desenho é só o contorno do mouse.
 *
 * TERCEIRA versão do arquivo: o usuário re-exportou a peça e agora ela é UM
 * `<path>` só, de traço, em `#231f20` (`style="fill: rgb(35, 31, 32)"`). Não há
 * mais chapa de Papel do Mapa nem contorno: o desenho inteiro é a linha, já
 * expandida em contorno vetorial CHEIO no editor — ou seja, a espessura da linha
 * é a do próprio `d` — e é por isso que a classe é uma só (`.traco`) e não usa
 * `stroke`.
 *
 * SOBRAS do export que saíram: o `matrix(1, 0, 0, 1, -774.370911, 67.693535)` do
 * `<g>` de fora (é a colocação no canvas do editor — quem posiciona é o
 * `translate` de centralização, e esse translate NÃO se soma ao centro), o
 * `opacity="1"` inerte e o `data-original="#000000"` (metadado do editor com a
 * cor da arte original).
 *
 * TAMANHO: o desenho cru ocupa 56,00 por 50,80 unidades (x de 4 a 60, y de 6,6 a
 * 57,4), então aqui HÁ escala base: o `scale(2)` traz a maior dimensão para 111,96
 * — o porte das outras peças de ícone. Medido no tabuleiro: 111,96 por 101,64 com
 * `tamanho = 1`.
 * Decimal sempre com PONTO — `tamanho={0,5}` é o operador vírgula do JavaScript e
 * vale 5.
 *
 * POSIÇÃO: `x` e `y` apontam para o CENTRO do desenho. A centralização tem dois
 * passos, nesta ordem: `scale(2)` e depois `translate(-32.01 -31.99)` — o centro
 * do desenho, nas coordenadas locais, é (32,01, 31,99).
 *
 * CUIDADO ao corrigir esse translate: ele está DENTRO do `scale(2)`, então mexer
 * 1 unidade nele move 2 na peça — e, se o resíduo foi medido em unidades do
 * tabuleiro, ele ainda está multiplicado pelo `tamanho` do call site. O caminho
 * curto é não corrigir e sim IGUALAR: o translate é MENOS o centro local do
 * desenho, em ambos os eixos. (Com o chute `-30 -30` e `tamanho={0.45}`, o resíduo
 * medido foi 1,81 — que é 0,45 × 2 × 2,01, exatamente o erro do chute.)
 */
export default function Mouse({ x, y, tamanho = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${tamanho})`}>
      <g transform="scale(2) translate(-32.01 -31.99)">
        <path d="M59.14 35.265a49 49 0 0 0-3.538-8.073 45 45 0 0 0-6.2-8.173 1 1 0 1 0-1.445 1.382 43 43 0 0 1 5.915 7.795 48 48 0 0 1 3.37 7.699c4.203 13.923-9.858 22.89-21.988 18.4a21.34 21.34 0 0 1-7.576-4.941 1 1 0 0 1-.29-.741c.28-5.229-3.551-13.034-11.26-20.205a80.8 80.8 0 0 0 24.387-14.234 46 46 0 0 1 4.605 3.527 1 1 0 1 0 1.32-1.502 47.5 47.5 0 0 0-5.454-4.137 40.4 40.4 0 0 0-9.505-4.705C23.858 4.94 15.534 8.862 14.706 9.269a24.2 24.2 0 0 0-9.712 7.205 3.76 3.76 0 0 0-.846 3.306 13.94 13.94 0 0 0 1.32 8.12 19.5 19.5 0 0 0 3.391 5.103 1 1 0 0 0 1.48-1.346 16.32 16.32 0 0 1-4.29-9.173c2.712 2.763 4.854 4.07 7.51 6.277a66 66 0 0 1 6.725 7.164 25 25 0 0 1 4.764 9.495 54.5 54.5 0 0 0-11.655-10.989c-1.356-1.256-2.724.84-1.077 1.69 4.754 3.346 10.085 8.242 13.346 13.765 11.801 15.013 39.544 6.17 33.478-14.62M30.894 9.268a38.2 38.2 0 0 1 7.873 3.76 79 79 0 0 1-7.241 5.359 18.5 18.5 0 0 0-5.491-4.09 2.7 2.7 0 0 0-1.662-2.741c-1.767-.649-3.883-2.108-5.455-.554a81 81 0 0 0-1.653-.642c2.778-1.055 8.477-2.724 13.629-1.092m-10.878 3.617a.745.745 0 0 1 .981-.544l2.622 1.067a.705.705 0 0 1 .389.914.744.744 0 0 1-.982.544L20.404 13.8a.705.705 0 0 1-.388-.914M7.795 21.391l-1.189-1.149a1.76 1.76 0 0 1-.115-2.442 23.2 23.2 0 0 1 8.101-6.316c.35.206 1.265.449 3.407 1.305a2.7 2.7 0 0 0 1.651 2.863l2.622 1.067a2.72 2.72 0 0 0 2.938-.6 17.3 17.3 0 0 1 4.624 3.351 74.4 74.4 0 0 1-15.406 7.408 70 70 0 0 1-6.633-5.487" className={estilo.traco} />
      </g>
    </g>
  );
}
