
const code = `
variavel   v = 2;
variavel y;
leia(y) ;

se(y > v){
mostrar(v);
}
`;

function traduzir(code){
    let i = 0;
    let novoCode = ""; 

    while(i < code.length){
        let char = code[i];

        if(char === " "){
            i++;
            continue;
        }

        if(char === "\n" || char === "//"){
            novoCode += char;
            i++;
            continue;
        }

        if(/[a-zA-Z]/.test(char)){
            let value = "";

            while(/[a-zA-Z]/.test(code[i])){
                value += code[i];
                i++;
            }

            switch(value){
                case "variavel":
                novoCode += "var";
                if(code[i] === " "){
                    novoCode += " ";
                    i++;
                }
                   break;
                case "mostrar":
                novoCode += "console.log";
                     break;
                case "leia":
                    let variavel = "";
                    if(code[i] === "("){
                        i++;
                        while(/[\w$]/.test(code[i])){
                            variavel += code[i];
                            i++;
                        }

                        if(code[i] === ")"){
                        novoCode += String.raw`
                        ${variavel} = prompt("Digite");
                        if(/^[\d.]+$/.test(${variavel})){
                        ${variavel} = Number(${variavel});
                        }
                        `
                        i++;

                        if(code[i] === ";"){
                            i++;
                        }
                    }
                    }
                   
                    break;
                case "funcao":
                case "função":
                novoCode += "function";
                if(code[i] === " "){
                    novoCode += " ";
                    i++;
                }
                    break;
                // Condicionais
                case "se":
                novoCode += "if";
                    break;
                case "senao":
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
                if(code[i] === " "){
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
                    novoCode += value;    
            }
            continue;
        }

        if(/[0-9]/.test(char)){
            let value = "";

            while(/[0-9]/.test(code[i])){
                value += code[i];
                i++;
            }
            novoCode += value;
            continue;
        }

        if(char === '"' || char === "'"){
            let value = "";
            let aspa = char;
            value += aspa;
            i++;

            while(i < code.length && code[i] !== aspa){
                value += code[i];
                i++;
            }

            if(code[i] === aspa){
                value += aspa;
                i++;
            }

            novoCode += value;
            continue;
        }

        switch(char){
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
                alert("Operador não Encontrado!!");
        }

        if(char === null){
            novoCode += char
            continue;
        }
    }
        console.log(novoCode);
        console.log("-----------------------------------");
        return novoCode;
}

// let c = traduzir (code);
// console.log(c);
// console.log("--------------------------------------------");

// let excultar = new Function(c);
// let res = excultar();

export default traduzir;