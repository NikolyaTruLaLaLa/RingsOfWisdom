import logom from "./../assets/images/logo.png";
import './../assets/style/style_authorization.css';
import { useAuth } from './../hooks/AuthContext';
import { NavLink, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from "react";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState("");
  const [userNameError, setUserNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { isAuthenticated, checkAuthStatus } = useAuth();
  const navigate = useNavigate(); 


  useEffect(() => {
    if (!isAuthenticated) {
      checkAuthStatus();
    }
  }, [isAuthenticated, checkAuthStatus]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    setUserNameError("");
    setPasswordError("");

    if (isSubmitting || isAuthenticated) return;
    setIsSubmitting(true);

    let isValid = true;

    if (!userName.trim()) {
      setUserNameError("Имя пользователя не может быть пустым.");
      isValid = false;
    }

    if (!password.trim()) {
      setPasswordError("Пароль не может быть пустым.");
      isValid = false;
    }

    if (!isValid) {
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/Login/login`, { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName, password, rememberMe }),
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Авторизация успешна!");
        checkAuthStatus(); 
        navigate("/"); 
      }
      else {
        if (data.message === "User account is locked out.") {
          setMessage("Аккаунт заблокирован.");
        } else if (data.message === "Two-factor authentication required.") {
          setMessage("Требуется двухфакторная аутентификация.");
        } else {
          setMessage("Неверное имя пользователя или пароль.");
        }
      }
    } catch (error) {
      setMessage("Ошибка подключения к серверу.");
    } finally {
      setIsSubmitting(false);
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
          </div>

          <button type="submit" disabled={isSubmitting || isAuthenticated}>Войти</button>
        </form>

        {message && <p>{message}</p>}
        <a href="https://vk.com/lig_sfedu" target="_blank" rel="noopener noreferrer" className="liu">ЛИИ ЮФУ</a>
      </div>
    </div>
  );
};

export default Login;
