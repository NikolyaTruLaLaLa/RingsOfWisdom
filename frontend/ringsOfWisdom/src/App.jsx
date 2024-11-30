import { useState } from 'react'
import "./assets/style/style_main_page.css";
import logo from"./assets/images/Logo Black.png";
import profile from"./assets/images/profile-icon.png";
import './App.css'



function App() {
  const [count, setCount] = useState(0)

  return (
    <>

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
    
      <div className="heading-container">
          <h1>Main Page</h1>
      </div>
      <div className="main-content">
          <h1>Work in Progress</h1>
      </div>
    </>
  )
}

export default App
