import { useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Terminal as XTerm } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";

import estilo from "./Terminal.module.css";

import "@xterm/xterm/css/xterm.css";


const FAMILIA_TERMINAL = "JetBrains Mono";
const FONTE_TERMINAL = `'${FAMILIA_TERMINAL}', monospace`;
const FONTE_MEDIDA = `14px "${FAMILIA_TERMINAL}"`;
const LIMITE_FONTE_MS = 3000;

const URL_TERMINAL = import.meta.env.VITE_WS_URL;

/* O PTY não avisa quando para para ler o stdin, então quem diz que o programa está
   esperando digitação é o próprio código enviado — é isso que liga o cursor e
   leva o foco para o terminal. */
const PROGRAMA_ESPERA_ENTRADA = /process\.stdin|readline|createInterface|prompt\s*\(|leia\s*\(/;

const AVISO_DESCONECTADO =
    "\r\n\x1b[33mTerminal desconectado — suba o backend (npm run dev na pasta backend) e clique em Executar de novo.\x1b[0m\r\n";

/* Expõe para o editor o que ele precisa: rodar o código do CodeMirror e encerrar a
   execução — as duas mensagens do protocolo que partem do usuário. */
function TerminalComponent({ ref, setExecutando}) {

    const telaRef = useRef(null);
    const terminalInstance = useRef(null);
    const socketRef = useRef(null);

    /* Execução esperando a conexão (ou o terminal) ficar pronto */
    const execucaoPendente = useRef(null);

    /* A saída passou do que cabe na tela: a barra de rolagem fica visível (ver CSS) */
    const [temHistorico, setTemHistorico] = useState(false);

    const enviar = useCallback((mensagem) => {

        const socket = socketRef.current;

        if (!socket || socket.readyState !== WebSocket.OPEN) return false;

        socket.send(JSON.stringify(mensagem));

        return true;
    }, []);

    const avisarDesconectado = useCallback(() => {
        terminalInstance.current?.write(AVISO_DESCONECTADO);
    }, []);

    /* Num painel de saída o cursor piscando o tempo todo é ruído: ele só aparece
       quando o programa pode estar esperando digitação. O xterm não tem um
       "cursor invisível" com o terminal em foco, então quem não espera digitação
       perde também o foco (e o cursor inativo some junto). */
    const ajustarCursor = useCallback((esperaEntrada) => {

        const terminal = terminalInstance.current;

        if (!terminal) return;

        terminal.options.cursorBlink = esperaEntrada;
        terminal.options.cursorInactiveStyle = esperaEntrada ? "outline" : "none";

        if (esperaEntrada) {
            terminal.focus();
        } else {
            terminal.blur();
        }
    }, []);

   
    const desabilitarEntrada = useCallback(() => {

        const terminal = terminalInstance.current;

        if (terminal) terminal.options.disableStdin = true;

        ajustarCursor(false);
    }, [ajustarCursor]);

    const habilitarEntrada = useCallback((esperaEntrada) => {

        const terminal = terminalInstance.current;

        if (terminal) terminal.options.disableStdin = false;

        ajustarCursor(esperaEntrada);
    }, [ajustarCursor]);

    /* O xterm esconde a barra de rolagem quando fica ociosa. Com saída maior do que a
       tela, ela precisa ficar visível: é a única pista de que o começo da execução
       está acima. */
    const atualizarHistorico = useCallback(() => {

        const terminal = terminalInstance.current;

        if (!terminal) return;

        setTemHistorico(terminal.buffer.active.length > terminal.rows);
    }, []);

    /* Fecha a conexão do terminal com o backend */
    const fecharConexao = useCallback(() => {

        const socket = socketRef.current;

        socketRef.current = null;
        execucaoPendente.current = null;

        socket?.close();
    }, []);

    /* Programa terminou: sem digitação e sem conexão */
    const encerrarTerminal = useCallback(() => {
        desabilitarEntrada();
        fecharConexao();
        setExecutando(false);
        
    }, [desabilitarEntrada, fecharConexao]);

    /* Começa uma execução: tela limpa e o código enviado com o tamanho atual da tela.
       Fica num lugar só porque a execução pode partir daqui (conexão já aberta) ou do
       `despacharPendente` (conexão ou terminal recém-prontos). */
    const iniciarExecucao = useCallback(({ code, esperaEntrada }) => {
        setExecutando(true);

        const terminal = terminalInstance.current;

        if (!terminal) return;

        // Cada execução mostra a sua própria saída, sem herdar o histórico da anterior
        terminal.reset();

        setTemHistorico(false);

        // O tamanho vai JUNTO do run: o PTY nasce com o tamanho da tela. Um resize
        // antes disso seria ignorado (ainda não existe processo) e o PTY nasceria no
        // padrão 80x24 — aí o ConPTY repinta mais linhas do que cabem na tela e empurra
        // a saída para fora da área visível.
        if (!enviar({ type: "run", code, cols: terminal.cols, rows: terminal.rows })) return;

        habilitarEntrada(esperaEntrada);
    }, [enviar, habilitarEntrada]);

    /* Despacha a execução que estava esperando: pode ser a conexão que acabou de
       abrir ou o terminal que acabou de ser criado, o que vier por último. */
    const despacharPendente = useCallback(() => {

        const pendente = execucaoPendente.current;

        if (!pendente || !terminalInstance.current) return;

        execucaoPendente.current = null;

        iniciarExecucao(pendente);
    }, [iniciarExecucao]);

    /* A conexão nasce no clique em Executar — na montagem da tela não se fala com o
       backend. Se ela cair, ninguém fica tentando de novo: o próximo Executar abre
       outra. */
    const abrirConexao = useCallback((execucao) => {

        execucaoPendente.current = execucao;

        const socket = new WebSocket(URL_TERMINAL);

        socketRef.current = socket;

        socket.onopen = despacharPendente;

        socket.onmessage = (evento) => {

            let mensagem;

            try {
                mensagem = JSON.parse(evento.data);
            } catch {
                return;
            }

            switch (mensagem.type) {

                case "output":
                    terminalInstance.current?.write(mensagem.data);
                    atualizarHistorico();
                    break;

                case "error":
                    terminalInstance.current?.write(`\x1b[33m${mensagem.data}\x1b[0m\r\n`);
                    console.log(mensagem.data);

                    // Um erro ao iniciar a execução é o fim dela: sem isso o terminal
                    // ficava habilitado, com cursor, sem processo nenhum do outro lado
                    encerrarTerminal();
                    break;

                // Código positivo é erro de verdade: o Ctrl+C (e o kill) devolve
                // código negativo, e avisar ali só confundiria.
                case "exit":
                    if (mensagem.code > 0) {
                        terminalInstance.current?.write(
                            `\x1b[33mO programa terminou com erro.\x1b[0m\r\n`
                        );
                    }

                    // Acabou o programa: o terminal fecha junto
                    encerrarTerminal();
                    break;
            }
        };

        // Backend fora do ar: avisa no terminal e para por aqui, quem manda tentar
        // de novo é o próximo clique em Executar
        socket.onerror = () => {
  avisarDesconectado();
  setExecutando(false);
};

        socket.onclose = () => {

            // A comparação protege a conexão nova de um fechamento atrasado da antiga
            if (socketRef.current === socket) socketRef.current = null;

            execucaoPendente.current = null;

            // Sem conexão, o terminal volta a não aceitar digitação
            desabilitarEntrada();
            setExecutando(false);
        };

    }, [atualizarHistorico, avisarDesconectado, despacharPendente, desabilitarEntrada, encerrarTerminal]);

    useEffect(() => {

        let cancelado = false;
        let terminal = null;
        let textarea = null;

        const fitAddon = new FitAddon();

        /* Sem programa rodando a digitação está desabilitada e clicar no terminal não
           pode abrir cursor: o foco é desfeito na hora. */
        const evitarFoco = () => {

            if (terminal?.options.disableStdin) terminal.blur();
        };

        const criarTerminal = () => {

            if (cancelado) return;

            terminal = new XTerm({
                // Nasce sem cursor: quem liga é o `ajustarCursor`, quando o
                // programa enviado vai ler o stdin
                cursorBlink: false,
                cursorInactiveStyle: "none",
                fontSize: 14,
                fontFamily: FONTE_TERMINAL,
                lineHeight: 1.3,
                // Faz o "\n" também voltar para o começo da linha,
                // que é o que o console.log() do usuário produz
                convertEol: true,
                // Só aceita digitação com um programa rodando (ver `habilitarEntrada`)
                disableStdin: true,
                theme: {
                    background: "#111827",
                    foreground: "#ffffff",
                    cursor: "#ffffff",
                    // A barra de rolagem nas cores do projeto (o Papel, #f7f3e5), para
                    // ela não parecer um elemento estranho ao tema
                    scrollbarSliderBackground: "rgba(247, 243, 229, 0.2)",
                    scrollbarSliderHoverBackground: "rgba(247, 243, 229, 0.4)",
                    scrollbarSliderActiveBackground: "rgba(247, 243, 229, 0.5)"
                }
            });

            terminal.loadAddon(fitAddon);

            terminal.open(telaRef.current);

            terminalInstance.current = terminal;

            // Tudo que o usuário digita vai para o stdin do processo
            terminal.onData((data) => enviar({ type: "input", data }));

            textarea = terminal.textarea;
            textarea?.addEventListener("focus", evitarFoco);

            fitAddon.fit();

            // Se o Executar veio antes do terminal existir, é agora que ele roda
            despacharPendente();
        };

        // O xterm mede o caractere uma única vez, ao abrir: medindo com a fonte de
        // fallback, a grade inteira sai com o espaçamento errado — e não se corrige
        // depois. Por isso o terminal espera a webfont (com um teto de espera, caso
        // a fonte não carregue mesmo).
        const esperarFonte = async () => {

            if (!document.fonts) return;

            const limite = Date.now() + LIMITE_FONTE_MS;

            document.fonts.load(FONTE_MEDIDA).catch(() => {});

            while (Date.now() < limite) {

                // Enquanto o CSS não registra o @font-face, `load()` e `check()`
                // respondem "pronto" sem ter fonte nenhuma para carregar. Só depois
                // de a face existir a resposta de `check()` significa alguma coisa.
                const registrada = [...document.fonts].some(
                    (face) => face.family.replace(/["']/g, "") === FAMILIA_TERMINAL
                );

                if (registrada && document.fonts.check(FONTE_MEDIDA)) return;

                await new Promise((resolver) => setTimeout(resolver, 50));
            }
        };

        esperarFonte().then(criarTerminal);


        // Refaz o cálculo quando o próprio painel muda de tamanho
        let larguraAnterior = 0;
        let alturaAnterior = 0;

        const observador = new ResizeObserver(([entrada]) => {

            const { width, height } = entrada.contentRect;

            if (width === larguraAnterior && height === alturaAnterior) return;

            larguraAnterior = width;
            alturaAnterior = height;

            fitAddon.fit();

            if (terminal) {
                enviar({ type: "resize", cols: terminal.cols, rows: terminal.rows });
            }
        });

        observador.observe(telaRef.current);

        return () => {

            cancelado = true;

            observador.disconnect();

            textarea?.removeEventListener("focus", evitarFoco);

            terminal?.dispose();

            terminalInstance.current = null;
        };

    }, [despacharPendente, enviar]);

    // Ao sair da tela, encerra o processo e fecha a conexão (se alguma foi aberta)
    useEffect(() => () => {

        const socket = socketRef.current;

        socketRef.current = null;
        execucaoPendente.current = null;

        if (socket?.readyState === WebSocket.OPEN) {
            // Encerra o processo antes de fechar, para não deixar Node órfão
            socket.send(JSON.stringify({ type: "kill" }));
        }

        socket?.close();
    }, []);

    useImperativeHandle(ref, () => ({

        executar(codigo) {

            // O PTY não avisa quando para para ler o stdin: quem diz é o código
            const esperaEntrada = PROGRAMA_ESPERA_ENTRADA.test(codigo);

            const socket = socketRef.current;

            // Já existe conexão aberta: reaproveita
            if (socket?.readyState === WebSocket.OPEN) {

                iniciarExecucao({ code: codigo, esperaEntrada });
                return;
            }

            // Tem uma conexão abrindo: roda nela assim que ficar pronta
            if (socket?.readyState === WebSocket.CONNECTING) {

                execucaoPendente.current = { code: codigo, esperaEntrada };
                return;
            }

            abrirConexao({ code: codigo, esperaEntrada });
        },

        encerrar() {
            enviar({ type: "kill" });
            encerrarTerminal();
        },

    }), [abrirConexao, enviar, encerrarTerminal, iniciarExecucao]);

    return (
        <div className={`${estilo.container} ${temHistorico ? estilo.comHistorico : ""}`}>
            <div
                ref={telaRef}
                className={estilo.tela}
            />
        </div>
    );
}


export default TerminalComponent;
