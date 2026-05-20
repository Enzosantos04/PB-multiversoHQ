import { useRef } from "react";
import CardQuadrinho from "../components/CardQuadrinho";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useComics } from "../context/ComicsContext";
import styles from "./modules/CatalogPage.module.css";

const SECTIONS = [
  { key: "marvel",  label: "Marvel Universe",    accent: "#ED1D24" },
  { key: "dc",      label: "DC Comics",           accent: "#0476F2" },
  { key: "recent",  label: "Recém Adicionados",   accent: "#F5A623" },
  { key: "iconic",  label: "Séries Icônicas",     accent: "#9B59B6" },
];

const CarouselRow = ({ section, items, loading }) => {
  const rowRef = useRef(null);
  const scroll = (dir) => rowRef.current?.scrollBy({ left: dir * 280, behavior: "smooth" });

  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <span className={styles.accentBar} style={{ background: section.accent }} />
        <h2 className={styles.sectionTitle} style={{ color: section.accent }}>
          {section.label}
        </h2>
        <div className={styles.arrows}>
          <button className={styles.arrowBtn} onClick={() => scroll(-2)} aria-label="scroll left">‹</button>
          <button className={styles.arrowBtn} onClick={() => scroll(2)} aria-label="scroll right">›</button>
        </div>
      </div>

      <div className={styles.rowWrapper} ref={rowRef}>
        {loading
          ? Array.from({ length: 4 }).map((_, i) => <div key={i} className={styles.skeleton} />)
          : items.map((comic) => (
              <div
                key={comic.id}
                className={styles.cardWrapper}
                style={{ "--accent": section.accent }}
              >
                <CardQuadrinho
                  id={comic.id}
                  titulo={comic.titulo}
                  imagem={comic.imagem}
                  categoria={comic.categoria}
                  preco={undefined}
                  publisherId={comic.publisherId}
                />
              </div>
            ))}
      </div>
    </div>
  );
};

export default function CatalogPage() {
  const { marvel, dc, recent, iconic, loading, searchTerm, setSearchTerm, searchResults } = useComics();

  const sectionData = { marvel, dc, recent, iconic };

  const handleChange = (e) => setSearchTerm(e.target.value);
  const isSearching = searchTerm.length > 0;

    const rowRef = useRef(null);
    const scroll = (dir) => rowRef.current?.scrollBy({ left: dir * 280, behavior: "smooth" });

  return (
    <div className={styles.page}>
      <Header onChange={handleChange} value={searchTerm} />

      <div className={styles.pageHeader}>
        <div className={styles.headerInner}>
          <span className={styles.storeBadge}>★ MULTIVERSO HQ</span>
          <h1 className={styles.pageTitle}>Catálogo</h1>
          <p className={styles.pageSubtitle}>Explore o universo dos quadrinhos</p>
        </div>
      </div>

      <main className={styles.main}>
        {isSearching ? (
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <span className={styles.accentBar} style={{ background: "#F5A623" }} />
              <h2 className={styles.sectionTitle} style={{ color: "#F5A623" }}>
                Resultados para "{searchTerm}"
              </h2>
                <div className={styles.arrows}>
                    <button className={styles.arrowBtn} onClick={() => scroll(-2)} aria-label="scroll left">‹</button>
                    <button className={styles.arrowBtn} onClick={() => scroll(2)} aria-label="scroll right">›</button>
                </div>
            </div>
              <div className={styles.rowWrapper} ref={rowRef}>
                  {loading
                      ? Array.from({ length: 4 }).map((_, i) => <div key={i} className={styles.skeleton} />)
                      : searchResults.map((comic) => (
                          <div
                              key={comic.id}
                              className={styles.cardWrapper}
                              style={{ "--accent": "#F5A623" }}
                          >
                              <CardQuadrinho
                                  id={comic.id}
                                  titulo={comic.titulo}
                                  imagem={comic.imagem}
                                  categoria={comic.categoria}
                                  preco={undefined}
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
