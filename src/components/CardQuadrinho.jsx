import { useNavigate } from "react-router-dom";
import styles from "./modules/CardQuadrinho.module.css";
import { useComics } from "../context/ComicsContext";

const CardQuadrinho = ({ id, titulo, imagem, categoria, preco, publisherId }) => {
  const navigate = useNavigate();
  const { addToCart } = useComics();

  const comic = { id, titulo, imagem, categoria, publisherId };

  const handleComprar = (e) => {
    e.stopPropagation(); // não navega ao clicar no botão
    addToCart(comic, "buy");
  };

  const handleAlugar = (e) => {
    e.stopPropagation();
    addToCart(comic, "rent");
  };

  return (
    <div className={styles.cardQuadrinho} onClick={() => navigate(`/quadrinho/${id}`)}>
      <img src={imagem} alt={titulo} className={styles.cardImagem} />
      <div className={styles.cardInfo}>
        <h3 className={styles.cardTitulo}>{titulo}</h3>
        <p className={styles.cardCategoria}>{categoria}</p>
        {preco !== undefined && <p className={styles.cardPreco}>R$ {preco}</p>}
      </div>
      <div className={styles.cardActions}>
        <button className={styles.btnAlugar} onClick={handleAlugar}>
          Alugar
        </button>
        <button className={styles.btnComprar} onClick={handleComprar}>
          Comprar
        </button>
      </div>
    </div>
  );
};

export default CardQuadrinho;
