import React from "react";
import styles from "../components/modules/Home.module.css";
import CardQuadrinho from "../components/CardQuadrinho.jsx";
import Header from "../components/Header.jsx";
import Banner from "../components/Banner.jsx";
import Footer from "../components/Footer.jsx";
import { useComics } from "../context/ComicsContext";

export default function Home() {
  const { marvel, dc, loading, searchTerm, setSearchTerm, searchResults } = useComics();

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const isSearching = searchTerm.length > 0;

  return (
    <div className={styles.container}>
      <Header onChange={handleChange} value={searchTerm} />
      <Banner />

      {isSearching ? (
        <section className={styles.hero}>
          <h2>Resultados para "{searchTerm}"</h2>
          <div className={styles.carrossel}>
            {searchResults.length === 0 ? (
              <p style={{ color: "var(--text-color)", opacity: 0.6 }}>Buscando...</p>
            ) : (
              searchResults.map((item) => (
                <CardQuadrinho
                  key={item.id}
                  id={item.id}
                  titulo={item.titulo}
                  imagem={item.imagem}
                  categoria={item.categoria}
                  preco={item.preco}
                />
              ))
            )}
          </div>
        </section>
      ) : (
        <>
          <section className={styles.hero}>
            <h2>Marvel</h2>
            <div className={styles.carrossel}>
              {loading ? (
                <p style={{ color: "var(--text-color)", opacity: 0.6 }}>Carregando...</p>
              ) : (
                marvel.map((item) => (
                  <CardQuadrinho
                    key={item.id}
                    id={item.id}
                    titulo={item.titulo}
                    imagem={item.imagem}
                    categoria={item.categoria}
                    preco={item.preco}
                  />
                ))
              )}
            </div>
          </section>

          <section className={styles.hero}>
            <h2>DC Comics</h2>
            <div className={styles.carrossel}>
              {loading ? (
                <p style={{ color: "var(--text-color)", opacity: 0.6 }}>Carregando...</p>
              ) : (
                dc.map((item) => (
                  <CardQuadrinho
                    key={item.id}
                    id={item.id}
                    titulo={item.titulo}
                    imagem={item.imagem}
                    categoria={item.categoria}
                    preco={item.preco}
                  />
                ))
              )}
            </div>
          </section>
        </>
      )}

      <Footer />
    </div>
  );
}
