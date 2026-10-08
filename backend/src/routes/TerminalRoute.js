import { WebSocketServer } from "ws";
import conectarTerminal from "../controllers/TerminalController.js";

/* Diferente das rotas HTTP, a rota do terminal é um caminho de WebSocket: ela
   precisa do servidor http para fazer o "upgrade" da conexão. */
export default function registrarRotaTerminal(server) {

    const wss = new WebSocketServer({
        server,
        path: "/api/terminal",
    });

    wss.on("connection", conectarTerminal);

    return wss;
}
