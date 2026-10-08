/* Mensagens de erro em português para o aluno. Esta camada sai do editor porque a
   execução passou a acontecer no backend (processo Node de verdade): ela vai ser
   usada quando a linguagem da Trilha ganhar a sua camada de abstração. */

const traducoes = {
    // ReferenceError
    "is not defined":
        "não foi definido",

    "Cannot access":
        "não é possível acessar",

    "before initialization":
        "antes da inicialização",

    "assignment to undeclared variable":
        "atribuição para variável não declarada",
    // TypeError
    "is not a function":
        "não é uma função",

    "Cannot read properties of undefined":
        "não é possível ler propriedades de undefined",

    "Cannot read properties of null":
        "não é possível ler propriedades de null",

    "Cannot set properties of undefined":
        "não é possível definir propriedades de undefined",

    "Assignment to constant variable":
        "não é possível alterar uma constante",

    "undefined has no properties":
        "undefined não possui propriedades",

    "null has no properties":
        "null não possui propriedades",
    // SyntaxError
    "Unexpected token":
        "token inesperado",

    "Unexpected end of input":
        "fim inesperado do código",

    "missing ) after argument list":
        "faltando ) após lista de argumentos",

    "missing ] after element list":
        "faltando ] após lista de elementos",

    "missing } after property list":
        "faltando } após lista de propriedades",

    "Identifier has already been declared":
        "identificador já foi declarado",

    "Invalid or unexpected token":
        "token inválido ou inesperado",

    "await is only valid in async functions":
        "await só pode ser usado em funções async",

    "Illegal return statement":
        "return ilegal fora de função",

    // RangeError
    "Maximum call stack size exceeded":
        "limite máximo da pilha excedido",

    "Invalid array length":
        "tamanho inválido do array",

    "Invalid time value":
        "valor de tempo inválido"
};

const tipos = {

    Error:
        "Erro padrão do JavaScript: ",

    EvalError:
        "Problema relacionado ao eval(): ",

    RangeError:
        "Vixee, Valor fora do intervalo permitido: ",

    ReferenceError:
        "Égua mano(a), isso que tu escreveu não existe ou tá referenciando errado: ",

    SyntaxError:
        "Égua considerado(a), tá escrevendo o código errado (Erro de Sintaxe): ",

    TypeError:
        "Aí não, esse teu código tá meio remista, operação inválida para o tipo informado: ",

    URIError:
        "Problema em encodeURI/decodeURI: ",

    AggregateError:
        "Vixeee, deu ruim, vários erros agrupados em um único erro: ",

    InternalError:
        "Erro interno da engine JavaScript: "
};

function traduzirErro(msg) {

    for (let ingles in traducoes) {

        if (msg.includes(ingles)) {
            return msg.replace(ingles, traducoes[ingles]);
        }
    }

    return msg;
}

export function mensagemDeErro(error) {

    return tipos[error.name] + traduzirErro(error.message) + "!";
}
