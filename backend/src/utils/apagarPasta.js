export async function apagarPasta(pastaApagada, pasta){

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