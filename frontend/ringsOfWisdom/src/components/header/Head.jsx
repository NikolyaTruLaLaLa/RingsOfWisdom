import logo from "./../../assets/images/Logo Black.png";
import { NavLink } from "react-router-dom";
import React from "react";
import ProfileButton from "./ProfileButton"; // Импортируем новый компонент

import "./stylehead.css";

const Head = () => {
  return (
    <header className="site-header">
      <NavLink to="" className="logo">
        <img src={logo} alt="Логотип" />
      </NavLink>
      <nav className="nav-links">
        <NavLink to="/course">Курсы</NavLink>
        <NavLink to="/skills">Дерево навыков</NavLink>
        <NavLink to="/shop">Магазин</NavLink>
      </nav>
      
      {/* Используем готовый компонент ProfileButton */}
      <ProfileButton />
    </header>
  );
};

export default Head;

