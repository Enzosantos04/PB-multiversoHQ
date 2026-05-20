import React, { useEffect, useState } from "react";
import styles from "../components/modules/Home.module.css";
import CardQuadrinho from "../components/CardQuadrinho.jsx";
import Header from "../components/Header.jsx";
import Banner from "../components/Banner.jsx";
import Footer from "../components/Footer.jsx";

const mykey = import.meta.env.VITE_COMIC_VINE_API_KEY;

export default function Home() {
  const [quadrinho, setQuadrinho] = useState([]);
  const [quadrinhoDc, setQuadrinhoDc] = useState([]);
  const [value, setValue] = useState("");

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      const apiUrl = `https://comicvine.gamespot.com/api/volumes/?api_key=${mykey}&format=json&field_list=id,name,image,publisher,description`;
      const response = await fetch(
        `https://corsproxy.io/?${encodeURIComponent(apiUrl)}`,
      );

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();

      const apenasMarvel = data.results.filter(
        (item) => item.publisher?.id === 31,
      );

      const apenasDc = data.results.filter((item) => item.publisher?.id === 10);

      const quadrinhosFormatados = apenasMarvel
        .slice(0, 5)
        .map((item) => ({
          id: item.id,
          titulo: item.name,
          imagem: item.image?.medium_url || item.image?.original_url,
          categoria: item.publisher?.name || "Quadrinhos",
          description: item.description,
          preco: "29,90",
        }));

      const quadrinhosDcFormatados = apenasDc
        .slice(0, 5)
        .map((item) => ({
          id: item.id,
          titulo: item.name,
          imagem: item.image?.medium_url || item.image?.original_url,
          categoria: item.publisher?.name || "Quadrinhos",
          description: item.description,
          preco: "29,90",
        }));

      setQuadrinho(quadrinhosFormatados);
      setQuadrinhoDc(quadrinhosDcFormatados);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className={styles.container}>
      <Header onChange={handleChange} value={value} />
      <Banner />
      
      <section className={styles.hero}>
        <h2>Marvel</h2>
        <div className={styles.carrossel}>
          {quadrinho.map((item) => (
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
      </section>

      <section className={styles.hero}>
        <h2>DC Comics</h2>
        <div className={styles.carrossel}>
          {quadrinhoDc.map((item) => (
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
      </section>
      
      <Footer />
    </div>
  );
}
