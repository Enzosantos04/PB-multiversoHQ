import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useComics } from "../context/ComicsContext";
import styles from "./modules/login.module.css";

function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { register } = useComics();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    const result = register(name, email, password);

    if (result.success) {
      alert("Cadastro realizado com sucesso! Você já está logado.");
      navigate("/");
    } else {
      setError(result.message);
    }
  };

  return (
    <section className={styles.wrapper}>
      <header className={styles.header}>
        <p className={styles.badge}>MultiversoHQ</p>
        <h1>Crie sua conta</h1>
        <p className={styles.subtitle}>
          Junte-se ao maior clube de leitores de quadrinhos.
        </p>
      </header>

      <form className={styles.form} onSubmit={handleSubmit}>
        {error && <p className={styles.error}>{error}</p>}
        
        <label className={styles.field} htmlFor="name">
          <span>Nome Completo</span>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>

        <label className={styles.field} htmlFor="email">
          <span>Email</span>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="voce@exemplo.com"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label className={styles.field} htmlFor="password">
          <span>Senha</span>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Escolha uma senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <label className={styles.field} htmlFor="confirmPassword">
          <span>Confirmar Senha</span>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Repita sua senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>

        <button type="submit" className={styles.submitButton}>
          Cadastrar
        </button>
        
        <Link to="/login" className={styles.forgotPassword}>
          Já tem uma conta? Entre aqui
        </Link>
      </form>
    </section>
  );
}

export default RegisterForm;
