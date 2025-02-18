import logom from"./../assets/images/logo.png";
import './../assets/style/style_registration.css';
import { useState } from "react";
import axios from "axios";

import { NavLink } from 'react-router-dom';
import React from 'react';

function  Registation() {
    const [formData, setFormData] = useState({
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  
    const [message, setMessage] = useState("");
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setMessage("");
  
      try {
        const response = await axios.post("http://localhost:5173/api/register", formData);
        setMessage(response.data.message);
      } catch (error) {
        setMessage("Ошибка: " + (error.response?.data?.[0]?.description || "Неизвестная ошибка"));
      }
    };

    return ( 
    <div className="container">
        
        <img src={logom} alt="Логотип Rings of Wisdom" className="logom"/>
        {message && <p>{message}</p>}
        
        <div className="registration-box">
            <form onSubmit={handleSubmit}>
                <label>Регистрация игрока</label>
                <NavLink to="/auth" className="enter-account">Войти</NavLink>
                
                
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required/>
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required/>
                <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} required/>
                <input type="text" name="userName" placeholder="UserName" onChange={handleChange} required/>
                  
                
                <NavLink to="/emlverif">
                <button type="submit">Создать аккаунт</button>
                </NavLink>
                
            </form>
            
            <a href="https://vk.com/lig_sfedu" target="_blank" rel="noopener noreferrer" className="liu">ЛИИ ЮФУ</a>
        </div>
    </div> );
}
 
export default Registation;
