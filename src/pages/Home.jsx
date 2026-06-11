import React from "react";
import { Link } from "react-router-dom";
import styles from "./modules/Home.module.css";
import CardQuadrinho from "../components/CardQuadrinho.jsx";
import Header from "../components/Header.jsx";
import Banner from "../components/Banner.jsx";
import Footer from "../components/Footer.jsx";
import { useComics } from "../context/ComicsContext";

export default function Home() {
  const { marvel, dc, loading, searchTerm, setSearchTerm } = useComics();

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className={styles.pageWrapper}>
      <Header onChange={handleChange} value={searchTerm} />
      
      <main className={styles.mainContent}>
        <Banner />

        <section className={styles.gallerySection}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTitleWrapper}>
              <div className={styles.sectionMarker} />
              <h2 className={styles.sectionTitle}>Universo Marvel</h2>
            </div>
            <Link to="/catalogo?publisher=marvel" className={styles.sectionLink}>
              Ver Coleção Completa &rarr;
            </Link>
          </div>
          
          {loading ? (
            <div className={styles.loadingState}>
              <div className={styles.spinner}></div>
              <p>Carregando acervo...</p>
            </div>
          ) : (
            <div className={styles.grid}>
              {marvel.slice(0, 5).map((item) => (
                <CardQuadrinho
                  key={item.id}
                  id={item.id}
                  titulo={item.titulo}
                  imagem={item.imagem}
                  categoria={item.categoria}
                  preco={item.preco}
                  publisherId={item.publisherId}
                />
              ))}
            </div>
          )}
        </section>

        <section className={styles.gallerySection}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTitleWrapper}>
              <div className={styles.sectionMarker} />
              <h2 className={styles.sectionTitle}>Universo DC</h2>
            </div>
            <Link to="/catalogo?publisher=dc" className={styles.sectionLink}>
              Ver Coleção Completa &rarr;
            </Link>
          </div>

          {loading ? (
            <div className={styles.loadingState}>
              <div className={styles.spinner}></div>
              <p>Carregando acervo...</p>
            </div>
          ) : (
            <div className={styles.grid}>
              {dc.slice(0, 5).map((item) => (
                <CardQuadrinho
                  key={item.id}
                  id={item.id}
                  titulo={item.titulo}
                  imagem={item.imagem}
                  categoria={item.categoria}
                  preco={item.preco}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
