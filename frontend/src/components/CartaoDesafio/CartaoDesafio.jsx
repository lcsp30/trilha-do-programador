import estilo from "./CartaoDesafio.module.css";
import {
  SimboloProgramacao01,
  SimboloProgramacao02,
} from "../../pages/Trilha/components/SimbolosProgramacao/SimbolosProgramacao";
import Programador from "../../pages/Trilha/components/Programador/Programador";

const statusTexto = {
  concluido: "Concluído",
  atual: "Começar desafio",
  bloqueado: "Bloqueado",
};

/* Caixa de cada peça em unidades DELA — o bbox medido no navegador com 1,5 de
   folga para o contorno:
     selos        x −50,625 … 55,422 · y −53,972 … 60,639 (109,1 × 117,6)
     Programador  x −45,943 … 46,944 · y −50,000 … 50,000 ( 95,9 × 103  )
   As peças são `<g>`, então cada uma precisa de um `<svg>` com a caixa dela por
   fora: fora desse `<svg>` o desenho não tem tamanho. O px que dá o PORTE mora
   no CSS, e o `tamanho` das peças fica no default (1). */
const CAIXA_SELO = "-52.1 -55.5 109.1 117.6";
const CAIXA_PROGRAMADOR = "-47.4 -51.5 95.9 103";

/**
 * Card que identifica um desafio da trilha (número, nome e status).
 *
 * O componente cuida só da APARÊNCIA. Onde o card cai dentro da seção é
 * decisão da página, que passa as classes de posicionamento em `slot`.
 *
 * A chapa da esquerda leva UM selo da trilha — os mesmos selos hexagonais que o
 * tabuleiro espalha pelo caminho —, alternado pelo número do desafio: o `</>`
 * (`SimboloProgramacao01`) nos ímpares e o `{ }` (`SimboloProgramacao02`) nos
 * pares. Os dois no mesmo card pesavam mais que o texto, e o card tem 267px.
 *
 * No canto inferior direito entra o `Programador`, a pessoa encapuzada atrás do
 * notebook — a estampa do card, que fica em absoluto para não roubar largura da
 * coluna de texto.
 *
 * @param {object}   desafio    `{ numero, nome, status }`
 * @param {Function} onAbrir    chamada com o desafio ao clicar
 * @param {string}   slot       classes de posição vindas da página
 * @param {boolean}  invertido  espelha o texto, a seta e o selo (card do lado direito)
 */
function CartaoDesafio({ desafio, onAbrir, slot, invertido = false }) {
  const bloqueado = desafio.status === "bloqueado";

  /* Um selo por card, alternando pelo número: ímpar leva o `</>`, par leva o
     `{ }`. */
  const Selo =
    desafio.numero % 2 === 1 ? SimboloProgramacao01 : SimboloProgramacao02;

  const classes = [
    estilo.cartao,
    estilo[desafio.status],
    invertido ? estilo.invertido : "",
    slot,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type="button"
      className={classes}
      onClick={() => onAbrir(desafio)}
      disabled={bloqueado}
      aria-label={`Desafio ${desafio.numero}: ${desafio.nome} — ${statusTexto[desafio.status]}`}
    >
      <span className={estilo.selo} aria-hidden="true">
        <svg className={estilo.seloSimbolo} viewBox={CAIXA_SELO}>
          <Selo x={0} y={0}/>
        </svg>
      </span>

      <span className={estilo.texto}>
        <span className={estilo.numero}>
          DESAFIO {String(desafio.numero).padStart(2, "0")}
        </span>
        <strong className={estilo.nome}>{desafio.nome}</strong>
        <small className={estilo.status}>{statusTexto[desafio.status]}</small>
      </span>

      <svg
        className={estilo.programador}
        viewBox={CAIXA_PROGRAMADOR}
        aria-hidden="true"
      >
        <Programador x={0} y={0} />
      </svg>
    </button>
  );
}

export default CartaoDesafio;
