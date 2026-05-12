import tokesTypes from "./tokesTypes.js";

function gerarExpressao(no){
        switch(no.type){
            case tokesTypes.NULL:
                return null;
            case tokesTypes.NUMERO:
                return String(no.valor);
            case tokesTypes.STRING:
                return `"${no.valor}"`;
            case tokesTypes.NOME_VAR:
                return no.valor;
            case 'BinOp':
                return `(${gerarExpressao(no.esquerda)} ${no.operador} ${gerarExpressao(no.direita)})`;
            default:
                throw new Error(`Expressão desconhecida: '${no.type}'`);
        }
}

function gerarFun(no){
    switch(no.type){
        case 'varDecl':
            if(no.valor.valor === undefined){
                return `var ${no.nome};`
            }else if(no.nome.length > 1){
                no.nome.forEach(n => {
                    
                });
                
            }else{
                return `var ${no.nome} = ${gerarExpressao(no.valor)};`;
            }
        case 'mostrar':
            return `console.log(${gerarExpressao(no.valor)});`;
        case 'varAtb':
            return `${no.nome} = ${gerarExpressao(no.valor)};`;
        case 'leia': 
            return `${no.nome} = prompt("");`;
        default: 
         throw new Error(`Nó desconhecido: '${no.type}'`);
    }
}

function geradorJs(noStr){
    return noStr.body.map((no) => gerarFun(no)).join('\n');
}

export default geradorJs;