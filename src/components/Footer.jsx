import styles from "./modules/Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.brand}>MultiversoHQ</p>

        <nav className={styles.nav} aria-label="Navegacao do rodape">
          <a href="#">Inicio</a>
          <a href="#">Catalogo</a>
          <a href="#">Planos</a>
          <a href="#">Contato</a>
        </nav>
      </div>

      <p className={styles.copy}>
        © 2026 MultiversoHQ. Todos os direitos reservados.
      </p>
    </footer>
  );
}

export default Footer;
