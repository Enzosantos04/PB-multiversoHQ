import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./modules/Header.module.css";
import logo from "../images/logo.png";
import SearchBar from "./SearchBar";
import { useComics } from "../context/ComicsContext";
import { IoCartOutline } from "react-icons/io5";
import { GoSun, GoMoon } from "react-icons/go";

function Header({ onChange = () => {}, value = "" }) {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const { totalItens } = useComics();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerTop}>
        <Link to="/" className={styles.logoLink}>
          <img src={logo} alt="MultiversoHQ Logo" className={styles.logo} />
        </Link>

        <section className={styles.search}>
          <SearchBar value={value} onChange={onChange} />
        </section>

        <div className={styles.headerActions}>
          <button
            onClick={toggleTheme}
            className={styles.themeToggle}
            aria-label="Alternar tema"
          >
            {theme === "light" ? <GoSun size={20} /> : <GoMoon size={20} />}
          </button>
          
          <Link to="/carrinho" className={styles.cartLink}>
            <IoCartOutline size={24} />
            {totalItens > 0 && (
              <span className={styles.cartBadge}>{totalItens}</span>
            )}
          </Link>
          
          <Link to="/login" className={styles.loginBtn}>
            Entrar
          </Link>
        </div>
      </div>

      <nav className={styles.nav} aria-label="Navegação Principal">
        <Link to="/" className={styles.navLink}>Início</Link>
        <Link to="/catalogo" className={styles.navLink}>Catálogo</Link>
        <Link to="/planos" className={styles.navLink}>Planos de Assinatura</Link>
        <Link to="/contato" className={styles.navLink}>Contato</Link>
      </nav>
    </header>
  );
}

export default Header;
