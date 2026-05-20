import Header from "../components/Header.jsx";
import LoginForm from "../components/LoginForm.jsx";
import Footer from "../components/Footer.jsx";
import styles from "../components/modules/LoginPage.module.css";

function LoginPage() {
  return (
    <div className={styles.app}>
      <Header />

      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <p className={styles.heroCategory}>Aluguel e venda de quadrinhos</p>
          <h1>Entre para o clube de leitores da MultiversoHQ</h1>
          <p className={styles.description}>
            Descubra historias novas toda semana, com entrega rapida e acervo de
            colecionador.
          </p>
        </div>
      </section>

      <main className={styles.loginSection}>
        <LoginForm />
          <div className={styles.actions}>
              <button className={styles.primaryCta} type="button">
                  Cadastro
              </button>
              <button className={styles.secondaryCta} type="button">
                  Logins
              </button>
          </div>
      </main>

      <Footer />
    </div>
  );
}

export default LoginPage;
