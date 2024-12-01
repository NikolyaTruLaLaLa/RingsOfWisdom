import logo from"./../../assets/images/Logo Black.png";
import profile from"./../../assets/images/profile-icon.png";

import "./stylehead.css"

const Head = () => {
    return ( 
    <header className="site-header">
        <div className="logo">
            <a href="/main">
            <img src={logo} alt="Логотип" className="logo"/>
            </a>
        </div>
        <nav className="nav-links">
            <a href="/course">Курсы</a>
            <a href="/skills">Дерево навыков</a>
            <a href="/shop">Магазин</a>
        </nav>
        <div className="profile">
            <a href="/auth">
            <img src={profile} alt="Иконка профиля" />
            </a>
        </div>
    </header> 
    );
}
 
export default Head;