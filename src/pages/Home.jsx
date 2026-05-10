import React, { useEffect, useState } from "react";
import styles from "../components/modules/Home.module.css";
import CardQuadrinho from "../components/CardQuadrinho.jsx";
import Header from "../components/Header";

const mykey = import.meta.env.VITE_COMIC_VINE_API_KEY;

export default function Home() {
  const [quadrinho, setQuadrinho] = useState([]);
  const [quadrinhoDc, setQuadrinhoDc] = useState([]);
  const [teste, setTeste] = useState("");
  const [value, setValue] = useState("");

  useEffect(() => {
    getData(value);
  }, [value]);

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
        .slice(0, 5) // pega 5 aleatórios
        .map((item) => ({
          id: item.id,
          titulo: item.name,
          imagem: item.image?.medium_url || item.image?.original_url,
          categoria: item.publisher?.name || "Quadrinhos",
          description: item.description,
          preco: "29,90",
        }));

      const quadrinhosDcFormatados = apenasDc
        .slice(0, 5) // pega 5 aleatórios
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

  useEffect(() => {
    getDataSearchBar(value);
  }, [value]);

  async function getDataSearchBar(filter) {
    try {
      const apiUrl = `https://comicvine.gamespot.com/api/volumes/?api_key=${mykey}&format=json&field_list=id,name,image,publisher,description&filter=name:${filter}`;
      const response = await fetch(
        `https://corsproxy.io/?${encodeURIComponent(apiUrl)}`,
      );

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();

      const teste = data.results
        .sort(() => 0.5 - Math.random())
        .map((item) => ({
          id: item.id,
          titulo: item.name,
          imagem: item.image?.medium_url || item.image?.original_url,
          categoria: item.publisher?.name || "Quadrinhos",
          description: item.description,
          preco: "29,90",
        }));
      setTeste(teste);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const handleChange = (e) => {
    console.log("Digitando:", e.target.value);
    setValue(e.target.value);
  };
  const catalogo = [...teste];

  const quadrinhosInput = catalogo.filter((item) =>
    item.titulo?.toLowerCase().includes(value.toLowerCase()),
  );
  console.log("VALOR DA BUSCA:", value);
  console.log("RESULTADO FILTRADO:", quadrinhosInput);

  return (
    <div className={styles.container}>
      <Header onChange={handleChange} value={value} />
      <section className={styles.hero}>
        <h2>Explore os melhores quadrinhos do momento</h2>
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
        <h2>Explore os melhores quadrinhos do momento</h2>
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
    </div>
  );
}
