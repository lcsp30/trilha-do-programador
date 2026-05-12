import tokesTypes from "./tokesTypes.js";

function criarParser(tok){
    let  i = 0;

    function verToken(){
        return tok[i];
    }

    function proximoToken(){
        return tok[i++];
    }

    function verificarToken(type){
        return verToken().type === type;
    }

    function usarToken(type){
        if(!verificarToken(type)){
            let t = verToken();
            // throw new Error(
            //    `Esperava '${type}' mas encontrei '${tok?.type}' ("${tok?.value}") na posição ${i}`
            // );
            return null;
        }

        return proximoToken();
    }

    function expressao(){
        return adicao();
    }

    function adicao(){
        let esquerda = multiplicacao();

        while(verificarToken(tokesTypes.MAIS) || verificarToken(tokesTypes.MENOS)){
            let operador = proximoToken().value;
            let direita = multiplicacao();
            esquerda = {type: 'BinOp', esquerda, operador, direita};
        }

        return esquerda;
    }

    function multiplicacao(){
        let esquerda = primario();

        while(verificarToken(tokesTypes.MULTIPLICACAO) || verificarToken(tokesTypes.DIVISAO)){
            let operador = proximoToken().value;
            let direita = primario();
            esquerda = {type: 'BinOp', esquerda, operador, direita};
        }

        return esquerda;
    }

    function primario(){
        let t = verToken();

        if(verificarToken(tokesTypes.NUMERO)){
            proximoToken();
            return {type: tokesTypes.NUMERO , valor: t.literal}
        }

        if(verificarToken(tokesTypes.STRING)){
            proximoToken();
            return {type: tokesTypes.STRING, valor: t.literal}
        }

        if(verificarToken(tokesTypes.NOME_VAR)){
            proximoToken();
            return {type: tokesTypes.NOME_VAR, valor: t.value}
        }

        if(verificarToken(tokesTypes.NULL)){
            proximoToken();
            return{type: tokesTypes.NULL, valor: t.value}
        }

        if(verificarToken(tokesTypes.PARENTESE_ESQUERDO)){
        proximoToken(); // consome '('
        let expr = expressao(); // processa expressão dentro
        usarToken(tokesTypes.PARENTESE_DIREITO); // consome ')'
        return expr;
        }

        throw new Error(`Expressão desconhecida: '${t?.type}' ("${t?.value}")`);
    }

    function declaracaoVarialvel(){
        let nomeVar = [];
        let valor = [];

        usarToken(tokesTypes.VARIAVEL);
        nomeVar.push(usarToken(tokesTypes.NOME_VAR).value);

        if(verificarToken(tokesTypes.IGUAL)){
            usarToken(tokesTypes.IGUAL);
            valor.push(expressao());
        }

        if(verificarToken(tokesTypes.VIRGULA)){
            while(verificarToken(tokesTypes.VIRGULA)){
                usarToken(tokesTypes.VIRGULA);
                nomeVar.push(usarToken(tokesTypes.NOME_VAR).value);

                if(verificarToken(tokesTypes.IGUAL)){
                    usarToken(tokesTypes.IGUAL);
                    valor.push(expressao());
                }
            }
        }

        usarToken(tokesTypes.PONTO_VIRGULA); 
        // let valor = {type:tokesTypes.NULL, valor: null};
        return {type: 'varDecl', nome: nomeVar, valor}

        
        // if(!verificarToken(tokesTypes.PONTO_VIRGULA)){
        // usarToken(tokesTypes.IGUAL);
        // let valor = expressao();
        // usarToken(tokesTypes.PONTO_VIRGULA); 
        // return {type: 'varDecl', nome: nomeVar.value , valor}

        // }else{

        // usarToken(tokesTypes.PONTO_VIRGULA); 
        // let valor = {type:tokesTypes.NULL, valor: null};
        // return {type: 'varDecl', nome: nomeVar.value, valor}

        // }
    }

    function atribuirValorVar(){
       let nomeVar = usarToken(tokesTypes.NOME_VAR);
       usarToken(tokesTypes.IGUAL);
       let valor = expressao();
       usarToken(tokesTypes.PONTO_VIRGULA);
       return {type: 'varAtb', nome:nomeVar.value, valor}
    }

    function mostrar(){
        usarToken(tokesTypes.MOSTRAR);
        usarToken(tokesTypes.PARENTESE_ESQUERDO);
        let valor = expressao();
        usarToken(tokesTypes.PARENTESE_DIREITO);
        usarToken(tokesTypes.PONTO_VIRGULA);
        return {type: 'mostrar', valor};
    }

    function leia(){
        usarToken(tokesTypes.LEIA);
        usarToken(tokesTypes.PARENTESE_ESQUERDO);
        let nomeVar = usarToken(tokesTypes.NOME_VAR);
        usarToken(tokesTypes.PARENTESE_DIREITO);
        usarToken(tokesTypes.PONTO_VIRGULA);
        return {type: 'leia', nome: nomeVar.value};
    }

    function escolherFuncao(){
        if(verificarToken(tokesTypes.VARIAVEL)){
            return declaracaoVarialvel();
        }

        if(verificarToken(tokesTypes.MOSTRAR)){
            return mostrar();
        }

        if(verificarToken(tokesTypes.NOME_VAR)){
            return atribuirValorVar();
        }

        if(verificarToken(tokesTypes.LEIA)){
            return leia();
        }

        const t = verToken();
        throw new Error(`Função desconhecido: '${tok?.type}' ("${tok?.value}")`);
    }

    function parse(){
        const body = [];
        while(!verificarToken(tokesTypes.EOF)){
            body.push(escolherFuncao());
        } 
        console.log(body);
        return {type: 'Programa', body}
    }

    return parse();
}



export default criarParser;