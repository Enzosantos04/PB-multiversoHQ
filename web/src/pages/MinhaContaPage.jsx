import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useComics } from "../context/ComicsContext";
import styles from "../components/modules/MinhaConta.module.css";
import { FaUserCircle } from "react-icons/fa";

const PLANO_LABEL = {
  null: "Sem plano ativo",
  marvel: "Plano Marvel",
  dc: "Plano DC",
  superhero: "Plano SuperHerói",
};

const MOCK_HISTORICO = [
  { id: "#8245", data: "12/05/2026", item: "The Amazing Spider-Man #1", tipo: "Aluguel", status: "Entregue" },
  { id: "#8240", data: "05/05/2026", item: "Batman: Year One", tipo: "Compra", status: "Entregue" },
  { id: "#8301", data: "24/05/2026", item: "Wonder Woman #12", tipo: "Aluguel", status: "Processando" },
];

export default function MinhaContaPage() {
  const { usuarioAtual, searchTerm, setSearchTerm } = useComics();
  const navigate = useNavigate();

  useEffect(() => {
    if (!usuarioAtual.logado) {
      navigate("/");
    }
  }, [usuarioAtual, navigate]);

  const handleChange = (e) => setSearchTerm(e.target.value);

  if (!usuarioAtual.logado) return null;

  return (
    <div className={styles.page}>
      <Header onChange={handleChange} value={searchTerm} />

      <main className={styles.main}>
        <h1 className={styles.pageTitle}>
          <FaUserCircle color="#dc2626" /> Minha Conta
        </h1>

        <section className={styles.profileCard}>
          <div className={styles.avatar}>
            {usuarioAtual.nome.charAt(0).toUpperCase()}
          </div>
          <div className={styles.userInfo}>
            <h2>{usuarioAtual.nome}</h2>
            <p className={styles.email}>{usuarioAtual.email}</p>
            <span className={styles.planBadge}>
              {PLANO_LABEL[usuarioAtual.plano]}
            </span>
          </div>
        </section>

        <section className={styles.historySection}>
          <h3>Histórico Recente</h3>
          <div className={styles.tableWrapper}>
            <table className={styles.historyTable}>
              <thead>
                <tr>
                  <th>Pedido</th>
                  <th>Data</th>
                  <th>Item</th>
                  <th>Tipo</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_HISTORICO.map((pedido) => (
                  <tr key={pedido.id}>
                    <td>{pedido.id}</td>
                    <td>{pedido.data}</td>
                    <td>{pedido.item}</td>
                    <td>{pedido.tipo}</td>
                    <td>
                      <span className={`${styles.status} ${pedido.status === 'Entregue' ? styles.statusEntregue : styles.statusProcessando}`}>
                        {pedido.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
