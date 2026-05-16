import { Link } from "react-router-dom";
import styles from "./modules/Header.module.css";
import logo from "../images/logo.png";

function Header({ onChange = () => {}, value = "" }) {
  return (
    <header className={styles.header}>
      <Link to="/">
        <img src={logo} alt="Logo" />
      </Link>

      <section className={styles.search}>
        <input
          type="text"
          placeholder="Pesquisar quadrinhos..."
          value={value}
          onChange={onChange}
        />
      </section>

      <nav aria-label="Principal">
        <Link to="/">Home</Link>
        <Link to="#">Catalogo</Link>
        <Link to="#">Planos</Link>
        <Link to="#">Contato</Link>
        <Link to="/login">Login</Link>
      </nav>
    </header>
  );
}

export default Header;
