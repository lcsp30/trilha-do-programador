import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import estilo from "./EditorCodigo.module.css";
import { useState, useCallback, useRef, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import TerminalComponent from "../../components/Terminal/Terminal";
import api from "../../utils/api";
import { useLocation, useNavigate } from "react-router";
import dados from "../../data/desafiosBrasil.json"

import {
  AiOutlinePlayCircle,
  AiOutlineFileText,
  AiOutlineConsoleSql,
  AiOutlineCode,
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";

const EXTENSOES_EDITOR = [javascript()];
const CODIGO_INICIAL = `mostrar("Bem Vindo!");`;

function EditorCodigo() {
  let [code, setCode] = useState(CODIGO_INICIAL);
  const location = useLocation();
  let desafio = location.state;
  const[descricao, setDescricao] = useState("");
  const[descricao_entrada, setDescricao_entrada] = useState("");
  const[descricao_saida, setDescricao_saida] = useState("");
  const[exemplo_entrada, setExemplo_entrada] = useState([]);
  const[exemplo_saida, setExemplo_saida] = useState([]);
  const[pais, setPais] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [executando, setExecutando] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
  const desafioAtual = dados[desafio.numero];

  setDescricao(desafioAtual.descricao);
  setDescricao_entrada(desafioAtual.descricao_entrada);
  setDescricao_saida(desafioAtual.descricao_saida);
  setExemplo_entrada(desafioAtual.exemplo_entrada);
  setExemplo_saida(desafioAtual.exemplo_saida);
  setPais(desafioAtual.pais);
  }, []);

  const terminalRef = useRef(null);

  let pegarCode = useCallback((valor) => {
    setCode(valor);
  }, []);

  // O código vai cru para o backend, que roda em um processo Node com PTY
  function executarCodigo() {
    terminalRef.current?.executar(code);
  }

  function enviarcode() {
    setFeedback("validando");

      api.post("validacao/", {
        code: code,
        pais: pais,
        numero_desafio: desafio.numero
      }).then((res) => {

        if(res.data.res === true){
          const d = localStorage.getItem("desafios");
          const ds = JSON.parse(d);

         const dadosDesafio = ds.map((des) => {
          if(des.numero === desafio.numero){
            return {...des, status: "concluido"};
          }

          if(des.numero === desafio.numero + 1){
            return {...des, status: "atual"} 
          }
        
          return des;
        });
        
          localStorage.setItem("desafios", JSON.stringify(dadosDesafio));
        }

        
    const timer = setTimeout(() => {
       setFeedback(res.data.res === true ? "sucesso" : "erro");
    }, 2000);

    return () => clearTimeout(timer);
       
      }).catch((error) => {
        setFeedback("erro");
        console.error(
        "Erro ao validar resposta:",
        error.response?.data ?? error.message,
      );
      })
  }

  function fecharFeedback() {
    if (feedback !== "validando") {
      if(feedback === "sucesso"){
        nav("/trilha/brasil");
      }
      setFeedback(null);
    }
  }

  useEffect(() => {
    function fecharComEscape(evento) {
      if (evento.key === "Escape" && feedback !== "validando") {
        fecharFeedback();
      }
    }

    window.addEventListener("keydown", fecharComEscape);

    return () => window.removeEventListener("keydown", fecharComEscape);
  }, [feedback]);

  return (
    <div className={estilo.divPrincipal}>
      <Navbar voltarPara="/trilha/brasil" />

      {/* CONTEÚDO */}
      <div className={estilo.contentWrapper}>
        {/* PAINEL DE DESAFIOS */}
        <div className={estilo.divDesafios}>
          <div className={estilo.desafioHeader}>
            <AiOutlineFileText className={estilo.desafioIcon} />
            <span className={estilo.desafioTitle}>Desafio</span>
          </div>
          <div className={estilo.desafioContent}>
            <section className={estilo.desafioBloco}>
              <p>{descricao}</p>
            </section>

            <section className={estilo.desafioBloco}>
              <h2>
                Entrada
              </h2>
              <p>{descricao_entrada}</p>
            </section>

            <section className={estilo.desafioBloco}>
              <h2>
                Saída
              </h2>
              <p>{descricao_saida}</p>
            </section>

            <section className={estilo.desafioBloco}>
              <h2>Exemplo de entrada</h2>
              <pre className={estilo.desafioExemplo}>
                {exemplo_entrada.length > 0
                  ? exemplo_entrada.join("\n")
                  : "Sem entrada"}
              </pre>
            </section>

            <section className={estilo.desafioBloco}>
              <h2>Exemplo de saída</h2>
              <pre className={estilo.desafioExemplo}>
                {exemplo_saida.join("\n")}
              </pre>
            </section>
          </div>
        </div>

        {/* EDITOR */}
        <div className={estilo.editorWrapper}>
          <div className={estilo.editorHeader}>
            <div className={estilo.editorTab}>
              <AiOutlineCode className={estilo.editorTabIcon} />
              <span className={estilo.editorTabName}>Código</span>
            </div>
            <button className={estilo.btnExecutar} onClick={enviarcode}>
              <AiOutlinePlayCircle className={estilo.btnIcon} />
              Enviar Códido
            </button>
          </div>
          <div className={estilo.editorBody}>
            <CodeMirror
              value={code}
              height="100%"
              extensions={EXTENSOES_EDITOR}
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
              <span>Saída</span>
            </div>
            <div className={estilo.acoesResultado}>
              {executando && (
                <button
                  type="button"
                  className={estilo.btnParar}
                  onClick={() => terminalRef.current?.encerrar()}
                >
                  Parar
                </button>
              )}
              <button
                type="button"
                className={estilo.btnExecutar}
                onClick={executarCodigo}
                disabled={executando}
              >
                <AiOutlinePlayCircle className={estilo.btnIcon} />
                Executar
              </button>
            </div>
           
          </div>
          <div className={estilo.resultadoBody}>
            <TerminalComponent ref={terminalRef} setExecutando={setExecutando}/>
          </div>
        </div>
      </div>

      {feedback && (
        <div className={estilo.modalOverlay}>
          <section
            className={`${estilo.modalFeedback} ${estilo[`modal${feedback}`]}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="titulo-feedback"
          >
            {feedback === "validando" && (
              <>
                <AiOutlineLoading3Quarters
                  className={estilo.iconeValidando}
                  aria-hidden="true"
                />
                <h2 id="titulo-feedback">Validando sua resposta</h2>
                <p>Estamos conferindo seu código.</p>
                <div className={estilo.barraProgresso} aria-label="Validando" />
              </>
            )}

            {feedback === "sucesso" && (
              <>
                <AiOutlineCheckCircle
                  className={estilo.iconeSucesso}
                  aria-hidden="true"
                />
                <h2 id="titulo-feedback">Desafio concluído!</h2>
                <p>Sua resposta está correta.</p>
                <button
                  className={estilo.botaoFeedback}
                  onClick={fecharFeedback}
                  autoFocus
                >
                  Continuar
                </button>
              </>
            )}

            {feedback === "erro" && (
              <>
                <AiOutlineCloseCircle
                  className={estilo.iconeErro}
                  aria-hidden="true"
                />
                <h2 id="titulo-feedback">Resposta incorreta</h2>
                <p>Revise seu código e tente novamente.</p>
                <button
                  className={estilo.botaoFeedback}
                  onClick={fecharFeedback}
                  autoFocus
                >
                  Tentar novamente
                </button>
              </>
            )}
          </section>
        </div>
      )}
    </div>
  );
}

export default EditorCodigo;
