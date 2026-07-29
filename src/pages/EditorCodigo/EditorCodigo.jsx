import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import estilo from "./EditorCodigo.module.css";
import Markdown from 'react-markdown';
import { useNavigate } from 'react-router';
import { useState, useCallback } from 'react';
import traduzir from '../../utils/logicaTraducao';
import { consoleDark } from '@uiw/codemirror-theme-console';
import { EditorView } from "@codemirror/view";

import {
  AiOutlineRocket,
  AiOutlinePlayCircle,
  AiOutlineArrowLeft,
  AiOutlineFileText,
  AiOutlineConsoleSql,
  AiOutlineCode,
  AiOutlineFlag,
} from 'react-icons/ai';


function EditorCodigo(){
  let [code, setCode] = useState("mostrar('Ola Mundo!');");
  let [resultado, setResultado] = useState("");
  let [executouComSucesso, setExecutouComSucesso] = useState(false);
  const nav = useNavigate();

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

  function voltarHome(){
    nav('/');
  }

  function traduzirErro(msg) {

    for (let ingles in traducoes) {

        if (msg.includes(ingles)) {
            return msg.replace(ingles, traducoes[ingles]);
        }
    }

    return msg;
}

  function execultarCode() {
    let res = traduzir(code);
    let buffer = "";
    try {
      const consoleOriginal = console.log;
      console.log = (mensagem) => { buffer += mensagem + "\n"; };
      new Function(res)();
      console.log = consoleOriginal;
      setResultado(buffer);
      setExecutouComSucesso(true);
    } catch (error){
      setResultado("ERRO!! \n\n" + tipos[error.name] + traduzirErro(error.message) + "!");
      setExecutouComSucesso(false);
    }
  }

  let pegarCode = useCallback((valor) => {
    setCode(valor);
  }, []);

  return (
    <div className={estilo.divPrincipal}>
      {/* HEADER */}
      <header className={estilo.header}>
        <div className={estilo.headerLeft}>
          <AiOutlineRocket className={estilo.logoIcon} />
          <span className={estilo.logoText}>
            Trilha do <span className={estilo.logoAccent}>Programador</span>
          </span>
        </div>
        <div className={estilo.headerRight}>
          <button className={estilo.btnExecutar} onClick={execultarCode}>
            <AiOutlinePlayCircle className={estilo.btnIcon} />
            Executar
          </button>
          <button className={estilo.btnVoltar} onClick={voltarHome}>
            <AiOutlineArrowLeft />
          </button>
        </div>
      </header>

      {/* CONTEÚDO */}
      <div className={estilo.contentWrapper}>
        {/* PAINEL DE DESAFIOS */}
        <div className={estilo.divDesafios}>
          <div className={estilo.desafioHeader}>
            <AiOutlineFileText className={estilo.desafioIcon} />
            <span className={estilo.desafioTitle}>Desafio</span>
          </div>
          <div className={estilo.desafioContent}>
            <div className={estilo.contexto}>
              <Markdown></Markdown>
            </div>
            <div className={estilo.desafioDivider}></div>
            <div className={estilo.desafioLabel}>
              <AiOutlineFlag className={estilo.labelIcon} />
              <span>Objetivo</span>
            </div>
            <div className={estilo.contexto}>
              <Markdown></Markdown>
            </div>
          </div>
        </div>

        {/* EDITOR */}
        <div className={estilo.editorWrapper}>
          <div className={estilo.editorHeader}>
            <div className={estilo.editorTab}>
              <AiOutlineCode className={estilo.editorTabIcon} />
              <span className={estilo.editorTabName}>Codigo</span>
            </div>
          </div>
          <div className={estilo.editorBody}>
            <CodeMirror
              value={code}
              height="100%"
              extensions={[javascript()]}
              theme="dark"
              onChange={pegarCode}
              basicSetup={{
                lineNumbers: true,
                highlightActiveLineGutter: true,
                highlightSpecialChars: true,
                history: true,
                foldGutter: true,
                drawSelection: true,
                dropCursor: true,
                allowMultipleSelections: true,
                indentOnInput: true,
                bracketMatching: true,
                closeBrackets: true,
                autocompletion: false,
                rectangularSelection: true,
                crosshairCursor: true,
                highlightActiveLine: true,
                highlightSelectionMatches: true,
                closeBracketsKeymap: true,
                searchKeymap: true,
                foldKeymap: true,
                completionKeymap: false,
                lintKeymap: true,
              }}
            />
          </div>
        </div>

        {/* PAINEL DE RESULTADO */}
        <div className={estilo.divResultado}>
          <div className={estilo.resultadoHeader}>
            <div className={estilo.resultadoTab}>
              <AiOutlineConsoleSql className={estilo.resultadoTabIcon} />
              <span>Saida</span>
            </div>
          </div>
          <div className={estilo.resultadoBody}>
            {resultado ? (
              <CodeMirror
                value={resultado}
                height="100%"
                readOnly={true} // Desativa a escrita
                editable={false} // Opcional: remove também o cursor de inserção (foco)
                extensions={[javascript(), EditorView.lineWrapping]}
                onChange={(value) => setResultado(value)}
                theme={consoleDark}
                basicSetup={{
                  lineNumbers: false,
                  highlightActiveLineGutter: false,
                  highlightSpecialChars: true,
                  history: true,
                  foldGutter: false,
                  drawSelection: true,
                  dropCursor: true,
                  allowMultipleSelections: true,
                  indentOnInput: true,
                  bracketMatching: true,
                  closeBrackets: true,
                  autocompletion: false,
                  rectangularSelection: true,
                  crosshairCursor: true,
                  highlightActiveLine: false,
                  highlightSelectionMatches: true,
                  closeBracketsKeymap: true,
                  searchKeymap: true,
                  foldKeymap: true,
                  completionKeymap: false,
                  lintKeymap: true,
                }}
              />
            ) : (
              <div className={estilo.resultadoEmpty}>
                <span className={estilo.resultadoEmptyText}>
                  Execute o código para ver o resultado
                </span>
              </div>
            )}
              {executouComSucesso && (
              <div className={estilo.mensagemSucesso}>
                <span className={estilo.mensagemSucessoIcon}>✓</span>
                Código executado com sucesso!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditorCodigo;
