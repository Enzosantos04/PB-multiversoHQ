import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useComics } from "../context/ComicsContext";
import styles from "../pages/modules/MinhaConta.module.css";
import { FaUserCircle } from "react-icons/fa";

const PLANO_LABEL = {
  null: "Sem plano ativo",
  marvel: "Plano Marvel",
  dc: "Plano DC",
  superhero: "Plano SuperHerói",
};

export default function MinhaContaPage() {
  const { usuarioAtual, searchTerm, setSearchTerm, historicoPedidos, logout } = useComics();
  const navigate = useNavigate();

  function handleLogout() {
  logout();
  navigate("/");
}

  useEffect(() => {
    if (!usuarioAtual.logado) {
      navigate("/");
    }
  }, [usuarioAtual, navigate]);

  const handleChange = (e) => setSearchTerm(e.target.value);

  const pedidosDoUsuario = historicoPedidos.filter(
  (pedido) => pedido.usuarioEmail === usuarioAtual.email
);

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
            </div>
            <div className={styles.accountActions}>
              <span className={styles.planBadge}>
                {PLANO_LABEL[usuarioAtual.plano]}
                </span>
                <button
                type="button"
                className={styles.logoutButton}
                onClick={handleLogout}>
                  Sair da conta
                  </button>
                  </div>
                  </section>
        {pedidosDoUsuario.length === 0 ? (
          <p className={styles.emptyHistory}>
            Você ainda não possui pedidos finalizados.
          </p>
        ) : (
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
                {pedidosDoUsuario.map((pedido) => (
                  <tr key={pedido.id}>
                    <td>{pedido.id}</td>
                    <td>{pedido.data}</td>
                    <td>{pedido.item}</td>
                    <td>{pedido.tipo}</td>
                    <td>
                      <span
                        className={`${styles.status} ${
                          pedido.status === "Entregue"
                            ? styles.statusEntregue
                            : styles.statusProcessando
                        }`}
                      >
                        {pedido.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
