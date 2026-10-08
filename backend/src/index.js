import express from "express";
import cors from "cors";

import ValidacaoResRoute from "./routes/ValidacaoResRoute.js";
import registrarRotaTerminal from "./routes/TerminalRoute.js";
import { limparPastasAntigas } from "./services/TerminalService.js";

const PORTA = Number(process.env.PORT ?? 3000);

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/validacao", ValidacaoResRoute);

const server = app.listen(PORTA, () => {
    console.log(`Backend da Trilha do Programador em http://localhost:${PORTA}`);
});

// Porta ocupada é erro de quem já tem um backend rodando, não motivo de stack trace
server.on("error", (erro) => {
    console.error(
        erro.code === "EADDRINUSE"
            ? `A porta ${PORTA} já está em uso — feche o outro backend (ou rode com PORT=3001).`
            : `Erro no servidor: ${erro.message}`
    );

    process.exit(1);
});

// O terminal é WebSocket: sobe no mesmo servidor http, no caminho /terminal
const wss = registrarRotaTerminal(server);

// Sobra de execução de um backend que morreu sem passar pelo cleanup
limparPastasAntigas();

/* Ctrl+C / restart do `--watch`: fechar cada cliente mata o PTY e apaga a pasta
   temporária daquela execução. */
function desligar() {

    for (const socket of wss.clients) {
        socket.terminate();
    }

    // Um instante para a limpeza de cada execução terminar
    setTimeout(() => process.exit(0), 300);
}

process.on("SIGINT", desligar);
process.on("SIGTERM", desligar);