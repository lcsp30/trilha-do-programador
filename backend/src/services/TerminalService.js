import { mkdir, mkdtemp, readdir, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import traduzir from "../utils/logicaTraducao.js";
import * as pty from "node-pty";

const PASTA_TEMPORARIA = fileURLToPath(new URL("../../.tmp", import.meta.url));
const PREFIXO_PASTA = "trilha-programa-";
const COLUNAS_PADRAO = 80;
const LINHAS_PADRAO = 24;
const DIMENSAO_MINIMA = 1;
const DIMENSAO_MAXIMA = 500;

function normalizarDimensao(valor, padrao) {

    const numero = Number.parseInt(valor, 10);

    if (!Number.isFinite(numero)) return padrao;

    return Math.min(Math.max(numero, DIMENSAO_MINIMA), DIMENSAO_MAXIMA);
}

/* Sobra de execução cujo backend morreu antes do cleanup (Ctrl+C, crash, `--watch`
   reiniciando). No Windows a pasta de uma execução viva está travada pelo processo,
   então o `rm` falha nela e só as sobras somem. */
export async function limparPastasAntigas() {

    const entradas = await readdir(PASTA_TEMPORARIA, { withFileTypes: true }).catch(() => []);

    const pastas = entradas
        .filter((entrada) => entrada.isDirectory() && entrada.name.startsWith(PREFIXO_PASTA))
        .map((entrada) => rm(join(PASTA_TEMPORARIA, entrada.name), {
            recursive: true,
            force: true,
            maxRetries: 2,
        }).catch(() => {}));

    await Promise.all(pastas);
}

/* Uma execução = uma pasta em `backend/.tmp` com o `programa.js` dentro. A pasta
   também é o `cwd` do processo, para o código poder usar caminhos relativos.
   Devolve os três comandos que o WebSocket precisa: escrever, redimensionar e
   matar. `onData` recebe stdout/stderr crus (com as sequências ANSI do terminal). */
export async function criarTerminal({code, cols, rows, onData, onExit,}) {

    const codeTraduzido = await traduzir(code);

    console.log(codeTraduzido);

    await mkdir(PASTA_TEMPORARIA, { recursive: true });

    const pasta = await mkdtemp(join(PASTA_TEMPORARIA, PREFIXO_PASTA));

    const arquivo = join(pasta, "programa.js");

    let pastaApagada = false;

    const apagarPasta = async () => {

        if (pastaApagada) return;

        try {
            // No Windows o arquivo fica preso por um instante depois que o processo
            // morre; sem as tentativas extras a pasta vazaria no projeto.
            await rm(pasta, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
            pastaApagada = true;
        } catch {
            // Sem este catch a falha do rm vira "unhandled rejection" e derruba o
            // servidor inteiro (Node 15+). A pasta presa é lixo, não motivo de queda.
        }
    };

    let terminal;

    try {

        await writeFile(arquivo, codeTraduzido, "utf8");

        terminal = pty.spawn(process.execPath, [arquivo], {
            name: "xterm-color",
            cols: normalizarDimensao(cols, COLUNAS_PADRAO),
            rows: normalizarDimensao(rows, LINHAS_PADRAO),
            cwd: pasta,
            env: {
                ...process.env,
                NO_COLOR: "1",
                NODE_DISABLE_COLORS: "1",
            },
        });

    } catch (erro) {

        await apagarPasta();

        throw erro;
    }

    terminal.onData((data) => onData(data));

    terminal.onExit(async ({ exitCode, signal }) => {

        await apagarPasta();

        onExit({ exitCode, signal: signal ?? 0 });
    });

    return {

        escrever: (data) => terminal.write(data),

        redimensionar: (novasCols, novasLinhas) => {

            terminal.resize(
                normalizarDimensao(novasCols, terminal.cols),
                normalizarDimensao(novasLinhas, terminal.rows)
            );
        },

        matar: () => {
            terminal.kill();
            apagarPasta();
        },
    };
}
