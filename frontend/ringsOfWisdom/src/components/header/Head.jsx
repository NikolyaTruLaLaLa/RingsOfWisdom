import logo from"./../../assets/images/Logo Black.png";
import profile from"./../../assets/images/profile-icon.png";

import "./stylehead.css"

const Head = () => {
    return ( 
    <header className="site-header">
        <div className="logo">
            <a href="#logo">
            <img src={logo} alt="Логотип" className="logo"/>
            </a>
        </div>
        <nav className="nav-links">
            <a href="#courses">Курсы</a>
            <a href="#skills">Дерево навыков</a>
            <a href="#store">Магазин</a>
        </nav>
        <div className="profile">
            <a href="#profile">
            <img src={profile} alt="Иконка профиля" />
            </a>
        </div>
    </header> 
    );
}
 
export default Head;