
import Footer from './../components/footer/Footer';
import React from 'react';
import logoms from "./../assets/images/logo.png";

const Mainpage = () => {
    return (
        <>
        <div className="container_main">
            <img src={logoms} alt="Логотип Rings of Wisdom" className="logoms"  />
  
            <div className="text-container_main">
            <p className="description_main">
                Вебсервис на ASP.NET core версии 4.8 для обучения основам игры в ЧГК.<br />
                    <span className="highlight-text">По механикам за основу взят <a href="https://gomagic.org" target="_blank" rel="noopener noreferrer" style={{textDecoration: 'none', color: '#5a47b3',}}>GO MAGIC</a>.</span>
            </p>
    
                <div className="goal-container_main">
                    <div className="goal-header">
                        <h2>Цель проекта</h2>
                    </div>
                     <p className="goal-text_main">
                        Предоставить образовательную программу по игре ЧГК в удобной форме древа навыков.
                    </p>
                </div>
            </div>
        </div>
        <Footer/>
        </>
    );
};


export default Mainpage;