import logo from "./../../assets/images/Logo Black.png";
import { NavLink } from "react-router-dom";
import React, { useState, useEffect } from "react";
import ProfileButton from "./ProfileButton";
import BurgerMenu from "./BurgerMenu";

import "./stylehead.css";


const Head = () => {
  return (
    <header className="site-header">
      <NavLink to="" className="logo">
        <img src={logo} alt="Логотип" />
      </NavLink>
      
      {window.innerWidth > 768&&(
      <>
      <nav className="nav-links">
        <NavLink to="/course">Курсы</NavLink>
        <NavLink to="/skills">Дерево навыков</NavLink>
        <NavLink to="/shop">Магазин</NavLink>
      </nav>
      <ProfileButton />
      </>)}

      {/* Для экранов меньше 1025px */}
      {window.innerWidth <= 768 &&(<BurgerMenu/>)}
    </header>
)
};

export default Head;

