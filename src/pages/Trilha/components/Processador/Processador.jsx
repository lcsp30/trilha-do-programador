import estilo from "./Processador.module.css";

/**
 * Processador — o processador do tabuleiro: o chip quadrado com os pinos em
 * volta, quatro deles com um furo, desenhado em UMA cor.
 *
 * O GRADIENTE DO ARQUIVO ERA CHAPADO. O ícone do SVGRepo vem com um
 * `<linearGradient>` e SEIS `<stop>`, mas os seis stops são `#231f20` — ou seja,
 * o gradiente não faz degradê nenhum: é um preenchimento liso com passos
 * inúteis. Aqui ele saiu inteiro e o `url(#SVGID_1_)` do path virou uma CLASSE
 * com a mesma tinta, o Carvão do Traço. Mesmo desenho, um `<defs>` e seis
 * elementos a menos.
 *
 * SOBRAS do arquivo de origem que saíram: o `<svg>` de fora (com `width`,
 * `height`, `viewBox`, `enable-background`, `version`, `xml:space`, os namespaces
 * e um `id="processor_1_"` que viraria id repetido), o `fill="#000000"` dele —
 * que pintaria de preto puro qualquer forma sem cor — e os dois grupos de serviço
 * VAZIOS (`SVGRepo_bgCarrier` e `SVGRepo_tracerCarrier`). A casca
 * `id="SVGRepo_iconCarrier"` e o `<g id="processor">` eram só agrupamento e
 * também saíram.
 *
 * TAMANHO: aqui HÁ escala base: o desenho cru ocupa 320,9 por 376,5 num canvas de
 * 512, e o `scale(0.31)` rende 99,49 por 116,71 em `tamanho = 1` — o porte das
 * outras peças de ícone. `tamanho = 1` já é o tamanho de uso; a prop multiplica
 * essa base. Decimal sempre com PONTO — `tamanho={0,5}` é o operador vírgula do
 * JavaScript e vale 5.
 *
 * POSIÇÃO: `x` e `y` apontam para o CENTRO do desenho. A centralização tem dois
 * passos, nesta ordem: `scale(0.31)` e depois `translate(-256 -256)`, que é o
 * centro do desenho dentro do canvas de 512 — medido na peça já renderizada.
 * CUIDADO ao corrigir esse translate: ele está DENTRO do `scale`, então mexer 1
 * unidade nele move 0,31 na peça. Para tirar um resíduo de `r` no tabuleiro, a
 * correção no translate é `r / 0.31`, não `r`. A ordem importa — é T·S.
 */
export default function Processador({ x, y, tamanho = 1 , rotacao = 0}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${tamanho}) rotate(${rotacao})`}>
      <g transform="scale(0.31) translate(-256 -256)">         <path
          className={estilo.corpo}
          d="M396.207,210.913c-11.175,0-20.267,9.091-20.267,20.266c0,9.447,6.507,17.381,15.267,19.617v38.964 h-37.084v-84.976c0-23.729-17.564-43.429-40.373-46.793v-19.94h31.587v-30.418c8.76-2.235,15.266-10.17,15.266-19.617 c0-11.175-9.091-20.266-20.266-20.266s-20.267,9.091-20.267,20.266c0,9.447,6.506,17.381,15.267,19.617v20.418H303.75v29.428 h-43.148v-26.642c8.76-2.235,15.267-10.17,15.267-19.617c0-11.175-9.092-20.266-20.267-20.266s-20.266,9.091-20.266,20.266 c0,9.447,6.506,17.381,15.266,19.617v26.642h-43.895v-29.428H175.12v-20.418c8.761-2.235,15.267-10.17,15.267-19.617 c0-11.175-9.091-20.266-20.267-20.266c-11.175,0-20.266,9.091-20.266,20.266c0,9.447,6.506,17.381,15.266,19.617v30.418h31.587 v20.061c-22.444,3.68-39.627,23.203-39.627,46.673v5.755h-46.286v49.71c-8.761,2.234-15.267,10.168-15.267,19.615 c0,11.176,9.091,20.268,20.267,20.268c11.175,0,20.266-9.092,20.266-20.268c0-9.445-6.506-17.381-15.266-19.615v-39.71h36.286 v86.677c0,23.469,17.183,42.992,39.627,46.672v20.402H165.12v30.078c-8.76,2.234-15.266,10.17-15.266,19.615 c0,11.176,9.091,20.266,20.266,20.266c11.175,0,20.267-9.09,20.267-20.266c0-9.447-6.506-17.381-15.267-19.615v-20.078h31.587 v-29.77h43.895v27.57c-8.76,2.234-15.266,10.17-15.266,19.615c0,11.176,9.091,20.266,20.266,20.266s20.267-9.09,20.267-20.266 c0-9.445-6.507-17.381-15.267-19.615v-27.57h43.676v29.77h31.586v20.078c-8.76,2.234-15.266,10.17-15.266,19.615 c0,11.176,9.091,20.266,20.266,20.266s20.267-9.09,20.267-20.266c0-9.445-6.507-17.381-15.267-19.615v-30.078h-31.586v-20.363 c22.552-3.588,39.846-23.166,39.846-46.711v-7.457h47.084v-48.964c8.76-2.236,15.266-10.17,15.266-19.617 C416.473,220.004,407.382,210.913,396.207,210.913z M330.07,88.016c0-5.661,4.605-10.266,10.267-10.266 c5.66,0,10.266,4.605,10.266,10.266c0,5.661-4.605,10.267-10.266,10.267C334.676,98.282,330.07,93.677,330.07,88.016z M245.335,111.22c0-5.661,4.605-10.266,10.266-10.266s10.267,4.605,10.267,10.266c0,5.661-4.605,10.267-10.267,10.267 S245.335,116.881,245.335,111.22z M159.854,88.016c0-5.661,4.605-10.266,10.266-10.266c5.661,0,10.267,4.605,10.267,10.266 c0,5.661-4.605,10.267-10.267,10.267C164.459,98.282,159.854,93.677,159.854,88.016z M126.06,279.865 c0,5.662-4.605,10.268-10.266,10.268c-5.661,0-10.267-4.605-10.267-10.268c0-5.66,4.605-10.266,10.267-10.266 C121.455,269.6,126.06,274.205,126.06,279.865z M180.387,423.984c0,5.66-4.605,10.266-10.267,10.266 c-5.661,0-10.266-4.605-10.266-10.266s4.605-10.266,10.266-10.266C175.781,413.719,180.387,418.324,180.387,423.984z M265.868,401.707c0,5.66-4.605,10.266-10.267,10.266s-10.266-4.605-10.266-10.266s4.605-10.266,10.266-10.266 S265.868,396.047,265.868,401.707z M351.13,423.984c0,5.66-4.605,10.266-10.267,10.266c-5.66,0-10.266-4.605-10.266-10.266 s4.605-10.266,10.266-10.266C346.524,413.719,351.13,418.324,351.13,423.984z M344.123,307.217 c0,20.57-16.734,37.305-37.305,37.305H204.385c-20.57,0-37.305-16.734-37.305-37.305V204.784c0-20.57,16.735-37.306,37.305-37.306 h102.433c20.57,0,37.305,16.735,37.305,37.306V307.217z M396.207,241.445c-5.661,0-10.267-4.605-10.267-10.266 s4.605-10.266,10.267-10.266c5.66,0,10.266,4.605,10.266,10.266S401.867,241.445,396.207,241.445z"
        />
      </g>
    </g>
  );
}
