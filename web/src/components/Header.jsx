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
  const { totalItens, usuarioAtual } = useComics();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logoLink}>
        <img src={logo} alt="Logo" className={styles.logo} />
      </Link>

      <div className={styles.headerActions}>
        <Link to="/carrinho" className={styles.cartLink}>
          <IoCartOutline size={24} color="red" />
          {totalItens > 0 && (
            <span className={styles.cartBadge}>{totalItens}</span>
          )}
        </Link>
        <button
          onClick={toggleTheme}
          className={styles.themeToggle}
          aria-label="Alternar tema"
        >
          {theme === "light" ? <GoSun color="red" /> : <GoMoon color="red" />}
        </button>
      </div>

      <section className={styles.search}>
        <SearchBar value={value} onChange={onChange} />
      </section>

      <nav className={styles.nav} aria-label="Principal">
        <Link to="/">Home</Link>
        <Link to="/catalogo">Catalogo</Link>
        <Link to="/planos">Planos</Link>
        <Link to="/contato">Contato</Link>
        <Link
        to={usuarioAtual.logado ? "/minhaConta" : "/login"}
        className={styles.loginBtn}
        >
          {usuarioAtual.logado ? "Minha Conta" : "Login"}
        </Link>
      </nav>
    </header>
  );
}

export default Header;
