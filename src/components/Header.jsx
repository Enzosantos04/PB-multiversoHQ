import styles from "./modules/Header.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <h1>MultiversoHQ</h1>

      <section className={styles.search}>
        <input placeholder="Buscar quadrinhos, herois ou sagas..." />
      </section>

      <nav aria-label="Principal">
        <a href="/">Home</a>
        <a href="#">Catalogo</a>
        <a href="#">Planos</a>
        <a href="#">Contato</a>
        <a href="/login">Login</a>
      </nav>
    </header>
  );
}

export default Header;
