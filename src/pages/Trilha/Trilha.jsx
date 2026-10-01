import { useNavigate, useParams } from "react-router";
import CartaoDesafio from "../../components/CartaoDesafio/CartaoDesafio";
import Navbar from "../../components/Navbar/Navbar";
import baseUrl from "../../utils/baseUrl";
import Computador from "./components/Computador/Computador";
import Controle from "./components/Controle/Controle";
import JanelaEditor from "./components/JanelaEditor/JanelaEditor";
import { Lampada01, Lampada02 } from "./components/Lampada/Lampada";
import Livros from "./components/Livros/Livros";
import Note from "./components/Note/Note";
import { Numero01, Numero02, Numero03, Numero04, Numero05, Numero06, Numero07, Numero08, Numero09, Numero10 } from "./components/Numeros/Numeros";
import Prompt from "./components/Prompt/Prompt";
import Seta from "./components/Seta/Seta";
import Seta01 from "./components/Seta01/Seta01";
import Seta02 from "./components/Seta02/Seta02";
import { SimboloProgramacao01, SimboloProgramacao02 } from "./components/SimbolosProgramacao/SimbolosProgramacao";
import SimboloTradutor from "./components/SimboloTradutor/SimboloTradutor";
import Teclado from "./components/Teclado/Teclado";
import Text01 from "./components/Text01/Text01";
import Text02 from "./components/Text02/Text02";
import Text03 from "./components/Text03/Text03";
import Text04 from "./components/Text04/Text04";
import Text05 from "./components/Text05/Text05";
import Text06 from "./components/Text06/Text06";
import Text07 from "./components/Text07/Text07";
import Text08 from "./components/Text08/Text08";
import Text09 from "./components/Text09/Text09";
import Text10 from "./components/Text10/Text10";
import Processador from "./components/Processador/Processador";
import Programador from "./components/Programador/Programador";
import Cerebro from "./components/Cerebro/Cerebro";
import Mouse from "./components/Mouse/Mouse";
import Globo from "./components/Globo/Globo";
import Foguete from "./components/Foguete/Foguete";
import estilo from "./Trilha.module.css";

const desafios = [
  { numero: 1, nome: "A primeira instrução", status: "concluido" },
  { numero: 2, nome: "Mostrando uma mensagem", status: "concluido" },
  { numero: 3, nome: "Seu primeiro desafio", status: "atual" },
  { numero: 4, nome: "Guardando uma ideia", status: "bloqueado" },
  { numero: 5, nome: "Perguntando ao usuário", status: "bloqueado" },
  { numero: 6, nome: "Organizando valores", status: "bloqueado" },
  { numero: 7, nome: "Tomando uma decisão", status: "bloqueado" },
  { numero: 8, nome: "Repetindo uma tarefa", status: "bloqueado" },
  { numero: 9, nome: "Juntando as ideias", status: "bloqueado" },
  { numero: 10, nome: "Primeira missão completa", status: "bloqueado" },
];

const territorios = {
  brasil: {
    nome: "Brasil",
    bandeira: "br",
    nivel: "Nível 1",
    titulo: "Primeiros passos",
    descricao:
      "Descubra como transformar uma ideia simples em uma instrução para o computador.",
  },
};

// Cada seção da trilha tem uma curva PRÓPRIA, retirada da referência.
// É por isso que elas não podem ser geradas em loop.

const curva01 = {
  base: "M55.02 678.9v-10.02c0-179 147-190.61 193.6-194.65 46.6-4.04 123.39-15.83 422-15.83s317.66-194.63 235.24-280.28c-82.42-85.66-330.6-109.35-559.81-67.08-219.92 40.55-194.35 246.89 7.09 214.89",
  tracejado:
    "M64.38 598.18c33.09-111.66 144.74-120.52 184.24-123.95 46.6-4.04 123.39-15.83 422-15.83s317.66-194.63 235.24-280.28c-82.42-85.66-330.6-109.35-559.81-67.08-203.92 37.6-196.77 217.76-34.04 218.25",
  dasharray: "0 0 2.01 80.58",
};

