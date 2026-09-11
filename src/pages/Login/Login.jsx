import estilo from "./Login.module.css";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";

function Login() {
  const [loginAtivo, setLoginAtivo] = useState(true);

  return (
    <div className={estilo.divPrincipal}>
      <main className={estilo.main}>
        <div className={estilo.divTitulo}>
          <h1>TRILHA DO PROGRAMADOR</h1>
        </div>
        <div className={estilo.divDiscricao_Login}>
          <div className={estilo.divDiscricao}>
            <h2>
              Aprender a programar não precisa ser em uma língua estranha.
            </h2>
            <p style={{ margin: "0.5rem 0px" }}>
              Explore uma trilha interativa com 100 desafios progressivos, onde
              o seu raciocínio lógico em Português Brasileiro ganha vida
              instantaneamente no navegador…
            </p>
            <p>Boas-vindas, futuro desenvolvedor.</p>
            <hr style={{ margin: "1.3rem 0px" }} />
            <p style={{ margin: "0.6rem 0px" }}>
              “Esta plataforma vai transformar o medo da sintaxe em pura
              conquista diária… Um espaço pensado para você desenvolver o
              pensamento computacional no seu próprio ritmo, com feedback
              imediato e recompensas a cada linha de código.”
            </p>
            <p style={{ marginBottom: "0px" }}>
              “A Trilha do Programador é um ambiente web gratuito de aprendizado
              baseado em desafios — um sistema gamificado que utiliza um
              transpilador em PT-BR para aproximar sua lógica da prática real de
              programação.”
            </p>
          </div>
          <div className={estilo.divFormLogin}>
            <nav className={estilo.headerForm}>
              <ul>
                <li>
                  <div>
                    <button
                      className={`${estilo.aba} ${loginAtivo == true ? estilo.abaAtiva : ""}`}
                      onClick={() => setLoginAtivo(true)}
                    >
                      LOGIN
                    </button>
                  </div>
                </li>
                <li>
                  <div>
                    <button
                      className={`${estilo.aba} ${loginAtivo == false ? estilo.abaAtiva : ""}`}
                      onClick={() => setLoginAtivo(false)}
                    >
                      CADASTRO
                    </button>
                  </div>
                </li>
              </ul>
            </nav>
            <div className={estilo.divFormInterna}>
              {loginAtivo == true && (
                <form action="">
                  <div style={{ marginBottom: "20px" }}>
                    <h3>Login</h3>
                     <hr style={{ margin: "0.5rem 0px" }} />
                  </div>
                  <div className={estilo.divInput}>
                    <label htmlFor="email">Email</label>
                    <br />
                    <input type="email" name="email" />
                  </div>
                  <div className={estilo.divInput}>
                    <label htmlFor="senha">Senha</label>
                    <br />
                    <input type="password" name="senha" />
                  </div>
                  <div className={estilo.divBtn}>
                    <button type="submit">Login</button>
                  </div>
                </form>
              )}

              {loginAtivo == false && (
                <form action="">
                  <div style={{ marginBottom: "20px" }}>
                    <h3>Cadastro</h3>
                     <hr style={{ margin: "0.5rem 0px" }} />
                  </div>
                  <div className={estilo.divInput}>
                    <label htmlFor="nome">Nome</label>
                    <br />
                    <input type="text" name="nome" />
                  </div>
                  <div className={estilo.divInput}>
                    <label htmlFor="email">Email</label>
                    <br />
                    <input type="email" name="email" />
                  </div>
                  <div className={estilo.divInput}>
                    <label htmlFor="senha">Senha</label>
                    <br />
                    <input type="password" name="senha" />
                  </div>
                  <div className={estilo.divBtn}>
                    <button type="submit">Cadastrar</button>
                  </div>
                </form>
              )}

              <hr className={estilo.hr2} />
              <p style={{ textAlign: "center", marginBottom: "7px" }}>ou</p>

              <button className={estilo.btnGoogle}>
                <FcGoogle size={25} />
                Entrar com o Google
              </button>
            </div>
          </div>
        </div>
        <footer className={estilo.footer}>
          <div>
            <p>
              © <a className={estilo.linksFooter} href="https://github.com/lcsp30">LCSP30</a> 2026–2026{" "}
              <span style={{ fontWeight: "bold", marginLeft: "1em" }}>
                Version 1.0.0
              </span>
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default Login;
