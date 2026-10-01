import { useNavigate } from "react-router";
import { AiOutlineArrowLeft, AiOutlineLogout } from "react-icons/ai";
import estilo from "./Navbar.module.css";

/**
 * Barra superior do app: marca "Trilha do Programador" e ação de sair.
 *
 * @param {string} [voltarPara] rota do botão de voltar. Quando informada, a
 *   marca passa a ser centralizada de verdade (grade de 3 colunas:
 *   voltar · marca · ações). Sem ela, a barra fica só marca + sair.
 */
function Navbar({ voltarPara }) {
  const navigate = useNavigate();

  return (
    <header className={`${estilo.navbar} ${voltarPara ? estilo.comVoltar : ""}`}>
      {voltarPara && (
        <button
          type="button"
          className={estilo.botaoVoltar}
          onClick={() => navigate(voltarPara)}
          aria-label="Voltar"
        >
          <AiOutlineArrowLeft aria-hidden="true" />
        </button>
      )}

      <div className={estilo.logo} aria-label="Trilha do Programador">
        <h1>
          <span>TRILHA</span>
          <span>
            DO PROGRAMADOR <em className={estilo.simbolo}>{"</>"}</em>
          </span>
        </h1>
      </div>

      <div className={estilo.acoes}>
        <button
          type="button"
          className={estilo.botaoSair}
          onClick={() => navigate("/login")}
        >
          <AiOutlineLogout aria-hidden="true" />
          Sair
        </button>
      </div>
    </header>
  );
}

export default Navbar;