const curva02 = {
  base: "M55.02-13V3.02c0 111.82 62.07 146.71 80.97 159.08 78.85 51.6 203.97 48.46 297.62 38.03 93.66-10.43 186.04-29.63 279.68-40.2 162.65-18.36 273.26-18.58 316.14 10.77 48.01 32.87 81.35 75.75 81.35 143.36 0 4.56-.02 12.12-.04 21.96",
  tracejado:
    "M63.12 66.96c17.44 62.32 58.19 85.53 72.88 95.15 78.85 51.6 203.97 48.46 297.62 38.03 93.66-10.43 186.04-29.63 279.68-40.2 162.65-18.36 273.26-18.58 316.14 10.77 43.39 29.71 74.8 67.59 80.44 124.52",
};

const curva03 = {
  base: "M1110.76-6.8c.01 9.87.04 17.67.08 22.76.71 76.63-37 106.87-68.52 127.12-71.42 45.88-295.2-45.94-464.92 63.36-169.7 109.31-522.39-96.53-522.39 157.9 0 5.53.02 17.56.02 17.56",
  tracejado:
    "M1102.96 71.53c-12.62 37.67-38.19 57.14-60.63 71.55-71.42 45.88-295.2-45.94-464.92 63.36-164.42 105.9-500.6-84.01-521.39 135.42",
};

const curva04 = {
  base: "M54.97-6.72c.04 9.34.06 17.14.06 23.02 0 250 382.68 132.58 504.48 104.95C681.3 93.62 796.87 40.24 972.45 64.71c175.59 24.47 199.19 300.52-16.76 354.97-215.95 54.45-352.24-226.63-525.28-106.12C249.63 439.45 54.95 178.42 54.95 487.19c0 5.75.01 13.07.04 21.51",
};

const curva05 = {
  base: "M1110.76 287.51c-.03-31.46.55-62.21.45-101.33-.38-147.38-133.73-173.98-368.73-62.71-191.3 90.58-687.46 218.08-687.46-90.74v-43.47",
};

// Traços verticais: um em x=55 (esquerda) e outro em x=1110.76 (direita)
const conectorEsquerda = {
  base: "M55.02-45.82v2963.28",
  tracejado: "M55.02 5.07v2912.39",
  dasharray: "0 0 2 100",
};

const conectorDireita = {
  base: "M1110.76-2.82v2919.84",
  tracejado: "M1110.76 4.95v2912.07",
  dasharray: "0 0 2 100",
};

// Na chegada o traço PARA no topo da placa em vez de seguir até o fim da seção.
// Se ele descesse até lá, reapareceria nos vãos ao lado do chevron, que é
// estreito na ponta — e a única forma de escondê-lo seria cortar a ponta.
const conectorChegada = {
  base: "M1110.76-2.82v436.2",
  tracejado: "M1110.76 4.95v428.4",
  dasharray: "0 0 2 100",
};

// As quatro camadas de traçado, na ordem em que a referência empilha:
// contorno bege → contorno carvão → caminho creme → tracejado do jogo.
// O tracejado NÃO pode ser sólido: ele é desenhado com a mesma espessura do
// caminho creme e cobriria o bege por completo.
function Traco({ base, tracejado = base, dasharray = "0 0 2 100" }) {
  return (
    <>
      <g className={estilo.beigeStroke}>
        <path d={base} />
      </g>
      <g className={estilo.charcoalOutline}>
        <path d={base} />
      </g>
      <g className={estilo.beigePath}>
        <path d={base} />
      </g>
      <g className={estilo.gameLines}>
        <path d={tracejado} strokeDasharray={dasharray} />
      </g>
    </>
  );
}

