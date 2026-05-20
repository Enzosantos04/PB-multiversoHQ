import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./modules/Header.module.css";
import logo from "../images/logo.png";
import SearchBar from "./SearchBar";
import { useComics } from "../context/ComicsContext";

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
      <Link to="/">
        <img src={logo} alt="Logo" />
      </Link>

      <section className={styles.search}>
        <SearchBar value={value} onChange={onChange} />
      </section>

      <nav aria-label="Principal">
        <Link to="/">Home</Link>
        <Link to="/catalogo">Catalogo</Link>
        <Link to="/planos">Planos</Link>
        <Link to="/contato">Contato</Link>
        <Link to="/login">Login</Link>
        <Link to="/carrinho" className={styles.cartLink}>
          🛒
          {totalItens > 0 && (
            <span className={styles.cartBadge}>{totalItens}</span>
          )}
        </Link>
        <button
          onClick={toggleTheme}
          className={styles.themeToggle}
          aria-label="Alternar tema"
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>
      </nav>
    </header>
  );
}

export default Header;
