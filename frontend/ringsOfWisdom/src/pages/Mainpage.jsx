<<<<<<< HEAD
import logom from"./../assets/images/logo.png";
import Footer from './../components/footer/Footer';

=======
>>>>>>> ecb6bb7d3f2986624d312b0b4b1583d5c9a7daa1
import React from 'react';
import logom from "./../assets/images/logo.png";

const Mainpage = () => {
<<<<<<< HEAD
    
    return ( 
    <>
    <div className="container">
        <img src={logom} alt="Логотип Rings of Wisdom" className="logom"/>
        
        
        
    </div>  
    <Footer/>
    </>
     );
}
 
=======
    return (
        <div className="container">
            <img src={logom} alt="Логотип Rings of Wisdom" className="logom" />
            
            <div className="text-container">
                <p className="description">
                    Вебсервис на ASP.NET core версии 4.8 для обучения основам игры в ЧГК. По механикам за основу взят GO MAGIC.
                </p>
                
                <div className="goal-container">
                    <h2>Цель</h2>
                    <p className="goal-text">
                        Предоставить образовательную программу по игре ЧГК в удобной форме древа навыков.
                    </p>
                </div>
            </div>
        </div>
    );
};

>>>>>>> ecb6bb7d3f2986624d312b0b4b1583d5c9a7daa1
export default Mainpage;