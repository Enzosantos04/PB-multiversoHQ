import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./modules/Header.module.css";
import logo from "../images/logo.png";
import SearchBar from "./SearchBar";
import { useComics } from "../context/ComicsContext";
import { IoCartOutline } from "react-icons/io5";
import { GoSun } from "react-icons/go";
import { GoMoon } from "react-icons/go";

function Header({ onChange = () => {}, value = "" }) {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
<<<<<<< HEAD
  const { totalItens } = useComics();
=======
  const { totalItens, usuarioAtual, logout } = useComics();
>>>>>>> master

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
<<<<<<< HEAD
        <Link to="/login" className={styles.loginBtn}>
          Login
        </Link>
=======
        {usuarioAtual.logado && <Link to="/minha-conta">Minha Conta</Link>}
        {usuarioAtual.logado ? (
          <div className={styles.userContainer}>
            <Link to="/minha-conta" className={styles.userName}>
              Olá, {usuarioAtual.nome.split(" ")[0]}
            </Link>
            <button onClick={logout} className={styles.logoutBtn}>
              Sair
            </button>
          </div>
        ) : (
          <Link to="/login" className={styles.loginBtn}>
            Login
          </Link>
        )}
>>>>>>> master
      </nav>
    </header>
  );
}

export default Header;
