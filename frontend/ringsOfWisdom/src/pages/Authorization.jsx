import logom from"./../assets/images/logo.png";
import './../assets/style/style_authorization.css';

import { NavLink } from 'react-router-dom';
import React from 'react';

import { useState } from "react";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch("/api/Login/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName, password, rememberMe }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setMessage("Login successful!");
        // Здесь можно сохранить токен или перенаправить пользователя
      } else {
        setMessage(data.message || "Login failed");
      }
    } catch (error) {
      setMessage("Error connecting to server");
    }
  };
  
    return ( 
    <div className="container">
        <img src={logom} alt="Логотип Rings of Wisdom" className="logom"/>
        
        <div className="login-box" >
            <form onSubmit={handleLogin}>
                <label>Авторизация игрока</label>
                <NavLink to="/reg"className="create-account" >Создать аккаунт</NavLink>
                {/*<a href="/reg" className="create-account">Создать аккаунт</a>*/}
                
                <input type="text" placeholder="Username" value={userName} onChange={(e) => setUserName(e.target.value)} required/>
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                
                <div className="remember-box">
                    
                    <label for="remember-me">
                        <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)}/>
                        Запомнить меня
                    </label>
                    <a href="#" className="forgot-password">Забыли пароль?</a>
                </div>
                <NavLink to="/main">
                <button type="submit">Войти</button>
                </NavLink>
            </form>
            {message && <p>{message}</p>}
            <a href="https://vk.com/lig_sfedu" target="_blank" rel="noopener noreferrer" className="liu">ЛИИ ЮФУ</a>
        </div>
    </div>  
        );
}
 
export default Login;