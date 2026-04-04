import Header from "./Header";
import LoginForm from "./LoginForm";
import Footer from "./Footer";
import styles from "./modules/LoginPage.module.css";

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

          <div className={styles.actions}>
            <button className={styles.primaryCta} type="button">
              Quero meu acesso
            </button>
            <button className={styles.secondaryCta} type="button">
              Ver beneficios
            </button>
          </div>
        </div>
      </section>

      <main className={styles.loginSection}>
        <LoginForm />
      </main>

      <Footer />
    </div>
  );
}

export default LoginPage;
