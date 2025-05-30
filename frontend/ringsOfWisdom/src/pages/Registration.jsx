import logom from "./../assets/images/logo.png";
import './../assets/style/style_registration.css';
import { useState } from "react";
import axios from "axios";

import { NavLink, useNavigate } from 'react-router-dom';
import React from 'react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function Registration() {
    const [formData, setFormData] = useState({
        userName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [message, setMessage] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const validatePassword = (password, confirmPassword) => {
        return password === confirmPassword;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setEmailError("");
        setPasswordError("");

        let isValid = true;

        
        if (!validateEmail(formData.email)) {
            setEmailError("Некорректный формат email.");
            isValid = false;
        }

        
        if (!validatePassword(formData.password, formData.confirmPassword)) {
            setPasswordError("Пароли не совпадают.");
            isValid = false;
        }

        
        if (!isValid) {
            return;
        }

        try {
            const response = await axios.post(`${API_BASE_URL}/register/registration`, formData);
            setMessage(response.data.message);

            
            navigate("/emlverif");
        } catch (error) {
            setMessage("Ошибка: " + (error.response?.data?.[0]?.description || "Неизвестная ошибка"));
        }
    };

    return (
        <div className="container">
            <img src={logom} alt="Логотип Rings of Wisdom" className="logom" />
            {message && <p>{message}</p>}

            <div className="registration-box">
                <form onSubmit={handleSubmit}>
                    <label>Регистрация игрока</label>
                    <NavLink to="/auth" className="enter-account">Войти</NavLink>

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                        className={emailError ? "error-field" : ""}
                        required
                    />
                    {emailError && <p className="error">{emailError}</p>}

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        className={passwordError ? "error-field" : ""}
                        required
                    />
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        onChange={handleChange}
                        className={passwordError ? "error-field" : ""}
                        required
                    />
                    {passwordError && <p className="error">{passwordError}</p>}

                    <input
                        type="text"
                        name="userName"
                        placeholder="UserName"
                        onChange={handleChange}
                        required
                    />

                    
                    <button type="submit">Создать аккаунт</button>
                </form>

                <a href="https://vk.com/lig_sfedu" target="_blank" rel="noopener noreferrer" className="liu">ЛИИ ЮФУ</a>
            </div>
        </div>
    );
}

export default Registration;