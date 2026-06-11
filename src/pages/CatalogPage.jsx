import { useRef } from "react";
import CardQuadrinho from "../components/CardQuadrinho";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useComics } from "../context/ComicsContext";
import styles from "./modules/CatalogPage.module.css";

const SECTIONS = [
  { key: "marvel", label: "Marvel Universe", accent: "#ED1D24" },
  { key: "dc", label: "DC Comics", accent: "#0476F2" },
  { key: "recent", label: "Recém Adicionados", accent: "#F5A623" },
  { key: "iconic", label: "Séries Icônicas", accent: "#9B59B6" },
];

const CarouselRow = ({ section, items, loading }) => {
  const rowRef = useRef(null);
  const scroll = (dir) =>
    rowRef.current?.scrollBy({ left: dir * 300, behavior: "smooth" });

  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>
          {section.label}
        </h2>
        <div className={styles.arrows}>
          <button
            className={styles.arrowBtn}
            onClick={() => scroll(-1)}
            aria-label="scroll left"
          >
            ‹
          </button>
          <button
            className={styles.arrowBtn}
            onClick={() => scroll(1)}
            aria-label="scroll right"
          >
            ›
          </button>
        </div>
      </div>

      <div className={styles.rowWrapper} ref={rowRef}>
        {loading
          ? Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className={styles.skeleton} />
            ))
          : items.map((comic) => (
              <div
                key={comic.id}
                className={styles.cardWrapper}
              >
                <CardQuadrinho
                  id={comic.id}
                  titulo={comic.titulo}
                  imagem={comic.imagem}
                  categoria={comic.categoria}
                  preco={comic.preco}
                  publisherId={comic.publisherId}
                />
              </div>
            ))}
      </div>
    </div>
  );
};

export default function CatalogPage() {
  const {
    marvel,
    dc,
    recent,
    iconic,
    loading,
    searchTerm,
    setSearchTerm,
    searchResults,
  } = useComics();

  const sectionData = { marvel, dc, recent, iconic };

  const handleChange = (e) => setSearchTerm(e.target.value);
  const isSearching = searchTerm.length > 0;

  return (
    <div className={styles.page}>
      <Header onChange={handleChange} value={searchTerm} />

      <header className={styles.pageHeader}>
        <div className={styles.headerInner}>
          <span className={styles.storeBadge}>MULTIVERSO HQ &bull; CATALOGO OFICIAL</span>
          <h1 className={styles.pageTitle}>Explore o Acervo</h1>
          <p className={styles.pageSubtitle}>
            Milhares de histórias, heróis e vilões esperando por você. O maior catálogo de quadrinhos digitais do Brasil.
          </p>
        </div>
      </header>

      <main className={styles.main}>
        {isSearching ? (
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>
                Resultados para "{searchTerm}"
              </h2>
            </div>
            <div className={styles.rowWrapper} style={{ flexWrap: 'wrap', overflowX: 'visible' }}>
              {loading
                ? Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className={styles.skeleton} />
                  ))
                : searchResults.map((comic) => (
                    <div
                      key={comic.id}
                      className={styles.cardWrapper}
                    >
                      <CardQuadrinho
                        id={comic.id}
                        titulo={comic.titulo}
                        imagem={comic.imagem}
                        categoria={comic.categoria}
                        preco={comic.preco}
                      />
                    </div>
                  ))}
            </div>
          </div>
        ) : (
          SECTIONS.map((section) => (
            <CarouselRow
              key={section.key}
              section={section}
              items={sectionData[section.key] || []}
              loading={loading}
            />
          ))
        )}
      </main>

      <Footer />
    </div>
  );
}
