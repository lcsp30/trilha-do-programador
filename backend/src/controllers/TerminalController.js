import { criarTerminal } from "../services/TerminalService.js";
import { ErroDeTraducao } from "../utils/logicaTraducao.js";

function ocultarCaminhoTemporario(data) {

    return data.replace(/\/programa\.js/g, "codigo-do-aluno");
}

/* Uma conexão de WebSocket é uma sessão de terminal: ela roda uma execução por
   vez, e cada mensagem que chega do frontend é tratada aqui. */
export default function conectarTerminal(ws) {

    let execucao = null;
    let geracao = 0;

    function enviar(mensagem) {

        if (ws.readyState === ws.OPEN) {
            ws.send(JSON.stringify(mensagem));
        }
    }

    function encerrarExecucao() {

        if (!execucao) return;

        execucao.matar();
        execucao = null;
    }

    async function executar(code, cols, rows) {

        // A execução anterior (e o arquivo temporário dela) morre aqui
        encerrarExecucao();

        // Saída de uma execução já substituída não pode mais aparecer no terminal
        const minhaGeracao = ++geracao;

        const daExecucaoAtual = () => minhaGeracao === geracao;

        try {

            execucao = await criarTerminal({
                code,
                cols,
                rows,

                onData: (data) => {
                    if (daExecucaoAtual()) {
                        enviar({ type: "output", data: ocultarCaminhoTemporario(data) });
                    }
                },

                onExit: ({ exitCode, signal }) => {

                    if (!daExecucaoAtual()) return;

                    execucao = null;
                    enviar({ type: "exit", code: exitCode, signal });
                },
            });

        } catch (erro) {

            if (daExecucaoAtual()) {
                enviar({
                    type: "error",
                    data: erro instanceof ErroDeTraducao
                        ? erro.message
                        : `Não foi possível executar o código: ${erro.message}`,
                });
            }
        }
    }

    function tratarMensagem(mensagem) {

        switch (mensagem.type) {

            case "run":
                executar(String(mensagem.code ?? ""), mensagem.cols, mensagem.rows);
                break;

            case "input":
                if (execucao && typeof mensagem.data === "string") {
                    execucao.escrever(mensagem.data);
                }
                break;

            case "resize":
                if (execucao) execucao.redimensionar(mensagem.cols, mensagem.rows);
                break;

            case "kill":
                encerrarExecucao();
                break;

            default:
                enviar({ type: "error", data: `Mensagem desconhecida: ${mensagem.type}` });
        }
    }

    ws.on("message", (bruto) => {

        let mensagem;

        try {
            mensagem = JSON.parse(bruto.toString());
        } catch {
            enviar({ type: "error", data: "Mensagem inválida: JSON malformado." });
            return;
        }

        tratarMensagem(mensagem);
    });

    ws.on("close", encerrarExecucao);

    // Um erro no socket não pode derrubar o servidor nem deixar processo órfão
    ws.on("error", encerrarExecucao);
}
