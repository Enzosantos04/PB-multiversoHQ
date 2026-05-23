import { Link } from "react-router-dom";
import styles from "./modules/Footer.module.css";
import logo from "../images/logo.png";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";


function Footer() {
  return (
    <footer className={styles.footer}>
      {/* Newsletter Section */}
      <section className={styles.newsletter}>
        <div className={styles.newsletterInner}>
          <div className={styles.newsletterContent}>
            <h3>Receba nossas novidades</h3>
            <p>Fique por dentro dos lançamentos da Marvel e DC!</p>
          </div>
          <form className={styles.newsletterForm} onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Seu melhor e-mail" required />
            <button type="submit">CADASTRAR</button>
          </form>
        </div>
      </section>

      {/* Main Footer Links */}
      <div className={styles.mainFooter}>
        <div className={styles.column}>
          <h4>Suas Compras</h4>
          <ul>
            <li><a href="#">Meus Pedidos</a></li>
            {/*<li><a href="#">Prazos de Entrega</a></li>*/}
            <li><Link to="/formas-pagamento">Formas de Pagamento</Link></li>
            <li><Link to="/trocas-devolucoes">Trocas e Devoluções</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
          </ul>
        </div>

        <div className={styles.column}>
          <h4>Serviços</h4>
          <ul>
            <li><Link to="/termos-de-uso">Termos de Uso</Link></li>
            <li><Link to="/regulamentos">Regulamentos</Link></li>
            <li><Link to="/privacidade">Privacidade</Link></li>
            {/*<li><a href="#">Gerenciar Cookies</a></li>*/}
          </ul>
        </div>

        <div className={styles.column}>
          <h4>MultiversoHQ</h4>
          <ul>
            <li><Link to="/sobre">Sobre o Grupo</Link></li>
            <li><Link to="/trabalhe-conosco">Trabalhe Conosco</Link></li>
            <li><Link to="/contato">Contato</Link></li>
            {/*<li><a href="#">Transparência</a></li>*/}
          </ul>
          <div className={styles.socialIcons}>
            <a href="#" aria-label="Instagram"><FaInstagram /></a>
            <a href="#" aria-label="Facebook"><FaFacebook /></a>
            <a href="#" aria-label="Linkedin"><FaLinkedin /></a>
          </div>
        </div>

        <div className={styles.column}>
          <h4>Assinaturas</h4>
          <ul>
            <li><Link to="/planos">Planos Mensais</Link></li>
            {/*<li><a href="#">Assinaturas Marvel</a></li>*/}
            {/*<li><a href="#">Assinaturas DC</a></li>*/}
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={styles.bottomBar}>
        <div className={styles.bottomInner}>
          <img src={logo} alt="MultiversoHQ Logo" />
          
          <div className={styles.corporateInfo}>
            <p>MULTIVERSOHQ BRASIL LTDA. | CNPJ: 00.000.000/0001-00</p>
            <p>Rua dos Quadrinhos, 123 - Multiverso, Rio de Janeiro/RJ - CEP: 00000-000</p>
          </div>

          <div className={styles.paymentMethods}>
            <span><img src="https://ajuda.fastcommerce.com.br/lojas/00000009/prod/fc/fc-visa.svg" alt="Visa" /></span>
            <span> <img src="https://imgs.search.brave.com/yXjLjzMfbSqQ66BGWunffYUgWU4JdOJCtWKt_j1WAjo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9hanVk/YS5mYXN0Y29tbWVy/Y2UuY29tLmJyL2xv/amFzLzAwMDAwMDA5/L3Byb2QvZmMvZmMt/bWFzdGVyY2FyZC0y/LnN2Zw" alt="Mastercard" /></span>
            <span><img src="https://ajuda.fastcommerce.com.br/lojas/00000009/prod/fc/fc-pix2.svg" alt="Pix" /></span>
            <span><img src="https://ajuda.fastcommerce.com.br/lojas/00000009/prod/fc/fc-boleto.svg" alt="Boleto" /></span>
          </div>

          <p className={styles.copy}>
            © 2026 MultiversoHQ. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
