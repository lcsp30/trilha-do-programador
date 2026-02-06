import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import estilo from "./estiloEditorCodigo.module.css";
import { useLocation } from 'react-router';
import Markdown from 'react-markdown';

function EditorCodigo(){
let code = "console.log('Ola Mundo!');";
const location = useLocation();
const {titulo, contexto, desafio} = location.state;

function clik(){
    console.log(titulo);
}

    return(
        <div className={estilo.divPrincipal}>
            <header className="container-fluid p-3 " style={{backgroundColor: "#1B1B32"}}>
                 <div className="d-flex align-items-center">
                 <h3 style={{margin: "0" , color:"white"}}>Trilha do Programador</h3>
                 </div>
            </header>
            <div className="d-flex" style={{borderTop:"1px solid #696969"}}>
                 <div className={estilo.divDesafios}>
                <div className="text-white">
                    <h3 className="text-center m-5" onClick={clik}>{titulo}</h3>
                    <div className={estilo.contexto}><Markdown>{contexto}</Markdown></div>
                    <h5 className="text-center m-0 mt-5"><b>Desafio:</b></h5>
                    <div className={estilo.contexto}><Markdown>{desafio}</Markdown></div>
                </div>
            </div>
            <div>
            <CodeMirror
            value={code}
            height="100vh"
            width='45vw'
            extensions={[javascript()]}
            theme="dark"
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
          autocompletion: true,
          rectangularSelection: true,
          crosshairCursor: true,
          highlightActiveLine: true,
          highlightSelectionMatches: true,
          closeBracketsKeymap: true,
          searchKeymap: true,
          foldKeymap: true,
          completionKeymap: true,
          lintKeymap: true,
        }}
            />
        </div>
        <div className={estilo.divResultado}>

        </div>
            </div>
        </div>
    )
}

export default EditorCodigo;