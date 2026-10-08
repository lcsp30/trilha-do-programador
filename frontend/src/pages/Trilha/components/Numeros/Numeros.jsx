import estilo from "./Numeros.module.css";

/**
 * Números — as placas numeradas do tabuleiro.
 *
 * Diferença em relação às outras peças: aqui moram VÁRIOS números no MESMO
 * arquivo. A placa (o prato claro e o anel) é sempre a mesma e só o algarismo
 * muda, então um componente base + uma chamada por número dá menos arquivo do
 * que dez pastas, e garante que o prato saia idêntico em todas.
 *
 * `Numero` posiciona e desenha a placa; o algarismo entra como FILHO. Para
 * acrescentar um número, copie o formato de `Numero01` e troque só o `d` — mas
 * ATENÇÃO: o `d` tem de estar no MESMO sistema de coordenadas da placa, isto é,
 * no prato de centro (671,19 458,49). Se ele vier de outro canvas do editor
 * (como o do `02`, que veio em (302,79 193,50)), envolva o `<path>` num
 * `<g transform="translate(...)">` que traga o meio do algarismo para o meio do
 * prato — senão a placa renderiza VAZIA, sem erro nenhum.
 *
 * TAMANHO: as placas já estão em unidades do tabuleiro — o prato tem 97 de
 * diâmetro — então, ao contrário das outras peças, NÃO há escala base:
 * `tamanho = 1` já é o tamanho de uso. `x` e `y` apontam para o CENTRO.
 */
