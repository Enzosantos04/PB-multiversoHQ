import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./modules/PlanosPage.module.css";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import CardPlano from "../components/CardPlano.jsx";
import { useComics } from "../context/ComicsContext.jsx";

export default function PlanosPage() {
  const {
    searchTerm,
    setSearchTerm,
    usuarioAtual,
    assinarPlano,
  } = useComics();

  const navigate = useNavigate();

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const planos = [
    {
      id: 1,
      codigo: "marvel",
      titulo: "Plano Marvel",
      descricao:
        "Acesso total para alugar todas as revistas do universo Marvel. Limite de até 100 volumes por mês.",
      preco: "45,00",
      destaque: false,
    },
    {
      id: 2,
      codigo: "dc",
      titulo: "Plano DC",
      descricao:
        "Acesso total para alugar todas as revistas do universo DC Comics. Limite de até 100 volumes por mês.",
      preco: "45,00",
      destaque: false,
    },
    {
      id: 3,
      codigo: "superhero",
      titulo: "Plano SUPERHERÓI",
      descricao:
        "A experiência definitiva! Acesso para alugar todas as revistas da Marvel e DC. Limite de até 200 volumes por mês.",
      preco: "85,00",
      destaque: true,
    },
  ];

  const handleAssinarPlano = (codigoPlano) => {
    if (!usuarioAtual.logado) {
      alert("Você precisa fazer login ou cadastro para assinar um plano.");
      navigate("/login");
      return;
    }

    const result = assinarPlano(codigoPlano);

    if (result.success) {
      alert(result.message);
      navigate("/minhaConta");
    } else {
      alert(result.message);
    }
  };

  return (
    <div className={styles.container}>
      <Header onChange={handleChange} value={searchTerm} />

      <main className={styles.hero}>
        <div className={styles.heroHeader}>
          <h2>Escolha seu Plano</h2>
          <p>
            Mergulhe no multiverso dos quadrinhos com assinaturas que cabem no
            seu bolso.
          </p>
        </div>

        <div className={styles.gridPlanos}>
          {planos.map((plano) => (
            <CardPlano
              key={plano.id}
              codigo={plano.codigo}
              titulo={plano.titulo}
              descricao={plano.descricao}
              preco={plano.preco}
              destaque={plano.destaque}
              planoAtual={usuarioAtual.plano}
              usuarioLogado={usuarioAtual.logado}
              onAssinar={handleAssinarPlano}
            />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}