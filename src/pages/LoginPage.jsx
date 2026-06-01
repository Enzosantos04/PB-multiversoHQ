import Header from "../components/Header.jsx";
import LoginForm from "../components/LoginForm.jsx";
import Footer from "../components/Footer.jsx";
import styles from "../components/modules/LoginPage.module.css";
import { useNavigate } from "react-router-dom";
import { useComics } from "../context/ComicsContext.jsx";
import { useEffect } from "react";

function LoginPage() {
  const{
    searchTerm,setSearchTerm,usuarioAtual,}=useComics();
//  const handleChange = (e) =>{setSearchTerm(e.target.value);};
 const navigate = useNavigate();
  
   useEffect(() => {
    if (usuarioAtual.logado) {
      navigate("/minhaConta");
    }
  }, [usuarioAtual, navigate]);

const handleChange = (e) => {
    setSearchTerm(e.target.value);
  }

  return (
    <div className={styles.app}>
      <Header onChange={handleChange} value={searchTerm} />

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
      </main>

      <Footer />
    </div>
  );
}

export default LoginPage;
