const validarTipoUrl = new URL("./validarTipo.js", import.meta.url).href;

export class ErroDeTraducao extends Error {
  constructor(caractere, linha, mensagem) {
    super(
      mensagem ??
        `A linguagem da Trilha ainda não conhece o caractere ${JSON.stringify(caractere)} (linha ${linha}).`,
    );

    this.name = "ErroDeTraducao";
  }
}

const INICIO_IDENTIFICADOR = /[A-Za-zÀ-ÖØ-öø-ÿ_$]/;
const PARTE_IDENTIFICADOR = /[A-Za-zÀ-ÖØ-öø-ÿ0-9_$]/;
const IDENTIFICADOR_COMPLETO = /[A-Za-zÀ-ÖØ-öø-ÿ0-9_$."']/;

async function traduzir(code, entradas = []) {
  let i = 0;

  let novoCode = "";

  if (entradas.length === 0) {
    novoCode += String.raw`
    import { createInterface } from 'node:readline/promises';
    import { validarTipoVariavel } from ${JSON.stringify(validarTipoUrl)};
    async function main(){
    const leitor = createInterface({ input: process.stdin, output: process.stdout });
    `;
  } else {
    novoCode += String.raw`
    import { validarTipoVariavel } from ${JSON.stringify(validarTipoUrl)};
    async function main(){
    const entradas = [${entradas}];
    let indiceEntrada = 0;
    `;
  }

  const var_tipo = {};

  while (i < code.length) {
    let char = code[i];

    // TAB e o "\r" de arquivo com CRLF são espaço em branco: não geram código
    if (char === " " || char === "\t" || char === "\r") {
      i++;
      continue;
    }

    if (char === "\n") {
      novoCode += char;
      i++;
      continue;
    }

    /* Comentário vai inteiro para o código, sem o tradutor olhar o que tem dentro
           (acento, underline, dois-pontos... tudo é texto do aluno). */
    if (char === "/" && code[i + 1] === "/") {
      while (i < code.length && code[i] !== "\n") {
        novoCode += code[i];
        i++;
      }

      continue;
    }

    if (char === "/" && code[i + 1] === "*") {
      while (i < code.length && !(code[i] === "*" && code[i + 1] === "/")) {
        novoCode += code[i];
        i++;
      }

      // Fecha o comentário, se ele foi fechado
      if (i < code.length) {
        novoCode += "*/";
        i += 2;
      }

      continue;
    }

    if (INICIO_IDENTIFICADOR.test(char)) {
      let value = "";

      while (PARTE_IDENTIFICADOR.test(code[i])) {
        value += code[i];
        i++;
      }

      switch (value) {
        case "inteiro":
          novoCode += "let";
          if (code[i] === " ") {
          novoCode += " ";
            i++;
            while (code[i] !== "\n" && code[i] !== ";") {
              let varInt = "";
              let varValue = "";

              while (/ /.test(code[i])) {
                i++;
              }

              if (INICIO_IDENTIFICADOR.test(code[i])) {
                while (PARTE_IDENTIFICADOR.test(code[i])) {
                  varInt += code[i];
                  i++;
                }

                var_tipo[varInt] = "int";
                novoCode += `${varInt}`;

                while (/ /.test(code[i])) {
                  i++;
                }

                if (code[i] === "=") {
                  i++;

                  while (/ /.test(code[i])) {
                    i++;
                  }

                  if(IDENTIFICADOR_COMPLETO.test(code[i])){
                    while(IDENTIFICADOR_COMPLETO.test(code[i])) {
                    varValue += code[i];
                    i++;
                    }
                    novoCode += String.raw` = validarTipoVariavel(${varValue}, "${varInt}", "int")`;
                    while (/ /.test(code[i])) {
                    i++;
                    }
                  }
                }

                if(code[i] === ","){
                  novoCode += ",";
                  i++;
                }
              }
            }

          }
          break;
        case "decimal":
           novoCode += "let";
          if (code[i] === " ") {
          novoCode += " ";
            i++;
            while (code[i] !== "\n" && code[i] !== ";") {
              let varInt = "";
              let varValue = "";

              while (/ /.test(code[i])) {
                i++;
              }

              if (INICIO_IDENTIFICADOR.test(code[i])) {
                while (PARTE_IDENTIFICADOR.test(code[i])) {
                  varInt += code[i];
                  i++;
                }

                var_tipo[varInt] = "float";
                novoCode += `${varInt}`;

                while (/ /.test(code[i])) {
                  i++;
                }

                if (code[i] === "=") {
                  i++;

                  while (/ /.test(code[i])) {
                    i++;
                  }

                  if(IDENTIFICADOR_COMPLETO.test(code[i])){
                    while(IDENTIFICADOR_COMPLETO.test(code[i])) {
                    varValue += code[i];
                    i++;
                    }
                    novoCode += String.raw` = validarTipoVariavel(${varValue}, "${varInt}", "float")`;
                    while (/ /.test(code[i])) {
                    i++;
                    }
                  }
                }

                if(code[i] === ","){
                  novoCode += ",";
                  i++;
                }
              }
            }

          }
          break;
        case "texto":
           novoCode += "let";
          if (code[i] === " ") {
          novoCode += " ";
            i++;
            while (code[i] !== "\n" && code[i] !== ";") {
              let varInt = "";
              let varValue = "";

              while (/ /.test(code[i])) {
                i++;
              }

              if (INICIO_IDENTIFICADOR.test(code[i])) {
                while (PARTE_IDENTIFICADOR.test(code[i])) {
                  varInt += code[i];
                  i++;
                }

                var_tipo[varInt] = "string";
                novoCode += `${varInt}`;

                while (/ /.test(code[i])) {
                  i++;
                }

                if (code[i] === "=") {
                  i++;

                  while (/ /.test(code[i])) {
                    i++;
                  }

                  if(IDENTIFICADOR_COMPLETO.test(code[i])){
                    while(IDENTIFICADOR_COMPLETO.test(code[i])) {
                    varValue += code[i];
                    i++;
                    }
                    novoCode += String.raw` = validarTipoVariavel(${varValue}, "${varInt}", "string")`;
                    while (/ /.test(code[i])) {
                    i++;
                    }
                  }
                }

                if(code[i] === ","){
                  novoCode += ",";
                  i++;
                }
              }
            }

          }

        break;
        case "variavel":
          novoCode += "var";
          if (code[i] === " ") {
            novoCode += " ";
            i++;
          }
          break;
        case "mostrar":
        case "imprimir":
        case "exibir":
          novoCode += "console.log";
          break;
        case "leia": {
          let variavel = "";
          if (code[i] === "(") {
            i++;
            while (PARTE_IDENTIFICADOR.test(code[i])) {
              variavel += code[i];
              i++;
            }

            if (code[i] === ")") {
              let tipoVar = var_tipo[variavel] ?? "variavel";

              if(tipoVar === "variavel"){
                novoCode += String.raw`
${variavel} = await leitor.question("");
                `;
              }else{
                             if (entradas.length === 0) {
                novoCode += String.raw`
${variavel} = await leitor.question("");
${variavel} = validarTipoVariavel(${variavel}, "${variavel}", "${tipoVar}");
`;
              } else {
                novoCode += String.raw`
${variavel} = entradas[indiceEntrada];
${variavel} = validarTipoVariavel(${variavel}, "${variavel}", "${tipoVar}");
indiceEntrada++;
`;
              }
              }
 
              i++;
              if (code[i] === ";") {
                i++;
              }
            }
          }

          break;
        }
        case "funcao":
        case "função":
          novoCode += "function";
          if (code[i] === " ") {
            novoCode += " ";
            i++;
          }
          break;
        // Condicionais
        case "se":
          novoCode += "if";
          break;
        case "senao":
        case "senão":
          novoCode += "else";
          break;

        // Laços
        case "enquanto":
          novoCode += "while";
          break;
        case "para":
          novoCode += "for";
          break;

        // Booleanos e null
        case "verdadeiro":
          novoCode += "true";
          break;
        case "falso":
          novoCode += "false";
          break;
        case "nulo":
          novoCode += "null";
          break;

        // Funções
        case "retornar":
          novoCode += "return";
          if (code[i] === " ") {
            novoCode += " ";
            i++;
          }
          break;

        // Declarações e POO
        case "classe":
          novoCode += "class";
          break;
        case "novo":
          novoCode += "new";
          break;
        case "isto":
          novoCode += "this";
          break;
        default:
          while (/ /.test(code[i])) {
            i++;
          }

          if (var_tipo.hasOwnProperty(value) && code[i] === "=") {
            let tipoVar = var_tipo[value];
            var value1 = "";
            i++;

            while (/ /.test(code[i])) {
              i++;
            }

            while (IDENTIFICADOR_COMPLETO.test(code[i])) {
              value1 += code[i];
              i++;
            }

            novoCode += String.raw`
              ${value} = validarTipoVariavel(${value1}, "${value}", "${tipoVar}")`;
          } else {
            novoCode += value;
          }

          break;
      }
      continue;
    }

    if (/[0-9]/.test(char)) {
      let value = "";

      while (/[0-9]/.test(code[i])) {
        value += code[i];
        i++;
      }

      if (INICIO_IDENTIFICADOR.test(code[i])) {
        let identificadorInvalido = value;

        while (PARTE_IDENTIFICADOR.test(code[i])) {
          identificadorInvalido += code[i];
          i++;
        }

        throw new ErroDeTraducao(
          identificadorInvalido,
          code.slice(0, i).split("\n").length,
          `O nome de variável ${JSON.stringify(identificadorInvalido)} não pode começar com número (linha ${code.slice(0, i).split("\n").length}).`,
        );
      }

      novoCode += value;
      continue;
    }

    if (char === '"' || char === "'") {
      let value = "";
      let aspa = char;
      value += aspa;
      i++;

      while (i < code.length && code[i] !== aspa) {
        value += code[i];
        i++;
      }

      if (code[i] === aspa) {
        value += aspa;
        i++;
      }

      novoCode += value;
      continue;
    }

    switch (char) {
      case ",":
        novoCode += char;
        i++;
        break;
      case ".":
        novoCode += char;
        i++;
        break;
      case ";":
        novoCode += char;
        i++;
        break;
      case "=":
        novoCode += char;
        i++;
        break;
      case "(":
        novoCode += char;
        i++;
        break;
      case ")":
        novoCode += char;
        i++;
        break;
      case "{":
        novoCode += char;
        i++;
        break;
      case "}":
        novoCode += char;
        i++;
        break;
      case "+":
        novoCode += char;
        i++;
        break;
      case "-":
        novoCode += char;
        i++;
        break;
      case "*":
        novoCode += char;
        i++;
        break;
      case "/":
        novoCode += char;
        i++;
        break;
      case "<":
        novoCode += char;
        i++;
        break;
      case ">":
        novoCode += char;
        i++;
        break;
      case "!":
        novoCode += char;
        i++;
        break;
      case "%":
        novoCode += char;
        i++;
        break;
      case "&":
        novoCode += char;
        i++;
        break;
      case "|":
        novoCode += char;
        i++;
        break;
      case "[":
        novoCode += char;
        i++;
        break;
      case "]":
        novoCode += char;
        i++;
        break;
      default:
        throw new ErroDeTraducao(char, code.slice(0, i).split("\n").length);
    }

    if (char === null) {
      novoCode += char;
      continue;
    }
  }

  if (entradas.length === 0) {
    novoCode += "\nleitor.close();}\nmain();";
  } else {
    novoCode += "}\nmain();";
  }

  // console.log(novoCode);
  // console.log("-----------------------------------");
  return novoCode;
}

// let c = traduzir (code);
// console.log(c);
// console.log("--------------------------------------------");

// let excultar = new Function(c);
// let res = excultar();

export default traduzir;
