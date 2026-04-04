import { useNavigate } from "react-router-dom";
import styles from "./modules/CardQuadrinho.module.css";

const CardQuadrinho = ({ id, titulo, imagem, categoria, preco }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/quadrinho/${id}`);
  };

  return (
    <div className={styles.cardQuadrinho} onClick={handleClick}>
      <img src={imagem} alt={titulo} className={styles.cardImagem} />
      <div className={styles.cardInfo}>
        <h3 className={styles.cardTitulo}>{titulo}</h3>
        <p className={styles.cardCategoria}>{categoria}</p>
        {preco !== undefined && <p className={styles.cardPreco}>R$ {preco}</p>}
      </div>
    </div>
  );
};

export default CardQuadrinho;
