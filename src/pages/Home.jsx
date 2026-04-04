import React from "react";
import styles from "../components/modules/Home.module.css";
import CardQuadrinho from "../components/CardQuadrinho";
import Header from "../components/Header";

const listaQuadrinhos = [
  {
    id: 1,
    titulo: "Homem-Aranha",
    imagem:
      "https://tse2.mm.bing.net/th/id/OIP.oVaptcS3N5aw7cuDsHtrHQHaLa?rs=1&pid=ImgDetMain&o=7&rm=3",
    categoria: "Ação",
    preco: 15,
  },
  {
    id: 2,
    titulo: "Batman",
    imagem:
      "https://i.pinimg.com/736x/ac/64/4b/ac644b13096352f91f92c9dfb1cc0093.jpg",
    categoria: "Aventura",
    preco: 20,
  },
  {
    id: 3,
    titulo: "Superman",
    imagem:
      "https://comicvine.gamespot.com/a/uploads/scale_medium/11120/111202620/4338422-9943360583-60175.jpg",
    categoria: "Ação",
    preco: 18,
  },
  {
    id: 4,
    titulo: "Mulher-Maravilha",
    imagem:
      "https://zonafantasmanet.wordpress.com/wp-content/uploads/2023/08/wonder-woman-2011-2016-a-twist-of-fate-v8-000.jpg",
    categoria: "Aventura",
    preco: 22,
  },
];

export default function Home() {
  return (
    <div className={styles.container}>
      <Header />
      <section className={styles.hero}>
        <h2>Explore os melhores quadrinhos do momento</h2>

        <div className={styles.carrossel}>
          {listaQuadrinhos.map((quadrinho) => (
            <CardQuadrinho
              key={quadrinho.id}
              id={quadrinho.id}
              titulo={quadrinho.titulo}
              imagem={quadrinho.imagem}
              categoria={quadrinho.categoria}
              preco={quadrinho.preco}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
