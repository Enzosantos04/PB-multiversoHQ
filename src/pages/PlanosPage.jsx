import React, { useState } from "react";
import styles from "./modules/PlanosPage.module.css"
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import CardPlano from "../components/CardPlano.jsx";

export default function PlanosPage() {
    const [searchTerm, setSearchTerm] = useState("");

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const planos = [
        {
            id: 1,
            titulo: "Plano Marvel",
            descricao: "Acesso total para alugar todas as revistas do universo Marvel. Limite de até 100 volumes por mês.",
            preco: "90,00",
            destaque: false,
        },
        {
            id: 2,
            titulo: "Plano DC",
            descricao: "Acesso total para alugar todas as revistas do universo DC Comics. Limite de até 100 volumes por mês.",
            preco: "90,00",
            destaque: false,
        },
        {
            id: 3,
            titulo: "Plano SUPERHERÓI",
            descricao: "A experiência definitiva! Acesso para alugar todas as revistas da Marvel e DC. Limite de até 200 volumes por mês.",
            preco: "165,00",
            destaque: true,
        },
    ];

    return (
        <div className={styles.container}>
            <Header onChange={handleChange} value={searchTerm} />

            <main className={styles.hero}>
                <div className={styles.heroHeader}>
                    <h2>Escolha seu Plano</h2>
                    <p>Mergulhe no multiverso dos quadrinhos com assinaturas que cabem no seu bolso.</p>
                </div>

                <div className={styles.gridPlanos}>
                    {planos.map((plano) => (
                        <CardPlano
                            key={plano.id}
                            titulo={plano.titulo}
                            descricao={plano.descricao}
                            preco={plano.preco}
                            destaque={plano.destaque}
                        />
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
}