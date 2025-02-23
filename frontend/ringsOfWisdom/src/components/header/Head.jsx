import logo from "./../../assets/images/Logo Black.png";
import { NavLink } from "react-router-dom";
import React from "react";
import { useAuth } from "../../hooks/useAuth"; // Импортируем хук авторизации
import "./stylehead.css";
import {ProfileButton} from "../../hooks/ProfileButton";

const Head = () => {

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
      <ProfileButton/>
    </header>
  );
};

export default Head;
