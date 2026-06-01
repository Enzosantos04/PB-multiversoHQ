import styles from "./modules/login.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useComics } from "../context/ComicsContext";
function LoginForm() {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useComics();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const result = login(email, password);

    if (result.success) {
      navigate("/");
    } else {
      setError(result.message);
    }
  };
  
  return (
    <section className={styles.wrapper}>
      <header className={styles.header}>
        <p className={styles.badge}>MultiversoHQ</p>
        <h1>Entre na sua conta</h1>
        <p className={styles.subtitle}>
          Continue para acompanhar alugueis, vendas e favoritos.
        </p>
      </header>

      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.field} htmlFor="email">
          <span>Email</span>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="voce@exemplo.com"
            autoComplete="email"
            onChange={(e)=> setEmail.target.value}
            required
          />
        </label>

        <label className={styles.field} htmlFor="password">
          <span>Senha</span>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Digite sua senha"
            autoComplete="current-password"
             onChange={(e)=> setPassword.target.value}
            required
          />
        </label>

        <div className={styles.formOptions}>
          <a href="#" className={styles.forgotPassword}>
            Esqueci minha senha
          </a>
        </div>

        <button type="submit" className={styles.submitButton}>
          Entrar
        </button>
         <Link to="/cadastro" className={styles.forgotPassword}>
              Não tem uma conta? Cadastre-se
            </Link>
      </form>
    </section>
  );
}

export default LoginForm;
