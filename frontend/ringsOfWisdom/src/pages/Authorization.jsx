import logom from "./../assets/images/logo.png";
import './../assets/style/style_authorization.css';

import { NavLink, useNavigate } from 'react-router-dom'; // Добавили useNavigate
import React from 'react';

import { useState } from "react";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState("");
  const [userNameError, setUserNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate(); // Хук для навигации

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    setUserNameError("");
    setPasswordError("");

    let isValid = true;

    // Проверка имени пользователя
    if (!userName.trim()) {
      setUserNameError("Имя пользователя не может быть пустым.");
      isValid = false;
    }

    // Проверка пароля
    if (!password.trim()) {
      setPasswordError("Пароль не может быть пустым.");
      isValid = false;
    }

    // Если есть ошибки, останавливаем отправку формы
    if (!isValid) {
      return;
    }

    try {
      const response = await fetch("/api/Login/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName, password, rememberMe }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Авторизация успешна!");
        // Переходим на страницу /main при успешной авторизации
        navigate("/main");
      } else {
        setMessage(data.message || "Ошибка авторизации");
      }
    } catch (error) {
      setMessage("Ошибка подключения к серверу");
    }
  };

  return (
    <div className="container">
      <img src={logom} alt="Логотип Rings of Wisdom" className="logom" />

      <div className="login-box">
        <form onSubmit={handleLogin}>
          <label>Авторизация игрока</label>
          <NavLink to="/reg" className="create-account">Создать аккаунт</NavLink>

          <input
            type="text"
            placeholder="Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className={userNameError ? "error-field" : ""}
            required
          />
          {userNameError && <p className="error">{userNameError}</p>}

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={passwordError ? "error-field" : ""}
            required
          />
          {passwordError && <p className="error">{passwordError}</p>}

          <div className="remember-box">
            <label htmlFor="remember-me">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Запомнить меня
            </label>
            <a href="#" className="forgot-password">Забыли пароль?</a>
          </div>

          {/* Кнопка отправки формы */}
          <button type="submit">Войти</button>
        </form>

        {message && <p>{message}</p>}
        <a href="https://vk.com/lig_sfedu" target="_blank" rel="noopener noreferrer" className="liu">ЛИИ ЮФУ</a>
      </div>
    </div>
  );
};

export default Login;