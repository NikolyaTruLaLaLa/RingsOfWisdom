import logo from "./../../assets/images/Logo Black.png";
import profile from "./../../assets/images/profile-icon.png";
import { NavLink } from "react-router-dom";
import React from "react";
import { useAuth } from "../../hooks/useAuth"; // Импортируем хук авторизации
import "./stylehead.css";

const Head = () => {
  const { isAuthenticated } = useAuth();

  return (
    <header className="site-header">
      <NavLink to="/main" className="logo">
        <img src={logo} alt="Логотип" />
      </NavLink>
      <nav className="nav-links">
        <NavLink to="/course">Курсы</NavLink>
        <NavLink to="/skills">Дерево навыков</NavLink>
        <NavLink to="/shop">Магазин</NavLink>
      </nav>
      {/* Проверка авторизации */}
      {isAuthenticated === null ? (
        <NavLink to="/auth" className="profile">
        <img src={profile} alt="Иконка профиля" />
      </NavLink>
      ) : (
        <NavLink to={isAuthenticated ? "/profile" : "/auth"} className="profile">
          <img src={profile} alt="Иконка профиля" />
        </NavLink>
      )}
    </header>
  );
};

export default Head;
