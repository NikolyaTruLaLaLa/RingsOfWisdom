import React from 'react';
import './../assets/style/type_and_types.css';
import baza from './../assets/images/baza.png';
import razdatka from './../assets/images/razdatka.png';
import zamena from './../assets/images/zamena.png';
import blatie_nomera from './../assets/images/blatie_nomera.png';
import razdatOCHKA from './../assets/images/razdatOCHKA.png';
import zamena_zamen from './../assets/images/zamena_zamen.png';
import svyazannye from './../assets/images/svyazannye.png';
import kot from './../assets/images/kot.png'; 
import frazochki from './../assets/images/frazochki.png';
import blitz from './../assets/images/blitz.png';

const Type_and_Types = () => {
    
    return ( 
        <div className="skill-tree">
            <p className="page-title">Типы типочки</p>
            
            {/* Первый ряд (1 кружок) */}
            <div className="skill-row">
                <div className="circle-container">
                    <div className="circle">
                        <img src={baza} alt="БАЗА" />
                    </div>
                    <p>БАЗА</p>
                </div>
            </div>

            {/* Второй ряд (2 кружка) */}
            <div className="skill-row">
                <div className="circle-container">
                    <div className="circle">
                        <img src={razdatka} alt="Раздатка" />
                    </div>
                    <p>Раздатка</p>
                </div>
                <div className="circle-container">
                    <div className="circle">
                        <img src={zamena} alt="Замена" />
                    </div>
                    <p>Замена</p>
                </div>
            </div>

            {/* Третий ряд (2 кружка) */}
            <div className="skill-row">
                <div className="circle-container">
                    <div className="circle">
                        <img src={blatie_nomera} alt="Блатные номера" />
                    </div>
                    <p>Блатные<br/>номера</p>
                </div>
                <div className="circle-container">
                    <div className="circle">
                        <img src={razdatOCHKA} alt="РаздатОЧКА" />
                    </div>
                    <p>РаздатОЧКА</p>
                </div>
            </div>

            {/* Четвертый ряд (2 кружка) */}
            <div className="skill-row">
                <div className="circle-container">
                    <div className="circle">
                        <img src={zamena_zamen} alt="Замена замен замены замен" />
                    </div>
                    <p>Замена замен<br/>замены замен</p>
                </div>
                <div className="circle-container">
                    <div className="circle">
                        <img src={svyazannye} alt="Связанные одной цепью" />
                    </div>
                    <p>Связанные<br/>одной цепью</p>
                </div>
            </div>

            {/* Пятый ряд (2 кружка) */}
            <div className="skill-row">
                <div className="circle-container">
                    <div className="circle">
                        <img src={kot} alt="Кот в Чёрном Ящике" />
                    </div>
                    <p>Кот в Чёрном<br/>Ящике</p>
                </div>
                <div className="circle-container">
                    <div className="circle">
                        <img src={frazochki} alt="Странные фразочки" />
                    </div>
                    <p>Странные<br/>фразочки</p>
                </div>
            </div>

            {/* Шестой ряд (1 кружок) */}
            <div className="skill-row">
                <div className="circle-container">
                    <div className="circle">
                        <img src={blitz} alt="БЛИЦ БЛИЦ БЛИЦ" />
                    </div>
                    <p>БЛИЦ БЛИЦ<br/>БЛИЦ</p>
                </div>
            </div>
        </div>
        
    );
};
 
export default Type_and_Types;