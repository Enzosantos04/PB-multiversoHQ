import styles from "./modules/login.module.css";

function LoginForm() {
  return (
    <section className={styles.wrapper}>
      <header className={styles.header}>
        <p className={styles.badge}>MultiversoHQ</p>
        <h1>Entre na sua conta</h1>
        <p className={styles.subtitle}>
          Continue para acompanhar alugueis, vendas e favoritos.
        </p>
      </header>

      <form className={styles.form}>
        <label className={styles.field} htmlFor="email">
          <span>Email</span>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="voce@exemplo.com"
            autoComplete="email"
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
        <a href="#" className={styles.forgotPassword}>
          Não tem uma conta? Cadastre-se
        </a>
      </form>
    </section>
  );
}

export default LoginForm;
