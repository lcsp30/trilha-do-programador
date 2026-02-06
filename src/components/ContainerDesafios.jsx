import estilo from "./cssComponents/estiloContainerDesafios.module.css";
import Markdown from 'react-markdown';
import { useNavigate } from "react-router";

import bandeiraBrasil from "../assets/brBandeira.jpg";
import bandeiraUsa from "../assets/usaBandeira.jpeg";
import bandeiraFranca from "../assets/francaBandeirajpg.jpg";
import bandeiraItalia from "../assets/italiaBandeira.jpg";
import bandeiraJapao from "../assets/japaoBandeira.jpg";

function ContainerDesafios({dadosDesafios, index}) {
  const nav = useNavigate();

  const bandeira = [bandeiraBrasil, bandeiraUsa, bandeiraFranca, bandeiraItalia, bandeiraJapao];

  function clicado(index){
    console.log(dadosDesafios[index]);
    nav('/codigos', {state: dadosDesafios[index]});
  }

  return (
    <div className="container mt-5">


      <div className="row mt-5" style={{cursor: "pointer"}} onClick={() => clicado(0)}>
        <div
          className="col-2 p-3 rounded-2  d-flex align-items-center justify-content-center"
          style={{ backgroundColor: "#2D3561"}}
        >
          <div className={estilo.caixa1}>
            <img className={estilo.img1} src={bandeira[index]} alt="" />
          </div>
        </div>
        <div
          className="col-4 p-3 rounded-2 d-flex flex-column align-items-center"
          style={{ backgroundColor: "#2D3561"}}
        >
          <h5 className="text-center text-white">{dadosDesafios[0].titulo}</h5>
          <div className={estilo.contexto}>
            <Markdown>{dadosDesafios[0].contexto}</Markdown>
            {/* João foi a Padaria de Maria e comprou <b>5 pães</b>, onde a unidade do Pão custa <b>R$ 1,00</b>. */}
          </div>
          <div className="m-1 text-white">
            <p className="m-0"><b>Desafio:</b></p>
            <Markdown>{dadosDesafios[0].desafio}</Markdown>
            {/* Você deve elaborar um código que calcule e mostre o <b>valor total</b> que João deve pagar.  */}
            </div>
        </div>
      </div>


      <div className="row mt-5 justify-content-end" style={{cursor: "pointer"}} onClick={() => clicado(1)}>
         <div
          className="col-4 p-3 rounded-2 d-flex flex-column align-items-center"
          style={{ backgroundColor: "#2D3561"}}
        >
          <h5 className="text-center text-white">{dadosDesafios[1].titulo}</h5>
          <div className={estilo.contexto}>
            <Markdown>{dadosDesafios[1].contexto}</Markdown>
          </div>
          <div className="m-1 text-white">
            <p className="m-0"><b>Desafio:</b></p>
            <div className={estilo.contexto}><Markdown>{dadosDesafios[1].desafio}</Markdown></div>
            </div>
        </div>
        <div
          className="col-2 p-3 rounded-2  d-flex align-items-center justify-content-center"
          style={{ backgroundColor: "#2D3561" }}
        >
          <div className={estilo.caixa1}>
            <img className={estilo.img1} src={bandeira[index]} alt="" />
          </div>
        </div>
      </div>


      <div className="row mt-5" style={{cursor: "pointer"}} onClick={() => clicado(2)}>
        <div
          className="col-2 p-3 rounded-2  d-flex align-items-center justify-content-center"
          style={{ backgroundColor: "#2D3561" }}
        >
          <div className={estilo.caixa1}>
            <img className={estilo.img1} src={bandeira[index]} alt="" />
          </div>
        </div>
        <div
          className="col-4 p-3 rounded-2 d-flex flex-column align-items-center"
          style={{ backgroundColor: "#2D3561"}}
        >
          <h5 className="text-center text-white">{dadosDesafios[2].titulo}</h5>
          <div className={estilo.contexto}>
            <Markdown>{dadosDesafios[2].contexto}</Markdown>
          </div>
          <div className="m-1 text-white">
            <p className="m-0"><b>Desafio:</b></p>
             <div className={estilo.contexto}><Markdown>{dadosDesafios[2].desafio}</Markdown></div>
            </div>
        </div>
      </div>


      <div className="row mt-5 justify-content-end" style={{cursor: "pointer"}} onClick={() => clicado(3)}>
       <div
          className="col-4 p-3 rounded-2 d-flex flex-column align-items-center"
          style={{ backgroundColor: "#2D3561"}}
        >
          <h5 className="text-center text-white">{dadosDesafios[3].titulo}</h5>
          <div className={estilo.contexto}>
            <Markdown>{dadosDesafios[3].contexto}</Markdown>
          </div>
          <div className="m-1 text-white">
            <p className="m-0"><b>Desafio:</b></p> 
            <Markdown>{dadosDesafios[3].desafio}</Markdown> 
            </div>
        </div>
        <div
          className="col-2 p-3 rounded-2  d-flex align-items-center justify-content-center"
          style={{ backgroundColor: "#2D3561" }}
        >
          <div className={estilo.caixa1}>
            <img className={estilo.img1} src={bandeira[index]} alt="" />
          </div>
        </div>
      </div>


      <div className="row mt-5" style={{cursor: "pointer"}} onClick={() => clicado(4)}>
        <div
         className="col-2 p-3 rounded-2  d-flex align-items-center justify-content-center"
          style={{ backgroundColor: "#2D3561" }}
        >
          <div className={estilo.caixa1}>
            <img className={estilo.img1} src={bandeira[index]} alt="" />
          </div>
        </div>
        <div
          className="col-4 p-3 rounded-2 d-flex flex-column align-items-center"
          style={{ backgroundColor: "#2D3561"}}
        >
          <h5 className="text-center text-white">{dadosDesafios[4].titulo}</h5>
          <div className={estilo.contexto}>
            <Markdown>{dadosDesafios[4].contexto}</Markdown>
            </div>
          <div className="m-1 text-white">
            <p className="m-0"><b>Desafio:</b></p> 
            <Markdown>{dadosDesafios[4].desafio}</Markdown>
            </div>
        </div>
      </div>
    </div>
  );
}

export default ContainerDesafios;
