
import Footer from './../components/footer/Footer';
import React from 'react';
import logom from "./../assets/images/logo.png";

const Mainpage = () => {
    return (
        <>
        <div className="container_main">
            <img src={logom} alt="Логотип Rings of Wisdom" className="logom" />
            
            <div className="text-container_main">
                <p className="description_main">
                    Вебсервис на ASP.NET core версии 4.8 для обучения основам игры в ЧГК. По механикам за основу взят GO MAGIC.
                </p>
                
                <div className="goal-container_main">
                    <h2>Цель</h2>
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