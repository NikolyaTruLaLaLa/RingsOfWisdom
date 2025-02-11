import "./style_footer.css";

import vk from './../../assets/images/vk.png';
import sfedu from './../../assets/images/sfedu.png';
import gitHub from './../../assets/images/github.png';

const Footer = () => {
    return (
		<footer className="footer">
			<div className="footer_container">
				<div className="footer__wrapper">
					<ul className="social">
						<li className="social__item">
							<a href="https://github.com/NikolyaTruLaLaLa/RingsOfWisdom" target="_blank" rel="noopener noreferrer">
								<img src={gitHub} alt="Link" />
							</a>
						</li>
						<li className="social__item">
							<a href="https://vk.com/lig_sfedu" target="_blank" rel="noopener noreferrer">
								<img src={vk} alt="Link" />
							</a>
						</li>
						<li className="social__item">
							<a href="https://sfedu.ru/" target="_blank" rel="noopener noreferrer">
								<img src={sfedu} alt="Link" />
							</a>
						</li>
					</ul>
					<div className="copyright">
						<p>© 2022 frontend-dev.com</p>
					</div>
				</div>
			</div>
		</footer>
	);
}

export default Footer;