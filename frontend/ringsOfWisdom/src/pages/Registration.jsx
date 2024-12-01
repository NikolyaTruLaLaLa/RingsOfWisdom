import logom from"./../assets/images/logo.png";
import './../assets/style/style_registration.css';
const Registation = () => {
    return ( 
    <div className="container">
        <img src={logom} alt="Логотип Rings of Wisdom" className="logom"/>
        
        <div className="registration-box">
            <form>
                <label>Регистрация игрока</label>
                <a href="/auth" className="enter-account">Войти</a>
                
                <input type="email" placeholder="Email" required/>
                <input type="password" placeholder="Пароль" required/>
                <input type="password" placeholder="Повтори Пароль" required/>
                <input type="name" placeholder="Имя пользователя" required/>
                  
                
                
                <button onClick="document.location='/emlverif'" type="submit">Создать аккаунт</button>
            </form>
            
            <a href="https://vk.com/lig_sfedu" className="liu">ЛИИ ЮФУ</a>
        </div>
    </div> );
}
 
export default Registation;