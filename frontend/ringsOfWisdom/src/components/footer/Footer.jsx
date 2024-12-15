import "./style_footer.css"
//import git from"./../assets/images/github.png";


const Footer = () => {
    return (
<>
<footer className="site-footer">
    <div className="waves">
        <div className="wave" id="wave1"></div>
    </div>
    <div className="social">
        <a href="#"><img src={git} alt="logo-githab" /></a>
        <a href="#"><img src={logo} alt="logo-liivk" /></a>
        <a href="#"><img src={logo} alt="logo-sfedu" /></a>
    </div>
    <div className="menu">
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Services</a>
        <a href="#">Team</a>
        <a href="#">Contact</a>
    </div>
    <p>©2021 Online Tutorials | All Rights Reserved</p>
</footer>

<script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
<script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>

</>
    );
}

export default Footer;