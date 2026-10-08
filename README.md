# Trilha do Programador

A Trilha do Programador é uma plataforma brasileira de aprendizagem que ensina os primeiros conceitos de programação por meio de desafios curtos e progressivos.

O aluno percorre uma trilha visual, lê o enunciado do desafio e escreve a solução em um pseudocódigo em português. O sistema traduz esse código para JavaScript, executa o programa em um terminal e valida a resposta usando casos de teste.

## O que o projeto oferece

- Trilha gamificada com níveis, desafios e progresso.
- Editor de código com destaque de sintaxe.
- Terminal interativo para executar os programas.
- Entrada de dados com `leia()` e saída com `mostrar()`.
- Mensagens de erro em português.
- Validação automática da solução com múltiplos casos de entrada e saída.
- Desafios introdutórios de saída, variáveis e operações matemáticas.

## Como funciona

1. O aluno escolhe um desafio na trilha.
2. O frontend apresenta descrição, entrada, saída e exemplos.
3. O código escrito em pseudocódigo é enviado ao backend.
4. O tradutor converte o pseudocódigo para JavaScript.
5. O backend executa o programa em um processo isolado.
6. A solução é comparada com as saídas esperadas dos casos de teste.
7. O aluno recebe um feedback visual informando se a resposta está correta.

## Tecnologias

### Frontend

- React 19
- Vite 7
- CodeMirror 6
- React Router 7
- React Icons
- WebSocket para o terminal interativo

### Backend

- Node.js com módulos ES
- Express
- WebSocket
- `node-pty` para execução do terminal
- Processos temporários para executar e limpar cada solução

## Organização

```text
trilha-do-programador/
├── backend/
│   └── src/
│       ├── controllers/
│       ├── routes/
│       ├── services/
│       ├── utils/
│       └── validacoes/
└── frontend/
        ├── public/
        └── src/
                ├── components/
                ├── data/
                ├── pages/
                ├── styles/
                └── utils/
```

O frontend é responsável pela experiência da trilha, pelo editor e pelo terminal visual. O backend traduz, executa e valida os programas enviados pelo aluno.

## Pseudocódigo

A linguagem da trilha usa palavras-chave em português, como:

```text
variavel nome = "Ana";
mostrar(nome);
leia(numero);
se (numero > 0) {
    mostrar("positivo");
}
```

Entre os comandos disponíveis estão `variavel`, `inteiro`, `decimal`, `texto`, `mostrar`, `leia`, `se`, `senao`, `enquanto`, `para`, `funcao`, `retornar`, `verdadeiro`, `falso`, `nulo`, `classe`, `novo` e `isto`.

## Desenvolvimento

O frontend e o backend possuem seus próprios comandos e dependências. Execute `npm install` em cada pasta antes de iniciar o projeto.

Frontend:

```bash
cd frontend
npm install
npm run dev
```

Backend:

```bash
cd backend
npm install
npm run dev
```

O frontend usa o Vite e o backend inicia o servidor HTTP na porta `3000` por padrão.
