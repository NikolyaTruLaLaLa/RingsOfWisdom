
import './../assets/style/style_email_completed.css';
import logom from"./../assets/images/logo.png";
import { NavLink } from 'react-router-dom';
import React from 'react';
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function EmailCompleted() {
    const [searchParams] = useSearchParams();
    const userId = searchParams.get("userId");
    const code = searchParams.get("code");
    
    const [status, setStatus] = useState("loading");
    const [message, setMessage] = useState("Подтверждение...");

    useEffect(() => {
        if (!userId || !code) {
            setStatus("error");
            setMessage("Некорректная ссылка подтверждения.");
            return;
        }

        fetch(`${API_BASE_URL}/register/confirm-email?userId=${userId}&code=${encodeURIComponent(code)}`, {
            method: "GET"
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                setStatus("success");
                setMessage("Ваш email успешно подтверждён.\n Спасибо! и Хорошей игры!");
            } else {
                setStatus("error");
                setMessage(data.message || "Ошибка подтверждения.");
            }
        })
        .catch(error => {
            console.error("Ошибка запроса:", error);
            setStatus("error");
            setMessage("Не удалось подтвердить email.");
        });
    }, [userId, code]);

    return (
        <div className="container">
            <img src={logom} alt="Логотип Rings of Wisdom" className="logom"/>
                <main className="notification">
                    <h2>{status === "success" ? "✅ Почта подтверждена!" : "❌ Ошибка"}</h2>
                    <p>{message}</p>
                    <NavLink to="/auth">
                        <button type="submit">Войти</button>
                    </NavLink>
                    <a href="https://vk.com/lig_sfedu" target="_blank" rel="noopener noreferrer" className="footer-link">ЛИИ ЮФУ</a>
            </main>
        </div>
    );

}
