import logom from"./../assets/images/logo.png";
import './../assets/style/style_email_verif.css';

const Emailverif = () => {
    return ( 
    <div className="container">
        <img src={logom} alt="Логотип Rings of Wisdom" className="logom"/>
        <main className="notification">
            <p>Письмо с кодом подтверждения было выслано на ваш электронный адрес.<br/> Пожалуйста, проверьте почту.</p>
            <button onClick="document.location='#menu'" type="submit">Войти</button>
            <a href="https://vk.com/lig_sfedu" className="footer-link">ЛИИ ЮФУ</a>
        </main>
    </div> 
);
}
 
export default Emailverif;