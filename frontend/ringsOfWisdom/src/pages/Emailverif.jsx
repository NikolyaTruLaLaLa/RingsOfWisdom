import logom from"./../assets/images/logo.png";
import './../assets/style/style_email_verif.css';

import { NavLink } from 'react-router-dom';
import React from 'react';

const Emailverif = () => {
    return ( 
    <div className="container">
        <img src={logom} alt="Логотип Rings of Wisdom" className="logom"/>
        <main className="notification">
            <p>Письмо с кодом подтверждения было выслано на ваш электронный адрес.<br/> Пожалуйста, проверьте почту.</p>

            <NavLink to="/main">
                <button type="submit">Войти</button>
            </NavLink>
            
    
            <a href="https://vk.com/lig_sfedu" target="_blank" rel="noopener noreferrer" className="footer-link">ЛИИ ЮФУ</a>
        </main>
    </div> 
);
}
 
export default Emailverif;