# Trilha do Programador

Plataforma interativa de ensino de programação onde o usuário escreve código em um pseudocódigo em português que é traduzido para JavaScript e executado no navegador.

## Funcionalidades

- **Editor de código** com syntax highlighting via CodeMirror
- **Transpilador** de pseudocódigo português → JavaScript
- **Execução em tempo real** do código no navegador
- **Mensagens de erro traduzidas** para português com linguagem acessível
- **Painel de saída** para visualizar resultados de `mostrar()` e erros

### Palavras-chave suportadas

| Pseudocódigo   | JavaScript       |
|----------------|------------------|
| `variavel`     | `var`            |
| `mostrar()`    | `console.log()`  |
| `leia()`       | `prompt()`       |
| `se`           | `if`             |
| `senao`        | `else`           |
| `enquanto`     | `while`          |
| `para`         | `for`            |
| `funcao`       | `function`       |
| `retornar`     | `return`         |
| `verdadeiro`   | `true`           |
| `falso`        | `false`          |
| `nulo`         | `null`           |
| `classe`       | `class`          |
| `novo`         | `new`            |
| `isto`         | `this`           |

## Stack

- [React 19](https://react.dev) + [Vite 7](https://vite.dev)
- [CodeMirror 6](https://codemirror.net) (editor)
- [React Router 7](https://reactrouter.com)
- [React Markdown](https://github.com/remarkjs/react-markdown)
- [React Icons](https://react-icons.github.io/react-icons)

## Estrutura do Projeto

```
src/
├── main.jsx                         # Entry point e router
├── styles/
│   └── index.css                    # Reset global
├── utils/
│   └── logicaTraducao.js            # Transpilador pseudocódigo → JS
└── pages/
    └── EditorCodigo/
        ├── EditorCodigo.jsx         # Editor, execução e painel de saída
        └── EditorCodigo.module.css  # Estilos do editor
```

## Começando

### Pré-requisitos

- [Node.js](https://nodejs.org) 18+

### Instalação

```bash
npm install
```

### Desenvolvimento

```bash
npm run dev
```

Acesse `http://localhost:5173/trilha-do-programador/` no navegador.

### Build

```bash
npm run build
```

### Lint

```bash
npm run lint
```

## Deploy

O projeto é publicado no GitHub Pages:

```bash
npm run deploy
```

URL: [lcsp30.github.io/trilha-do-programador](https://lcsp30.github.io/trilha-do-programador)
