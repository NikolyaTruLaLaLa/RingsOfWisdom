import logom from"./../assets/images/logo.png";
import './../assets/style/style_authorization.css';

const Authorization = () => {
    return ( 
    <div className="container">
        <img src={logom} alt="Логотип Rings of Wisdom" className="logom"/>
        
        <div className="login-box">
            <form>
                <label>Авторизация игрока</label>
                <a href="#" className="create-account">Создать аккаунт</a>
                
                <input type="email" placeholder="Email" required/>
                <input type="password" placeholder="Пароль" required/>
                
                <div className="remember-box">
                    <input type="checkbox" id="remember-me"/>
                    <label for="remember-me">Запомнить меня</label>
                    <a href="#" className="forgot-password">Забыли пароль?</a>
                </div>
                
                <button onclick="document.location='#menu'" type="submit">Войти</button>
            </form>
            
            <a href="#" className="liu">ЛИИ ЮФУ</a>
        </div>
    </div>  
        );
}
 
export default Authorization;