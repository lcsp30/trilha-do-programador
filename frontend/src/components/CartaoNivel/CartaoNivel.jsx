import { AiOutlineArrowRight, AiOutlineLock } from "react-icons/ai";
import baseUrl from "../../utils/baseUrl";
import estilo from "./CartaoNivel.module.css";

const statusTexto = {
  concluido: "Concluído",
  andamento: "Em andamento",
  bloqueado: "Bloqueado",
};

/**
 * Card de um território (um bloco de 10 desafios) na tela de níveis.
 *
 * Componente INDEPENDENTE: tem o próprio CSS Module e não compartilha base com
 * o CartaoDesafio — os dois vestem o mesmo material (tokens), mas não o mesmo
 * código. Mexer aqui não mexe lá.
 *
 * Como o card é um <button>, o conteúdo interno só pode usar elementos de
 * phrasing content (span/strong/img/svg). <div> e <h3> são inválidos aqui.
 *
 * @param {object}   nivel      `{ pais, bandeira?, desafios, progresso, status }`
 * @param {Function} onAbrir    chamada com o nível ao clicar
 * @param {boolean}  deslocado  joga o card 28px para baixo (onda do carrossel)
 */
function CartaoNivel({ nivel, onAbrir, deslocado = false }) {
  const bloqueado = nivel.status === "bloqueado";

  const classes = [
    estilo.cartao,
    estilo[nivel.status],
    deslocado ? estilo.deslocado : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type="button"
      className={classes}
      onClick={() => onAbrir(nivel)}
      disabled={bloqueado}
      aria-label={`Desafios ${nivel.pais} — ${statusTexto[nivel.status]}, ${nivel.progresso}% concluído`}
    >
      <span className={estilo.cardTopo}>
        {nivel.bandeira ? (
          <img
            className={estilo.bandeira}
            src={`${baseUrl}flag/${nivel.bandeira}.svg`}
            alt=""
            draggable="false"
          />
        ) : (
          <span className={estilo.pais}>{nivel.pais}</span>
        )}
        {bloqueado && <AiOutlineLock className={estilo.cadeado} aria-hidden="true" />}
      </span>

      <strong className={estilo.titulo}>Desafios {nivel.pais}</strong>

      <span className={estilo.cardRodape}>
        {/* A barra é só reforço visual: a porcentagem já vai no aria-label
            do botão e no texto ao lado, então não precisa ser anunciada. */}
        <span className={estilo.progressoLinha} aria-hidden="true">
          <span style={{ width: `${nivel.progresso}%` }} />
        </span>
        <span className={estilo.cardInfo}>
          <span>
            {nivel.progresso}% · {nivel.desafios} desafios
          </span>
          {!bloqueado && <AiOutlineArrowRight aria-hidden="true" />}
        </span>
      </span>

      <span className={estilo.status}>{statusTexto[nivel.status]}</span>
    </button>
  );
}

export default CartaoNivel;
