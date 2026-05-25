import React from "react";
import styles from "./modules/CardPlano.module.css"

export default function CardPlano({ titulo, descricao, preco, destaque }) {
    return (
        <div className={`${styles.card} ${destaque ? styles.destaque : ""}`}>
            {destaque && <div className={styles.badge}>Mais Popular</div>}
            <h3 className={styles.titulo}>{titulo}</h3>
            <p className={styles.descricao}>{descricao}</p>
            <div className={styles.precoContainer}>
                <span className={styles.moeda}>R$</span>
                <span className={styles.preco}>{preco}</span>
                <span className={styles.periodo}>/mês</span>
            </div>
            <button className={styles.btnAssinar}>Assinar Plano</button>
        </div>
    );
}