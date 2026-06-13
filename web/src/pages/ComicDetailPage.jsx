import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useComics } from "../context/ComicsContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "./modules/ComicDetailPage.module.css";

export default function ComicDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { 
    marvel, dc, recent, iconic, searchResults, 
    addToCart, searchTerm, setSearchTerm, loading: contextLoading 
  } = useComics();
  
  const [comic, setComic] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Procura nas listas já carregadas
    const allComics = [...marvel, ...dc, ...recent, ...iconic, ...searchResults];
    const found = allComics.find((c) => String(c.id) === String(id));

    if (found) {
      setComic(found);
      setLoading(false);
    } else if (!contextLoading) {
      // Se não encontrou e o contexto terminou de carregar, tentamos buscar individualmente
      const fetchIndividual = async () => {
        setLoading(true);
        try {
          const mykey = import.meta.env.VITE_COMIC_VINE_API_KEY;
          const apiUrl = `https://comicvine.gamespot.com/api/volume/4050-${id}/?api_key=${mykey}&format=json&field_list=id,name,image,publisher,description`;
          const response = await fetch(`https://corsproxy.io/?${encodeURIComponent(apiUrl)}`);
          const data = await response.json();
          
          if (data.results) {
            const item = data.results;
            const formatted = {
              id: item.id,
              titulo: item.name,
              imagem: item.image?.medium_url || item.image?.original_url,
              categoria: item.publisher?.name || "Quadrinhos",
              publisherId: item.publisher?.id || null,
              description: item.description,
              preco: "29,90",
            };
            setComic(formatted);
          }
        } catch (error) {
          console.error("Error fetching individual comic:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchIndividual();
    }
  }, [id, marvel, dc, recent, iconic, searchResults, contextLoading]);

  const handleBack = () => navigate(-1);

  const handleAddToCart = (action) => {
    if (comic) {
      addToCart(comic, action);
    }
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value) {
      navigate("/catalogo");
    }
  };

  if (loading || contextLoading) {
    return (
      <div className={styles.container}>
        <Header onChange={handleChange} value={searchTerm} />
        <div className={styles.loading}>Carregando detalhes do quadrinho...</div>
        <Footer />
      </div>
    );
  }

  if (!comic) {
    return (
      <div className={styles.container}>
        <Header onChange={handleChange} value={searchTerm} />
        <div className={styles.error}>
          <p>Quadrinho não encontrado.</p>
          <button onClick={handleBack} className={styles.backButton}>Voltar</button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Header onChange={handleChange} value={searchTerm} />
      
      <main className={styles.main}>
        <button onClick={handleBack} className={styles.backButton}>
          ← Voltar
        </button>

        <div className={styles.content}>
          <div className={styles.imageSection}>
            <img src={comic.imagem} alt={comic.titulo} className={styles.image} />
          </div>

          <div className={styles.infoSection}>
            <span className={styles.category}>{comic.categoria}</span>
            <h1 className={styles.title}>{comic.titulo}</h1>
            <p className={styles.price}>R$ {comic.preco}</p>
            
            <div 
              className={styles.description} 
              dangerouslySetInnerHTML={{ __html: comic.description || "Sem descrição disponível." }} 
            />

            <div className={styles.actions}>
              <button 
                className={styles.btnAlugar} 
                onClick={() => handleAddToCart("rent")}
              >
                Alugar
              </button>
              <button 
                className={styles.btnComprar} 
                onClick={() => handleAddToCart("buy")}
              >
                Comprar
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