function Trilha() {
  const { pais = "brasil" } = useParams();
  const navigate = useNavigate();
  const territorio = territorios[pais] || territorios.brasil;
  const concluidos = desafios.filter(
    (desafio) => desafio.status === "concluido",
  ).length;
  const progresso = Math.round((concluidos / desafios.length) * 100);

  function abrirDesafio(desafio) {
    navigate("/editor");
    // if (desafio.status === "atual") {
      
    // }
  }

  return (
    <div className={estilo.pagina}>
      <Navbar voltarPara="/niveis" />

      <main className={estilo.conteudo}>
        <section>
          <div className={estilo.resumo}>
            <div className={estilo.identidadeNivel}>
              <img
                src={`${baseUrl}flag/${territorio.bandeira}.svg`}
                alt={`Bandeira de ${territorio.nome}`}
              />
              <div>
                <p className={estilo.eyebrow}>
                  {territorio.nome}
                </p>
                <h1>{territorio.titulo}</h1>
                <p>{territorio.descricao}</p>
              </div>
            </div>
            <div className={estilo.progressoResumo}>
              <span>PROGRESSO DA TRILHA</span>
              <strong>{progresso}%</strong>
              <div
                className={estilo.progressoBarra}
                aria-label={`${progresso}% concluído`}
              >
                <span style={{ width: `${progresso}%` }} />
              </div>
              <small>
                {concluidos} de {desafios.length} desafios concluídos
              </small>
            </div>
          </div>

          <div className={estilo.tituloSecao}>
            <div>
              <p className={estilo.eyebrow}>CAMINHO DE APRENDIZADO</p>
              <h2 id="titulo-trilha">Siga sua trilha</h2>
            </div>
            <span>{desafios.length} desafios</span>
          </div>
        </section>

        <section className={estilo.secaoTrilha} aria-labelledby="titulo-trilha">
          <div className={estilo.boardGame}>
            <article className={`${estilo.boardSection} ${estilo.board01}`}>
              <div className={estilo.boardGraphic}>
                <svg
                  className={estilo.caminho}
                  viewBox="0 0 1166 716"
                  preserveAspectRatio="none"
                  role="img"
                  aria-labelledby="trilha-svg-title trilha-svg-desc"
                >
                  <title id="trilha-svg-title">Percurso dos desafios</title>
                  <desc id="trilha-svg-desc">
                    Caminho visual que conecta os dez desafios da trilha.
                  </desc>

                  <Traco
                    base={curva01.base}
                    tracejado={curva01.tracejado}
                    dasharray={curva01.dasharray}
                  />
                  <g>
                    <path
                      fill="#0ba95b"
                      stroke="#231f20"
                      strokeLinejoin="round"
                      strokeWidth="5"
                      d="m328.66 384.25-30.05-49.89 13.59-56.64 42.54-6.57 16.46 106.53-42.54 6.57z"
                    />
                    {/* letreiro na mesma posição e rotação do "START" original */}
                    <text
                      className={estilo.placaInicio}
                      transform="translate(336.5 328.2) rotate(-95)"
                      textAnchor="middle"
                      dominantBaseline="central"
                    >
                      INÍCIO
                    </text>
                  </g>
                  <Prompt x={190} y={240} tamanho={0.5} />
                  <Seta x={871} y={201} tamanho={1} />
                  <JanelaEditor x={370} y={110} tamanho={0.4} />
                  <Controle x={790} y={445} tamanho={0.5} />

                  <SimboloTradutor x={85} y={570} tamanho={0.45} />
                  <Note x={305} y={485} tamanho={0.55} />
                  <Numero01 x={540} y={91} tamanho={0.7} />

                  {/* provisório: x/y = CENTRO da peça, tamanho = escala */}
                  <Text01 x={550} y={460} tamanho={1} />    
                  <SimboloProgramacao01 x={660} y={95} tamanho={0.3} />
                  <SimboloProgramacao02 x={905} y={390} tamanho={0.3} />   
                  <SimboloProgramacao01 x={178} y={490} tamanho={0.3} />           
                </svg>
              </div>

              <CartaoDesafio
                desafio={desafios[0]}
                onAbrir={abrirDesafio}
                slot={estilo.slot1}
              />
            </article>

            {/* ângulo 1: o traço desce pela esquerda até o próximo vão */}
            <article
              className={`${estilo.boardSection} ${estilo.boardConector}`}
            >
              <div className={estilo.boardGraphic}>
                <svg
                  className={estilo.caminho}
                  viewBox="0 0 1166 716"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <Traco
                    base={conectorEsquerda.base}
                    tracejado={conectorEsquerda.tracejado}
                    dasharray={conectorEsquerda.dasharray}
                  />

                  <Numero02 x={55} y={70} tamanho={0.7}/>
                  <Text03 x={55} y={340} tamanho={1} />
                  
                </svg>
              </div>
              <CartaoDesafio
                desafio={desafios[1]}
                onAbrir={abrirDesafio}
                slot={estilo.slot2}
              />
              <CartaoDesafio
                desafio={desafios[2]}
                onAbrir={abrirDesafio}
                slot={estilo.slot3}
              />
            </article>

            {/* curva 2: o traço atravessa da esquerda para a direita */}
            <div className={`${estilo.boardSection} ${estilo.board02}`}>
              <div className={estilo.boardGraphic}>
                <svg
                  className={estilo.caminho}
                  viewBox="0 0 1166 334"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <Traco base={curva02.base} tracejado={curva02.tracejado} />
                  <Seta01 x={150} y={122} tamanho={1} rotacao={0}/>
                  <Text04 x={500} y={193} tamanho={1.1} rotacao={-6}/>
                  <Numero03 x={870} y={148} tamanho={0.7} />
                   <Cerebro x={1060} y={195} tamanho={0.45} />
                  <SimboloProgramacao02 x={715} y={160} tamanho={0.3} />   
                  
                </svg>
              </div>
            </div>

            {/* ângulo 2: o traço desce pela direita */}
            <article
              className={`${estilo.boardSection} ${estilo.boardConector}`}
            >
              <div className={estilo.boardGraphic}>
                <svg
                  className={estilo.caminho}
                  viewBox="0 0 1166 716"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <Traco
                    base={conectorDireita.base}
                    tracejado={conectorDireita.tracejado}
                    dasharray={conectorDireita.dasharray}
                  />
                  <Numero04 x={1111} y={110} tamanho={0.7} />
                  <Livros x={1111} y={355} tamanho={0.5} />
                  <SimboloProgramacao01 x={1111} y={210} tamanho={0.3}/>
                </svg>
              </div>
              <CartaoDesafio
                desafio={desafios[3]}
                onAbrir={abrirDesafio}
                invertido
                slot={estilo.slot4}
              />
              <CartaoDesafio
                desafio={desafios[4]}
                onAbrir={abrirDesafio}
                invertido
                slot={estilo.slot5}
              />
            </article>

            {/* curva 3: o traço volta da direita para a esquerda */}
            <div className={`${estilo.boardSection} ${estilo.board03}`}>
              <div className={estilo.boardGraphic}>
                <svg
                  className={estilo.caminho}
                  viewBox="0 0 1166 376"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <Traco base={curva03.base} tracejado={curva03.tracejado} />
                  <Numero05 x={294} y={234} tamanho={0.7} />
                   <Teclado x={490} y={235} tamanho={0.45} />
                   <Seta02 x={125} y={250} tamanho={1} rotacao={0}/>
                  <Text05 x={800} y={154} tamanho={1} />
                   <SimboloProgramacao02 x={632} y={180} tamanho={0.3} />
                    <Mouse x={1075} y={117} tamanho={0.45} />
                </svg>
              </div>
            </div>

            {/* ângulo 3: o traço desce pela esquerda */}
            <article
              className={`${estilo.boardSection} ${estilo.boardConector}`}
            >
              <div className={estilo.boardGraphic}>
                <svg
                  className={estilo.caminho}
                  viewBox="0 0 1166 716"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <Traco
                    base={conectorEsquerda.base}
                    tracejado={conectorEsquerda.tracejado}
                    dasharray={conectorEsquerda.dasharray}
                  />
                  <Numero06 x={55} y={150} tamanho={0.7} />
                  <Text06 x={55} y={370} tamanho={1} />
                </svg>
              </div>
              <CartaoDesafio
                desafio={desafios[5]}
                onAbrir={abrirDesafio}
                slot={estilo.slot6}
              />
              <CartaoDesafio
                desafio={desafios[6]}
                onAbrir={abrirDesafio}
                slot={estilo.slot7}
              />
            </article>

            {/* curva 4: a mais longa, com dois laços */}
            <div className={`${estilo.boardSection} ${estilo.board04}`}>
              <div className={estilo.boardGraphic}>
                <svg
                  className={estilo.caminho}
                  viewBox="0 0 1166 496"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <Traco base={curva04.base} />
                  <Text07 x={500} y={135} tamanho={1} rotacao={-12}/>
                   <Seta01 x={170} y={120} tamanho={1} rotacao={-17}/>
                   <Numero07 x={900} y={59} tamanho={0.7} />
                  <Computador x={1080} y={130} tamanho={0.5} />
                  <Lampada01 x={1085} y={320} tamanho={0.5} />
                  <Text08 x={790} y={357} tamanho={1} />
                  <SimboloProgramacao01 x={745} y={75} tamanho={0.3} />
                  <Numero08 x={300} y={351} tamanho={0.7} />
                  <SimboloProgramacao02 x={400} y={332} tamanho={0.3} />
                  <Seta02 x={105} y={350} tamanho={1} rotacao={-5}/>
                  
                </svg>
              </div>
            </div>

            {/* ângulo 4: o traço desce pela esquerda */}
            <article
              className={`${estilo.boardSection} ${estilo.boardConector}`}
            >
              <div className={estilo.boardGraphic}>
                <svg
                  className={estilo.caminho}
                  viewBox="0 0 1166 716"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <Traco
                    base={conectorEsquerda.base}
                    tracejado={conectorEsquerda.tracejado}
                    dasharray={conectorEsquerda.dasharray}
                  />

                  <Foguete x={55} y={55} tamanho={0.6} />
                  {/* <Lampada02 x={55} y={50} tamanho={0.5} /> */}
                  <Text09 x={55} y={360} tamanho={1} />

                </svg>
              </div>
              <CartaoDesafio
                desafio={desafios[7]}
                onAbrir={abrirDesafio}
                invertido
                slot={estilo.slot8}
              />
              <CartaoDesafio
                desafio={desafios[8]}
                onAbrir={abrirDesafio}
                invertido
                slot={estilo.slot9}
              />
            </article>

            {/* curva 5: sobe pela direita e fecha a trilha na esquerda */}
            <div className={`${estilo.boardSection} ${estilo.board05}`}>
              <div className={estilo.boardGraphic}>
                <svg
                  className={estilo.caminho}
                  viewBox="0 0 1166 276"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <Traco base={curva05.base} />
                  <Text10 x={460} y={212} tamanho={1} rotacao={-10}/>
                  <Processador x={742} y={122} tamanho={0.45} rotacao={-22}/>
                  <Seta01 x={170} y={170} tamanho={1} rotacao={-15}/>
                  <Numero09 x={989} y={56} tamanho={0.7} />
                  <SimboloProgramacao01 x={885} y={70} tamanho={0.3} />
                  <SimboloProgramacao02 x={1080} y={85} tamanho={0.3} />
                </svg>
              </div>
            </div>

            {/* chegada: o último desafio */}
            <article
              className={`${estilo.boardSection} ${estilo.boardConector}`}
            >
              <div className={estilo.boardGraphic}>
                <svg
                  className={estilo.caminho}
                  viewBox="0 0 1166 500"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <Traco
                    base={conectorChegada.base}
                    tracejado={conectorChegada.tracejado}
                    dasharray={conectorChegada.dasharray}
                  />
                  <Numero10 x={1111} y={205} tamanho={0.7} />
                  <Programador x={1111} y={50} tamanho={0.6} />
                  <Globo x={1111} y={360} tamanho={0.6} />
                  
                  <g>
                    <path
                      fill="#12b2e2"
                      stroke="#231f20"
                      strokeLinejoin="round"
                      strokeWidth="5"
                      d="m1162.61 476.37-53.9 22.06-53.89-22.11.02-43.04 107.79.04-.02 43.05z"
                    />
                    {/* texto de verdade em vez do contorno vetorial das letras */}
                    <text
                      className={estilo.placaTexto}
                      textAnchor="middle"
                      x="1108.4"
                      y="466.7"
                    >
                      PRÓXIMO
                    </text>
                  </g>
                </svg>
              </div>
              <CartaoDesafio
                desafio={desafios[9]}
                onAbrir={abrirDesafio}
                slot={estilo.slot10}
              />
            </article>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Trilha;
