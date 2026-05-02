import React, { useEffect, useState } from "react";
import styles from "../components/modules/Home.module.css";
import CardQuadrinho from "../components/CardQuadrinho";
import Header from "../components/Header";

const mykey = import.meta.env.VITE_COMIC_VINE_API_KEY;

export default function Home() {
  const [quadrinho, setQuadrinho] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      // Usando o endpoint /volumes/ para buscar quadrinhos diversos (HQs variadas)
      const apiUrl = `https://comicvine.gamespot.com/api/volumes/?api_key=${mykey}&format=json&limit=20&sort=date_added:desc&field_list=id,name,image,publisher,description`;

      // cors proxy eh um mediador para evitar problemas de CORS, pois a API do Comic Vine não suporta requisições diretas do frontend
      //entao eh feita uma requisição para o cors proxy, que entao faz a request para a api
      //encodeURIComponent é usado para garantir que a URL seja corretamente formatada ao ser passada como parâmetro para o proxy
      const response = await fetch(
        `https://corsproxy.io/?${encodeURIComponent(apiUrl)}`,
      );

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();

      const quadrinhosFormatados = data.results.map((item) => ({
        id: item.id,
        titulo: item.name,
        imagem: item.image?.medium_url || item.image?.original_url,
        categoria: item.publisher?.name || "Quadrinhos",
        description: item.description,
        preco: "29,90",
      }));

      setQuadrinho(quadrinhosFormatados);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  return (
    <div className={styles.container}>
      <Header />
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
    </div>
  );
}
