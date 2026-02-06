import { useState } from 'react';
import './estiloSlides.css';
import { Navigation, EffectCoverflow, EffectCreative} from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';
import 'swiper/css/effect-creative';
import estilo from'./App.module.css';
import ContainerDesafios from '../components/ContainerDesafios';
import dados from "../dadosDesafios.json";

import brDiv from "../assets/brDiv.jpg";
import usaDiv from "../assets/usaDiv2.jpg";
import francaDiv from "../assets/francaDiv2.jpg";
import italiaDiv from "../assets/italiaDiv.jpg";
import japaoDiv from "../assets/japaoDiv.jpg";


function App() {

  const imagem = [brDiv, usaDiv, francaDiv, italiaDiv, japaoDiv];
  const indexPais = ['brasil', 'usa', 'franca', 'italia', 'japao'];
  const [count, setCount] = useState(imagem[0]);
  const [pais, setPais] = useState(indexPais[0]);
  const [indexDesafio, setIndexDesafio] = useState(0);

  return (
    <div className={estilo.containerBody}>
      <header className={estilo.headerNav}>
        <div className="d-flex align-items-center">
          <h3 style={{color:"white", margin: "0"}}>Trilha do Programador</h3>
        </div>
          <nav className={estilo.navLinks}>
          <a className={estilo.links} href="">Home</a>
          <a className={estilo.links} href="">Documentação</a>
          <a className={estilo.links} href="">Sobre</a>
          <button className={estilo.btnNav}>Aprender</button>
          </nav>
      </header>
      <div className={estilo.divTitulo}>
        <div className={estilo.divTextos}>
        <h1 className={estilo.titulo}>Trilha do <br /> Programador</h1>
        <p className={estilo.subTitulo}>Inicie sua jornada na Progamação</p>
        </div>
        <div className={estilo.divBtnDesafio}>
          <button className={estilo.btnDesafio}>Desafios <br /> ↓</button>
        </div>
      </div>
      <div className="container-fluid pb-4 text-center d-flex align-items-center flex-column" style={{background: "linear-gradient(180deg,rgba(27, 30, 79, 1) 5%, rgba(0, 4, 5, 0.93) 100%)", height: "75vh"}}>
        <div style={{color: "white", textAlign: "left", width: "100%"}}>
          <div className="ms-5">
              <h1 style={{fontSize: "70px"}}>Desafios</h1>
              <p style={{marginLeft: "10px"}}>Ecolha seu desafio e começe a Programar</p>
          </div>
        </div>
        <div className={estilo.divTodosDesafios} style={{backgroundImage:`url(${count})`}}>
          <Swiper
            // install Swiper modules
      modules={[Navigation, EffectCoverflow, EffectCreative]}
      effect={'coverflow'}
      spaceBetween={30}
      slidesPerView={4}
      centeredSlides={true}
       coverflowEffect={{
          depth: 50,
          rotate: 0,
          slideShadows: false,
        }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={(swiper) => {
        setCount(imagem[swiper.activeIndex]);
        setPais(indexPais[swiper.activeIndex]);
        setIndexDesafio(swiper.activeIndex);
        console.log('Slide atual:', swiper.activeIndex);
        console.log(dados[indexPais[swiper.activeIndex]]);
          }}
          >
            <SwiperSlide>
               <div className={`${estilo.divDesafio} ${estilo.divBr}`} >
                <div className={estilo.divTituloDesafio}>
                  <p style={{margin: "0", fontSize: "20px"}}>Desafio Brasil</p>
                </div>
               </div>
               </SwiperSlide>
            <SwiperSlide> 
              <div className={`${estilo.divDesafio} ${estilo.divUsa}`}>
                <div className={estilo.divTituloDesafio}>
                  <p style={{margin: "0", fontSize: "20px"}}>Desafio USA</p>
                </div>
              </div>
              </SwiperSlide>
            <SwiperSlide> 
              <div className={`${estilo.divDesafio} ${estilo.divFranca}`}>
                <div className={estilo.divTituloDesafio}>
                  <p style={{margin: "0", fontSize: "20px"}}>Desafio França</p>
                </div>
              </div>
              </SwiperSlide>
            <SwiperSlide> 
               <div className={`${estilo.divDesafio} ${estilo.divItalia}`}>
                <div className={estilo.divTituloDesafio}>
                  <p style={{margin: "0", fontSize: "20px"}}>Desafio Italia</p>
                </div>
              </div>
              </SwiperSlide>
            <SwiperSlide> 
              <div className={`${estilo.divDesafio} ${estilo.divJapao}`}>
                <div className={estilo.divTituloDesafio}>
                  <p style={{margin: "0", fontSize: "20px"}}>Desafio Japão</p>
                </div>
              </div>
              </SwiperSlide>
          </Swiper>
        </div>
      </div>
      <div className={estilo.divSesao1}>
    <ContainerDesafios dadosDesafios={dados[pais]} index={indexDesafio} />
      </div>
    </div>
  )
}

export default App
