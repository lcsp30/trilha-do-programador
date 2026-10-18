import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import CartaoNivel from "../../components/CartaoNivel/CartaoNivel";
import Navbar from "../../components/Navbar/Navbar";
import estilo from "./Niveis.module.css";

const niveis = [
  {
    pais: "Japão",
    bandeira: "jp",
    desafios: 10,
    progresso: 0,
    status: "bloqueado",
  },
  {
    pais: "Egito",
    bandeira: "eg",
    desafios: 10,
    progresso: 0,
    status: "bloqueado",
  },
  {
    pais: "Noruega",
    bandeira: "no",
    desafios: 10,
    progresso: 0,
    status: "bloqueado",
  },
  {
    pais: "Índia",
    bandeira: "in",
    desafios: 10,
    progresso: 0,
    status: "bloqueado",
  },
  {
    pais: "Itália",
    bandeira: "it",
    desafios: 10,
    progresso: 0,
    status: "bloqueado",
  },
  {
    pais: "México",
    bandeira: "mx",
    desafios: 10,
    progresso: 0,
    status: "bloqueado",
  },
  {
    pais: "Austrália",
    bandeira: "au",
    desafios: 10,
    progresso: 0,
    status: "bloqueado",
  },
  {
    pais: "Canadá",
    bandeira: "ca",
    desafios: 10,
    progresso: 0,
    status: "bloqueado",
  },
  {
    pais: "Mundo",
    desafios: 10,
    progresso: 0,
    status: "bloqueado",
  },
];

function Niveis() {
  const navigate = useNavigate();
  const carrosselRef = useRef(null);
  const [arrastando, setArrastando] = useState(false);
  const inicioArraste = useRef({ x: 0, scrollLeft: 0 });
  const dados = localStorage.getItem("desafios");
  const dadosDesafio = JSON.parse(dados);

  const concluidos = dadosDesafio.filter(
    (desafio) => desafio.status === "concluido",
  ).length;

  const niveisExibidos = [
    {
      pais: "Brasil",
      bandeira: "br",
      desafios: 10,
      progresso: concluidos,
      status: "andamento",
    },
    ...niveis,
  ];

  // Sem esta trava, soltar o ponteiro depois de arrastar conta como clique e
  // abre a trilha sem querer.
  const arrastou = useRef(false);

  function iniciarArraste(event) {
    if (!carrosselRef.current) return;
    setArrastando(true);
    arrastou.current = false;
    inicioArraste.current = {
      x: event.clientX,
      scrollLeft: carrosselRef.current.scrollLeft,
    };
  }

  function encerrarArraste() {
    setArrastando(false);
  }

  useEffect(() => {
    if (!arrastando) return;

    function mover(event) {
      if (!carrosselRef.current) return;
      const distancia = event.clientX - inicioArraste.current.x;
      if (Math.abs(distancia) > 4) arrastou.current = true;
      carrosselRef.current.scrollLeft =
        inicioArraste.current.scrollLeft - distancia;
    }

    function encerrar() {
      setArrastando(false);
    }

    window.addEventListener("pointermove", mover);
    window.addEventListener("pointerup", encerrar);
    window.addEventListener("pointercancel", encerrar);

    return () => {
      window.removeEventListener("pointermove", mover);
      window.removeEventListener("pointerup", encerrar);
      window.removeEventListener("pointercancel", encerrar);
    };
  }, [arrastando]);

  function abrirNivel() {
    if (arrastou.current) return;
    navigate("/trilha/brasil");
  }

  return (
    <div className={estilo.pagina}>
      <Navbar />

      <div className={estilo.containerMain}>
        <main className={estilo.conteudo}>
          <section className={estilo.boasVindas}>
            <p className={estilo.sobrancelha}>MAPA DE APRENDIZADO</p>
            <h1>Bem-vindo</h1>
            <p>
              Escolha seu próximo território e continue construindo seu
              raciocínio.
            </p>
          </section>

          <section className={estilo.metricas} aria-label="Resumo da jornada">
            <article className={estilo.metrica}>
              <span className={estilo.metricaRotulo}>DESAFIOS CONCLUÍDOS</span>
              <strong>{concluidos}</strong>
              <span className={estilo.metricaDetalhe}>
                de 100 desafios na jornada
              </span>
            </article>
            {/* <article className={estilo.metrica}>
            <span className={estilo.metricaRotulo}>TEMPO MÉDIO</span>
            <strong>08 min</strong>
            <span className={estilo.metricaDetalhe}>para resolver cada desafio</span>
          </article> */}
          </section>

          <section className={estilo.secaoNiveis}>
            <div className={estilo.tituloSecao}>
              <div>
                <p className={estilo.sobrancelha}>PONTOS DA JORNADA</p>
                <h2>Escolha um território</h2>
              </div>
              <span className={estilo.contagem}>10 territórios</span>
            </div>

            <div
              className={`${estilo.carrossel} ${arrastando ? estilo.arrastando : ""}`}
              ref={carrosselRef}
              onPointerDown={iniciarArraste}
              onPointerUp={encerrarArraste}
              onPointerCancel={encerrarArraste}
            >
              {niveisExibidos.map((item, indice) => (
                <CartaoNivel
                  key={item.pais}
                  nivel={item}
                  onAbrir={abrirNivel}
                  deslocado={indice % 2 !== 0}
                />
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default Niveis;
