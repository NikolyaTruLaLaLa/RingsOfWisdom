import logom from"./../assets/images/logo.png";
import './../assets/style/style_authorization.css';

import { NavLink } from 'react-router-dom';
import React from 'react';


const Authorization = () => {

    return ( 
    <div className="container">
        <img src={logom} alt="Логотип Rings of Wisdom" className="logom"/>
        
        <div className="login-box">
            <form>
                <label>Авторизация игрока</label>
                <NavLink to="/reg"className="create-account" >Создать аккаунт</NavLink>
                {/*<a href="/reg" className="create-account">Создать аккаунт</a>*/}
                
                <input type="email" placeholder="Email" required/>
                <input type="password" placeholder="Пароль" required/>
                
                <div className="remember-box">
                    <input type="checkbox" id="remember-me"/>
                    <label for="remember-me">Запомнить меня</label>
                    <a href="#" className="forgot-password">Забыли пароль?</a>{/*ссылки нет пока не переделываю*/}
                </div>
                <NavLink to="/main">
                <button type="submit">Войти</button>
                </NavLink>
            </form>
            
            <a href="https://vk.com/lig_sfedu" target="_blank" rel="noopener noreferrer" className="liu">ЛИИ ЮФУ</a>
        </div>
    </div>  
        );
}
 
export default Authorization;