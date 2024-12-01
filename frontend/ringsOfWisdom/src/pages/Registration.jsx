import logom from"./../assets/images/logo.png";
import './../assets/style/style_registration.css';

import { NavLink } from 'react-router-dom';
import React from 'react';

const Registation = () => {
    return ( 
    <div className="container">
        
        <img src={logom} alt="Логотип Rings of Wisdom" className="logom"/>
        
        <div className="registration-box">
            <form>
                <label>Регистрация игрока</label>
                <NavLink to="/auth" className="enter-account">Войти</NavLink>
                
                
                <input type="email" placeholder="Email" required/>
                <input type="password" placeholder="Пароль" required/>
                <input type="password" placeholder="Повтори Пароль" required/>
                <input type="name" placeholder="Имя пользователя" required/>
                  
                
                <NavLink to="/emlverif">
                <button type="submit">Создать аккаунт</button>
                </NavLink>
                
            </form>
            
            <a href="https://vk.com/lig_sfedu" target="_blank" rel="noopener noreferrer" className="liu">ЛИИ ЮФУ</a>
        </div>
    </div> );
}
 
export default Registation;