function Numero({ x, y, tamanho = 1, children }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${tamanho})`}>
      {/* No arquivo de referência esta placa fica em (671,19 458,49); aqui o
          centro cai na origem, para `x` e `y` a posicionarem. */}
      <g transform="translate(-671.19 -458.49)">
        <circle className={estilo.placa} cx="671.19" cy="458.49" r="46.08" />
        <path
          className={estilo.placaBorda}
          d="M671.19 414.92c24.07 0 43.58 19.51 43.58 43.58s-19.51 43.58-43.58 43.58-43.58-19.51-43.58-43.58 19.51-43.58 43.58-43.58m0-5c-26.79 0-48.58 21.79-48.58 48.58s21.79 48.58 48.58 48.58 48.58-21.79 48.58-48.58-21.79-48.58-48.58-48.58Z"
        />
        <g className={estilo.algarismo}>{children}</g>
      </g>
    </g>
  );
}

/**
 * A placa do 01. O algarismo que veio no arquivo é um `0` e um `1` desenhados
 * no mesmo path — uma barra horizontal no topo e uma haste vertical à direita —
 * com os dois algarismos centrados no prato.
 */
export function Numero01({ x, y, tamanho = 1 }) {
  return (
    <Numero x={x} y={y} tamanho={tamanho}>
      <path d="M664.84 471.74c-2.02 0-3.83-.53-5.43-1.6s-2.86-2.54-3.76-4.43c-.91-1.88-1.36-4.05-1.36-6.51s.45-4.61 1.35-6.47c.9-1.86 2.14-3.32 3.73-4.38 1.59-1.06 3.38-1.58 5.38-1.58s3.87.53 5.47 1.58c1.6 1.06 2.85 2.52 3.75 4.39.9 1.87 1.35 4.04 1.35 6.49s-.45 4.65-1.35 6.52c-.9 1.87-2.14 3.34-3.73 4.39-1.59 1.06-3.38 1.58-5.38 1.58Zm-.03-5.31c.91 0 1.69-.27 2.35-.8.66-.53 1.16-1.35 1.52-2.44s.53-2.41.53-3.95-.18-2.82-.53-3.9c-.35-1.08-.86-1.89-1.52-2.44s-1.45-.82-2.38-.82-1.69.27-2.35.8c-.66.53-1.16 1.33-1.52 2.4-.35 1.07-.53 2.37-.53 3.92s.18 2.86.53 3.95c.35 1.09.86 1.91 1.52 2.45.66.54 1.45.82 2.38.82ZM676.76 452.25v-5.08h10.29v5.08h-10.29Zm4.6 19.08v-24.15h6.03v24.15h-6.03Z" />
    </Numero>
  );
}


/**
 * A placa do 02. O `d` deste par veio de OUTRO canvas do editor vetorial: os
 * dois glifos (o `0` de 21,03 por 24,97 e o `2` de 18,02 por 24,56, o par
 * inteiro em (302,79 193,50), medindo 40,53 por 24,97) ficam longe do prato,
 * cujo centro é (671,19 458,49). Era por isso que a placa saía vazia: o
 * algarismo era desenhado fora dela.
 *
 * O `translate` abaixo leva o MEIO do par para o MEIO do prato, no mesmo lugar
 * em que o par do `01` fica: 670,84 − 323,06 = 347,79 e 459,25 − 205,99 = 253,27.
 */
export function Numero02({ x, y, tamanho = 1 }) {
  return (
    <Numero x={x} y={y} tamanho={tamanho}>
      <g transform="translate(347.79 253.27)">
        <path d="M313.34 218.47c-2.02 0-3.83-.53-5.43-1.6s-2.86-2.54-3.76-4.43c-.91-1.88-1.36-4.05-1.36-6.51s.45-4.61 1.35-6.47c.9-1.86 2.14-3.32 3.73-4.38 1.59-1.06 3.38-1.58 5.38-1.58s3.87.53 5.47 1.58c1.6 1.06 2.85 2.52 3.75 4.39.9 1.87 1.35 4.04 1.35 6.49s-.45 4.65-1.35 6.52c-.9 1.87-2.14 3.34-3.73 4.39-1.59 1.06-3.38 1.58-5.38 1.58Zm-.03-5.31c.91 0 1.69-.27 2.35-.8.66-.53 1.16-1.35 1.52-2.44s.53-2.41.53-3.95-.18-2.82-.53-3.9c-.35-1.08-.86-1.89-1.52-2.44s-1.45-.82-2.38-.82-1.69.27-2.35.8c-.66.53-1.16 1.33-1.52 2.4-.35 1.07-.53 2.37-.53 3.92s.18 2.86.53 3.95c.35 1.09.86 1.91 1.52 2.45.66.54 1.45.82 2.38.82ZM325.47 214.72l9.47-9.64c.45-.45.83-.89 1.12-1.29.29-.41.5-.79.63-1.14.12-.35.19-.72.19-1.11 0-.86-.28-1.54-.83-2.04-.56-.5-1.29-.75-2.2-.75s-1.65.24-2.35.73c-.7.49-1.42 1.3-2.15 2.44l-4.05-3.54c.98-1.61 2.23-2.83 3.76-3.65 1.53-.82 3.29-1.23 5.26-1.23 1.75 0 3.26.32 4.53.95 1.27.64 2.25 1.53 2.95 2.69.69 1.16 1.04 2.54 1.04 4.16 0 .95-.12 1.83-.37 2.64s-.65 1.6-1.19 2.38-1.27 1.61-2.18 2.47l-6.23 6.1-7.39-.17Zm0 3.34v-3.34l5.11-1.74h12.74v5.08h-17.85Z" />
      </g>
    </Numero>
  );
}

/**
 * A placa do 03. Mesmo caso do `02`: o `d` veio de OUTRO canvas do editor
 * vetorial — os dois glifos (o `0` de 21,03 por 24,97 e o `3` de 18,09 por
 * 24,57, o par inteiro em (1031,71 125,77), medindo 40,38 por 24,97) ficam
 * longe do prato, cujo centro é (671,19 458,49). Sem o `translate` a placa
 * renderiza vazia.
 *
 * O `translate` abaixo leva o MEIO do par para o MEIO do prato, no mesmo lugar
 * em que o par do `01` fica: 670,84 − 1051,90 = −381,06 e 459,25 − 138,25 = 321.
 * O `<g fill="#231f20">` que veio junto era redundante — a classe `.algarismo`
 * do `<Numero>` já pinta o algarismo — e saiu.
 */
export function Numero03({ x, y, tamanho = 1 }) {
  return (
    <Numero x={x} y={y} tamanho={tamanho}>
      <g transform="translate(-381.06 321)">
        <path d="M1042.26 150.74c-2.02 0-3.83-.53-5.43-1.6s-2.86-2.54-3.76-4.43c-.91-1.88-1.36-4.05-1.36-6.51s.45-4.61 1.35-6.47c.9-1.86 2.14-3.32 3.73-4.38 1.59-1.06 3.38-1.58 5.38-1.58s3.87.53 5.47 1.58c1.6 1.06 2.85 2.52 3.75 4.39.9 1.87 1.35 4.04 1.35 6.49s-.45 4.65-1.35 6.52c-.9 1.87-2.14 3.34-3.73 4.39-1.59 1.06-3.38 1.58-5.38 1.58Zm-.03-5.31c.91 0 1.69-.27 2.35-.8.66-.53 1.16-1.35 1.52-2.44s.53-2.41.53-3.95-.18-2.82-.53-3.9c-.35-1.08-.86-1.89-1.52-2.44s-1.45-.82-2.38-.82-1.69.27-2.35.8c-.66.53-1.16 1.33-1.52 2.4-.35 1.07-.53 2.37-.53 3.92s.18 2.86.53 3.95c.35 1.09.86 1.91 1.52 2.45.66.54 1.45.82 2.38.82ZM1062.35 150.74c-1.7 0-3.28-.3-4.72-.89-1.44-.59-2.65-1.42-3.63-2.49l3.88-3.82c.41.59 1.02 1.07 1.82 1.45.81.38 1.65.56 2.54.56.75 0 1.41-.13 1.99-.39.58-.26 1.03-.63 1.35-1.12.32-.49.48-1.07.48-1.75s-.17-1.26-.49-1.74c-.33-.48-.81-.85-1.43-1.11-.62-.26-1.38-.39-2.27-.39-.43 0-.9.03-1.4.08-.5.06-.89.14-1.16.26l2.66-3.34c.7-.18 1.36-.33 1.98-.46.61-.12 1.16-.19 1.64-.19 1.23 0 2.33.28 3.3.85.98.57 1.75 1.38 2.33 2.44.58 1.06.87 2.31.87 3.76 0 1.63-.4 3.08-1.21 4.33-.81 1.25-1.94 2.22-3.41 2.91-1.46.69-3.17 1.04-5.13 1.04Zm-6.71-19.49v-5.08h15.91v3.34l-4.6 1.74h-11.31Zm3.68 8.14v-3.3l5.59-6.61 6.64.03-5.83 6.54-6.4 3.34Z"
        />
      </g>
    </Numero>
  );
}


/**
 * A placa do 04. Mesmo caso do `02` e do `03`: o `d` veio de OUTRO canvas do
 * editor vetorial — os dois glifos (o `0` de 21,03 por 24,97 e o `4` de 19,66
 * por 24,16, o par inteiro em (95,64 131,13), medindo 42,17 por 24,97) ficam
 * longe do prato, cujo centro é (671,19 458,49). Sem o `translate` a placa
 * renderiza vazia.
 *
 * O `translate` abaixo leva o MEIO do par para o MEIO do prato, no mesmo lugar
 * em que o par do `01` fica: 670,84 − 116,72 = 554,12 e 459,25 − 143,62 = 315,63.
 * O `<g fill="#231f20">` que veio junto era redundante — a classe `.algarismo`
 * do `<Numero>` já pinta o algarismo — e saiu.
 */
export function Numero04({ x, y, tamanho = 1 }) {
  return (
    <Numero x={x} y={y} tamanho={tamanho}>
      <g transform="translate(554.12 315.63)">
        <path d="M106.19 156.1c-2.02 0-3.83-.53-5.43-1.6s-2.86-2.54-3.76-4.43c-.91-1.88-1.36-4.05-1.36-6.51s.45-4.61 1.35-6.47c.9-1.86 2.14-3.32 3.73-4.38 1.59-1.06 3.38-1.58 5.38-1.58s3.87.53 5.47 1.58c1.6 1.06 2.85 2.52 3.75 4.39.9 1.87 1.35 4.04 1.35 6.49s-.45 4.65-1.35 6.52c-.9 1.87-2.14 3.34-3.73 4.39-1.59 1.06-3.38 1.58-5.38 1.58Zm-.03-5.31c.91 0 1.69-.27 2.35-.8.66-.53 1.16-1.35 1.52-2.44s.53-2.41.53-3.95-.18-2.82-.53-3.9c-.35-1.08-.86-1.89-1.52-2.44s-1.45-.82-2.38-.82-1.69.27-2.35.8c-.66.53-1.16 1.33-1.52 2.4-.35 1.07-.53 2.37-.53 3.92s.18 2.86.53 3.95c.35 1.09.86 1.91 1.52 2.45.66.54 1.45.82 2.38.82ZM118.15 147.42l7.6-15.88h6.54l-7.77 15.88h-6.37Zm0 3.34v-3.34l1.81-1.74h17.85v5.08h-19.66Zm11.38 4.94v-14.51h5.93v14.51h-5.93Z"
        />
      </g>
    </Numero>
  );
}

/**
 * A placa do 05. Mesmo caso dos `02`, `03` e `04`: o `d` veio de OUTRO canvas do
 * editor vetorial — os dois glifos (o `0` de 21,02 por 24,97 e o `5` de 18,24
 * por 24,56, o par inteiro em (1083,20 256,62), medindo 40,41 por 24,97) ficam
 * longe do prato, cujo centro é (671,19 458,49). Sem o `translate` a placa
 * renderiza vazia.
 *
 * O `translate` abaixo leva o MEIO do par para o MEIO do prato, no mesmo lugar
 * em que o par do `01` fica: 670,84 − 1103,40 = −432,56 e 459,25 − 269,11 =
 * 190,14. O `<g fill="#231f20">` que veio junto era redundante — a classe
 * `.algarismo` do `<Numero>` já pinta o algarismo — e saiu.
 */
export function Numero05({ x, y, tamanho = 1 }) {
  return (
    <Numero x={x} y={y} tamanho={tamanho}>
      <g transform="translate(-432.56 190.14)">
        <path d="M1093.75 281.59c-2.02 0-3.83-.53-5.43-1.6-1.6-1.07-2.86-2.54-3.76-4.43-.91-1.88-1.36-4.05-1.36-6.51s.45-4.61 1.34-6.47c.9-1.86 2.14-3.32 3.73-4.38 1.59-1.06 3.38-1.58 5.38-1.58s3.87.53 5.47 1.58c1.6 1.06 2.85 2.52 3.75 4.39.9 1.87 1.35 4.04 1.35 6.49s-.45 4.65-1.35 6.52c-.9 1.87-2.14 3.34-3.73 4.39-1.59 1.06-3.38 1.58-5.38 1.58Zm-.03-5.31c.91 0 1.69-.27 2.35-.8.66-.53 1.16-1.35 1.52-2.44.35-1.09.53-2.41.53-3.95s-.18-2.82-.53-3.9c-.35-1.08-.86-1.89-1.52-2.44s-1.45-.82-2.38-.82-1.69.27-2.35.8c-.66.53-1.16 1.33-1.52 2.4-.35 1.07-.53 2.37-.53 3.92s.17 2.86.53 3.95.86 1.91 1.52 2.45c.66.54 1.45.82 2.38.82ZM1113.85 281.59c-1.64 0-3.21-.3-4.72-.89-1.51-.59-2.76-1.42-3.76-2.49l3.92-3.82c.41.59 1.02 1.07 1.82 1.45.81.38 1.65.56 2.54.56.79 0 1.48-.14 2.06-.41s1.03-.68 1.36-1.21c.33-.53.49-1.14.49-1.82s-.17-1.32-.49-1.84-.8-.93-1.41-1.23c-.61-.29-1.35-.44-2.21-.44-.77 0-1.49.11-2.15.34-.66.23-1.24.52-1.74.89l.58-3.88c.61-.39 1.16-.7 1.64-.94s.98-.41 1.52-.53c.53-.11 1.16-.17 1.89-.17 1.84 0 3.38.36 4.62 1.09 1.24.73 2.18 1.7 2.83 2.93.65 1.23.97 2.57.97 4.02 0 1.61-.4 3.05-1.21 4.33-.81 1.27-1.92 2.26-3.36 2.98-1.43.71-3.16 1.07-5.18 1.07Zm-4.29-10.9-2.38-2.18 1.19-11.48h5.45l-1.26 11.11-3 2.55Zm-.48-8.58-.71-5.08h13.9v5.08h-13.18Z"
        />
      </g>
    </Numero>
  );
}



/**
 * A placa do 06. Mesmo caso dos `02` a `05`: o `d` veio de OUTRO canvas do
 * editor vetorial — os dois glifos (o `0` de 21,06 por 24,97 e o `6` de 18,41
 * por 24,56, o par inteiro em (37,74 68,29), medindo 41,07 por 24,97) ficam
 * longe do prato, cujo centro é (671,19 458,49). Sem o `translate` a placa
 * renderiza vazia.
 *
 * O `translate` abaixo leva o MEIO do par para o MEIO do prato, no mesmo lugar
 * em que o par do `01` fica: 670,84 − 58,28 = 612,57 e 459,25 − 80,78 = 378,48.
 * O `<g fill="#231f20">` que veio junto era redundante — a classe `.algarismo`
 * do `<Numero>` já pinta o algarismo — e saiu.
 */
export function Numero06({ x, y, tamanho = 1 }) {
  return (
    <Numero x={x} y={y} tamanho={tamanho}>
      <g transform="translate(612.57 378.48)">
        <path
          d="M48.31 93.26c-2.02 0-3.84-.53-5.44-1.6s-2.86-2.54-3.77-4.43c-.91-1.88-1.36-4.05-1.36-6.51s.45-4.61 1.35-6.47c.9-1.86 2.14-3.32 3.74-4.38 1.59-1.06 3.39-1.58 5.39-1.58s3.87.53 5.48 1.58c1.6 1.06 2.85 2.52 3.75 4.39.9 1.87 1.35 4.04 1.35 6.49s-.45 4.65-1.35 6.52c-.9 1.87-2.14 3.34-3.74 4.39-1.59 1.06-3.39 1.58-5.39 1.58Zm-.03-5.31c.91 0 1.69-.27 2.35-.8.66-.53 1.17-1.35 1.52-2.44.35-1.09.53-2.41.53-3.95s-.18-2.82-.53-3.9c-.35-1.08-.86-1.89-1.52-2.44s-1.46-.82-2.39-.82-1.69.27-2.35.8c-.66.53-1.17 1.33-1.52 2.4-.35 1.07-.53 2.37-.53 3.92s.18 2.86.53 3.95c.35 1.09.86 1.91 1.52 2.45.66.54 1.46.82 2.39.82ZM69.57 93.26c-1.73 0-3.29-.38-4.67-1.12-1.39-.75-2.49-1.76-3.29-3.03-.81-1.27-1.21-2.7-1.21-4.29 0-1.98.68-3.97 2.05-6l6.93-10.12h6.86l-7.88 10.9-2.25-.24c.34-.54.69-1.02 1.04-1.41s.8-.71 1.33-.94c.53-.23 1.21-.34 2.03-.34 1.55 0 2.94.36 4.18 1.07a8.39 8.39 0 0 1 2.99 2.9c.75 1.21 1.13 2.58 1.13 4.1s-.4 3.03-1.21 4.33a8.76 8.76 0 0 1-3.29 3.07c-1.39.75-2.96 1.12-4.71 1.12Zm0-5.18c.64 0 1.21-.15 1.71-.46.5-.31.9-.72 1.19-1.24.3-.52.44-1.11.44-1.77s-.15-1.25-.44-1.77c-.3-.52-.69-.93-1.19-1.23-.5-.29-1.07-.44-1.71-.44s-1.21.15-1.71.44c-.5.29-.89.7-1.18 1.23-.28.52-.43 1.11-.43 1.77s.14 1.26.43 1.79c.28.53.68.95 1.18 1.24.5.29 1.07.44 1.71.44Z"
        />
      </g>
    </Numero>
  );
}

/**
 * A placa do 07. Mesmo caso dos `02` a `06`: o `d` veio de OUTRO canvas do
 * editor vetorial — os dois glifos (o `0` de 21,06 por 24,97 e o `7` de 17,01
 * por 24,16, o par inteiro em (308,63 215,43), medindo 38,77 por 24,97) ficam
 * longe do prato, cujo centro é (671,19 458,49). Sem o `translate` a placa
 * renderiza vazia.
 *
 * O `translate` abaixo leva o MEIO do par para o MEIO do prato, no mesmo lugar
 * em que o par do `01` fica: 670,84 − 328,02 = 342,83 e 459,25 − 227,92 = 231,33.
 * O `<g fill="#231f20">` que veio junto era redundante — a classe `.algarismo`
 * do `<Numero>` já pinta o algarismo — e saiu.
 */
export function Numero07({ x, y, tamanho = 1 }) {
  return (
    <Numero x={x} y={y} tamanho={tamanho}>
      <g transform="translate(342.83 231.33)">
        <path
          d="M319.2 240.4c-2.02 0-3.84-.53-5.44-1.6-1.6-1.07-2.86-2.54-3.77-4.43-.91-1.88-1.36-4.05-1.36-6.51s.45-4.61 1.35-6.47c.9-1.86 2.14-3.32 3.74-4.38 1.59-1.06 3.39-1.58 5.39-1.58s3.87.53 5.48 1.58c1.6 1.05 2.85 2.52 3.75 4.39.9 1.87 1.35 4.04 1.35 6.49s-.45 4.65-1.35 6.52c-.9 1.87-2.14 3.34-3.74 4.39-1.59 1.06-3.39 1.58-5.39 1.58Zm-.03-5.31c.91 0 1.69-.27 2.35-.8.66-.53 1.17-1.35 1.52-2.44.35-1.09.53-2.41.53-3.95s-.18-2.82-.53-3.9c-.35-1.08-.86-1.89-1.52-2.44-.66-.54-1.46-.82-2.39-.82s-1.69.27-2.35.8c-.66.54-1.17 1.33-1.52 2.4-.35 1.07-.53 2.37-.53 3.92s.18 2.86.53 3.95c.35 1.09.86 1.91 1.52 2.45.66.54 1.46.82 2.39.82ZM330.4 220.92v-5.08h16.99v3.34l-1.88 1.74h-15.12Zm3.14 19.08 7.92-20.81h5.94L339.82 240h-6.28Z"
        />
      </g>
    </Numero>
  );
}

/**
 * A placa do 08. Mesmo caso dos `02` a `07`: o `d` veio de OUTRO canvas do
 * editor vetorial — os dois glifos (o `0` de 21,03 por 24,97 e o `8` de 17,76
 * por 24,97, o par inteiro em (1107,21 53,89), medindo 40,51 por 24,97) ficam
 * longe do prato, cujo centro é (671,19 458,49). Sem o `translate` a placa
 * renderiza vazia. (O `translate` do `07` que veio junto NÃO serve aqui — cada
 * par vem de um canvas com coordenadas próprias.)
 *
 * O `translate` abaixo leva o MEIO do par para o MEIO do prato, no mesmo lugar
 * em que o par do `01` fica: 670,84 − 1107,21 = −436,37 e 459,25 − 53,89 = 405,36.
 * O `fill="#231f20"` que veio junto era redundante — a classe `.algarismo` do
 * `<Numero>` já pinta o algarismo — e saiu.
 */
export function Numero08({ x, y, tamanho = 1 }) {
  return (
    <Numero x={x} y={y} tamanho={tamanho}>
      <g transform="translate(-436.37 405.36)">
        <path
          d="M1097.5 66.37c-2.02 0-3.83-.53-5.43-1.6s-2.86-2.54-3.76-4.43c-.91-1.88-1.36-4.05-1.36-6.51s.45-4.61 1.35-6.47c.9-1.86 2.14-3.32 3.73-4.38 1.59-1.06 3.38-1.58 5.38-1.58s3.87.53 5.47 1.58c1.6 1.06 2.85 2.52 3.75 4.39.9 1.87 1.35 4.04 1.35 6.49s-.45 4.65-1.35 6.52c-.9 1.87-2.14 3.34-3.73 4.39-1.59 1.06-3.38 1.58-5.38 1.58Zm-.03-5.31c.91 0 1.69-.27 2.35-.8.66-.53 1.16-1.35 1.52-2.44s.53-2.41.53-3.95-.18-2.82-.53-3.9c-.35-1.08-.86-1.89-1.52-2.44s-1.45-.82-2.38-.82-1.69.27-2.35.8c-.66.53-1.16 1.33-1.52 2.4-.35 1.07-.53 2.37-.53 3.92s.18 2.86.53 3.95c.35 1.09.86 1.91 1.52 2.45.66.54 1.45.82 2.38.82ZM1118.59 66.37c-1.82 0-3.38-.31-4.7-.94-1.32-.62-2.34-1.47-3.08-2.54-.74-1.07-1.11-2.29-1.11-3.68 0-1.16.23-2.2.68-3.13.45-.93 1.08-1.7 1.89-2.3.81-.6 1.73-1 2.78-1.21l-.1 1.12c-.91-.18-1.69-.55-2.33-1.11a5.477 5.477 0 0 1-1.48-2.04c-.34-.81-.51-1.64-.51-2.5 0-1.27.33-2.41 1-3.42.67-1.01 1.61-1.8 2.81-2.37 1.2-.57 2.59-.85 4.16-.85s2.94.28 4.12.85c1.18.57 2.11 1.36 2.78 2.37.67 1.01 1 2.15 1 3.42 0 .86-.17 1.7-.49 2.5-.33.81-.82 1.49-1.46 2.04-.65.56-1.43.92-2.33 1.11l-.14-1.12c1.07.2 2 .61 2.81 1.21s1.44 1.37 1.89 2.3c.45.93.68 1.98.68 3.13 0 1.39-.37 2.61-1.11 3.68-.74 1.07-1.77 1.91-3.1 2.54-1.33.62-2.88.94-4.65.94Zm0-5.08c.57 0 1.09-.13 1.57-.39s.85-.62 1.11-1.07c.26-.45.39-.96.39-1.53s-.13-1.03-.39-1.46a2.86 2.86 0 0 0-1.11-1.04c-.48-.26-1-.39-1.57-.39-.61 0-1.15.13-1.62.39-.47.26-.83.61-1.09 1.04-.26.43-.39.92-.39 1.46s.13 1.08.39 1.53c.26.46.63.81 1.11 1.07.48.26 1.01.39 1.6.39Zm0-10.22c.68 0 1.24-.21 1.67-.65.43-.43.65-.98.65-1.64 0-.7-.22-1.28-.65-1.74-.43-.45-.99-.68-1.67-.68s-1.28.22-1.72.65c-.44.43-.66 1-.66 1.7 0 .66.22 1.22.66 1.67s1.02.68 1.72.68Z"></path>
      </g>
    </Numero>
  );
}


/**
 * A placa do 09. Mesmo caso dos `02` a `08`: o `d` veio de OUTRO canvas do
 * editor vetorial — os dois glifos (o `0` de 21,03 por 24,97 e o `9` de 18,33
 * por 24,56, o par inteiro em (87,04 251,85), medindo 40,94 por 24,97) ficam
 * longe do prato, cujo centro é (671,19 458,49). Sem o `translate` a placa
 * renderiza vazia.
 *
 * O `translate` abaixo leva o MEIO do par para o MEIO do prato, no mesmo lugar
 * em que o par do `01` fica: 670,84 − 87,04 = 583,80 e 459,25 − 251,85 = 207,40.
 * O `fill="#231f20"` e a indentação de sete espaços que vieram junto saíram.
 */
export function Numero09({ x, y, tamanho = 1 }) {
  return (
    <Numero x={x} y={y} tamanho={tamanho}>
      <g transform="translate(583.8 207.4)">
        <path
          d="M77.12 264.34c-2.02 0-3.83-.53-5.43-1.6s-2.86-2.54-3.76-4.43c-.91-1.88-1.36-4.05-1.36-6.51s.45-4.61 1.35-6.47c.9-1.86 2.14-3.32 3.73-4.38 1.59-1.06 3.38-1.58 5.38-1.58s3.87.53 5.47 1.58c1.6 1.06 2.85 2.52 3.75 4.39.9 1.87 1.35 4.04 1.35 6.49s-.45 4.65-1.35 6.52c-.9 1.87-2.14 3.34-3.73 4.39-1.59 1.06-3.38 1.58-5.38 1.58Zm-.04-5.32c.91 0 1.69-.27 2.35-.8.66-.53 1.16-1.35 1.52-2.44s.53-2.41.53-3.95-.18-2.82-.53-3.9c-.35-1.08-.86-1.89-1.52-2.44s-1.45-.82-2.38-.82-1.69.27-2.35.8c-.66.53-1.16 1.33-1.52 2.4-.35 1.07-.53 2.37-.53 3.92s.18 2.86.53 3.95c.35 1.09.86 1.91 1.52 2.45.66.54 1.45.82 2.38.82ZM91.7 263.93l7.9-10.9 2.21.24c-.34.54-.69 1.02-1.04 1.41-.35.4-.78.71-1.29.94-.51.23-1.2.34-2.06.34-1.52 0-2.9-.36-4.14-1.09a8.533 8.533 0 0 1-2.98-2.9c-.75-1.2-1.12-2.58-1.12-4.12s.4-3.03 1.21-4.31c.81-1.28 1.9-2.3 3.29-3.05 1.39-.75 2.94-1.12 4.67-1.12s3.31.37 4.68 1.12c1.37.75 2.46 1.76 3.27 3.03.81 1.27 1.21 2.7 1.21 4.29 0 1.98-.68 3.97-2.04 6l-6.92 10.12H91.7Zm6.64-12.47c.64 0 1.21-.15 1.72-.44.51-.29.9-.7 1.18-1.23s.41-1.11.41-1.77-.14-1.25-.41-1.79c-.27-.53-.66-.95-1.18-1.24-.51-.29-1.08-.44-1.72-.44s-1.2.15-1.7.46c-.5.31-.89.72-1.18 1.24-.28.52-.43 1.11-.43 1.77s.14 1.25.43 1.77c.28.52.68.93 1.18 1.23.5.3 1.07.44 1.7.44Z"></path>
      </g>
    </Numero>
  );
}


/**
 * A placa do 10 — a única de DOIS algarismos distintos (`1` e `0`), com o `1`
 * vindo primeiro no `d`. Mesmo caso dos outros: o `d` veio de OUTRO canvas do
 * editor vetorial — os dois glifos (o `1` de 10,63 por 24,15 e o `0` de 21,03
 * por 24,97, o par inteiro em (90,59 124,82), medindo 34,70 por 24,97) ficam
 * longe do prato, cujo centro é (671,19 458,49). Repare que o par é mais estreito
 * que os de um dígito só (34,70 contra ~40,5): os algarismos do `10` são mais
 * magros de desenho, não é erro de centralização.
 *
 * O `translate` abaixo leva o MEIO do par para o MEIO do prato, no mesmo lugar
 * em que o par do `01` fica: 670,84 − 90,59 = 580,25 e 459,25 − 124,82 = 334,43.
 * O `fill="#231f20"` que veio junto era redundante — a classe `.algarismo` do
 * `<Numero>` já pinta o algarismo — e saiu.
 */
export function Numero10({ x, y, tamanho = 1 }) {
  return (
    <Numero x={x} y={y} tamanho={tamanho}>
      <g transform="translate(580.25 334.43)">
        <path
          d="M73.24 117.82v-5.08h10.29v5.08H73.24Zm4.6 19.07v-24.15h6.03v24.15h-6.03ZM97.46 137.3c-2.02 0-3.83-.53-5.43-1.6s-2.86-2.54-3.76-4.43c-.91-1.88-1.36-4.05-1.36-6.51s.45-4.61 1.35-6.47c.9-1.86 2.14-3.32 3.73-4.38 1.59-1.06 3.38-1.58 5.38-1.58s3.87.53 5.47 1.58c1.6 1.06 2.85 2.52 3.75 4.39.9 1.87 1.35 4.04 1.35 6.49s-.45 4.65-1.35 6.52c-.9 1.87-2.14 3.34-3.73 4.39-1.59 1.06-3.38 1.58-5.38 1.58Zm-.03-5.31c.91 0 1.69-.27 2.35-.8.66-.53 1.16-1.35 1.52-2.44s.53-2.41.53-3.95-.18-2.82-.53-3.9c-.35-1.08-.86-1.89-1.52-2.44s-1.45-.82-2.38-.82-1.69.27-2.35.8c-.66.53-1.16 1.33-1.52 2.4-.35 1.07-.53 2.37-.53 3.92s.18 2.86.53 3.95c.35 1.09.86 1.91 1.52 2.45.66.54 1.45.82 2.38.82Z"></path>
      </g>
    </Numero>
  );
}