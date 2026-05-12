import tokesTypes from "./tokesTypes.js";


function lexar(code){
    let tokens = [];
    let i = 0;

    while(i < code.length){
        let char = code[i];

        if(char === " " || char === "\n" || char === "//"){
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
                tokens.push({type: tokesTypes.VARIAVEL, value});
                   break;
                case "mostrar":
                tokens.push({type: tokesTypes.MOSTRAR, value});
                     break;
                case "leia":
                tokens.push({type:tokesTypes.LEIA, value});
                    break;
                default:
                    tokens.push({type: tokesTypes.NOME_VAR, value});
            }
            continue;
        }


        if(/[0-9]/.test(char)){
            let value = "";

            while(/[0-9]/.test(code[i])){
                value += code[i];
                i++;
            }

            tokens.push({type: tokesTypes.NUMERO, value, literal: Number(value)});
            continue;
        }

        if(char === '"' || char === "'"){
            let quote = char;
            let value = "";
            i++;

            while(i < code.length && code[i] !== quote){
                value += code[i];
                i++;
            }

            if(code[i] === quote){
                i++;
            }

            tokens.push({type: tokesTypes.STRING, value, literal: value});
            continue;
        }

        switch(char){
            case ",":
                tokens.push({type: tokesTypes.VIRGULA, value:","});
                i++;
                break;
            case ";":
              tokens.push({ type: tokesTypes.PONTO_VIRGULA, value: ";" });
              i++;
              break;
            case "=":
                tokens.push({ type: tokesTypes.IGUAL, value: "=" });
                i++;
                break;
            case "(":
                tokens.push({ type: tokesTypes.PARENTESE_ESQUERDO, value: "(" });
                i++;
                break;
            case ")":
                tokens.push({ type: tokesTypes.PARENTESE_DIREITO, value: ")" });
                i++;
                break;
            case "{":
                tokens.push({ type: tokesTypes.CHAVE_ESQUERDA, value: "{" });
                i++;
                break;
            case "}":
                tokens.push({ type: tokesTypes.CHAVE_DIREITA, value: "}" });
                i++;
                break;
            case "+":
                tokens.push({ type: tokesTypes.MAIS, value: "+" });
                i++;
                break;
            case "-":
                tokens.push({ type: tokesTypes.MENOS, value: "-" });
                i++;
                break;
            case "*":
                tokens.push({ type: tokesTypes.MULTIPLICACAO, value: "*" });
                i++;
                break;
            case "/":
                tokens.push({ type: tokesTypes.DIVISAO, value: "/" });
                i++;
                break;
        }

        if(char === null){
            tokesTypes.push({ type: tokesTypes.NULL, value: null });
            continue;
        }
    }


     tokens.push({ type: tokesTypes.EOF, value: null });
        return tokens;
}

export default lexar;