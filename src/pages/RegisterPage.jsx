import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header.jsx";
import RegisterForm from "../components/RegisterForm.jsx";
import Footer from "../components/Footer.jsx";
import styles from "../components/modules/LoginPage.module.css";
import { useComics } from "../context/ComicsContext";

function RegisterPage() {
  const {
    searchTerm,
    setSearchTerm,
    usuarioAtual,
  } = useComics();
  const navigate = useNavigate();

  useEffect(() => {
    if (usuarioAtual.logado) {
      navigate("/");
    }
  }, [usuarioAtual, navigate]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className={styles.app}>
      <Header
        onChange={handleChange}
        value={searchTerm}
      />

      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <p className={styles.heroCategory}>
            Venha para a MultiversoHQ
          </p>

          <h1>
            Crie sua conta e comece sua jornada
          </h1>

          <p className={styles.description}>
            Acesso exclusivo a lançamentos, promoções e um acervo completo de heróis.
          </p>
        </div>
      </section>

      <main className={styles.loginSection}>
        <RegisterForm />
      </main>

      <Footer />
    </div>
  );
}

export default RegisterPage;
