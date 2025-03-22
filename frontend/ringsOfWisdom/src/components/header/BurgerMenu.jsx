import { useAuth } from "./../../hooks/AuthContext";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import "./stylehead.css";
import { IoMenu } from "react-icons/io5";
import {MdClose} from 'react-icons/md';

const BurgerMenu = () => {
    const { isAuthenticated } = useAuth();
    const [click, setClick] = useState(false); 
    const closeMenu = () => setClick(false);
    const Close = <MdClose className="HamburgerMenu"
            size="30px" color="black" onClick={() => setClick(!click)} />
    const Hamburger = <IoMenu className="HamburgerMenu"
            size="30px" color="black" onClick={() => setClick(!click)}/>
          

    if (isAuthenticated === null) {
        return (
            <>
            { click ? Close : Hamburger} 
            {click && <nav className="nav-links">
                {<NavLink  to="/profile" onClick={closeMenu}>Профиль</NavLink>}
                <NavLink to="/course" onClick={closeMenu}>Курсы</NavLink>
                <NavLink to="/skills" onClick={closeMenu}>Дерево навыков</NavLink>
                <NavLink to="/shop" onClick={closeMenu}>Магазин</NavLink> 
            </nav>}
            </>)
    }

    return (
        <>
            { click ? Close : Hamburger} 
            {click && <nav className="nav-links">
                <NavLink to={isAuthenticated ? "/profile" : "/auth"} onClick={closeMenu}>Профиль</NavLink>
                <NavLink to="/course" onClick={closeMenu}>Курсы</NavLink>
                <NavLink to="/skills" onClick={closeMenu}>Дерево навыков</NavLink>
                <NavLink to="/shop" onClick={closeMenu}>Магазин</NavLink> 
            </nav>}
        </>
    );
};

export default BurgerMenu;


