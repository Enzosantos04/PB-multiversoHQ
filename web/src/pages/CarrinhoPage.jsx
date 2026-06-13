import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useComics } from "../context/ComicsContext";
import styles from "./modules/Carrinho.module.css";
import { IoCartOutline } from "react-icons/io5";

// Label legível do plano
const PLANO_LABEL = {
  null: "Sem plano",
  marvel: "Plano Marvel",
  dc: "Plano DC",
  superhero: "Plano SuperHerói",
};

export default function CarrinhoPage() {
  const {
    carrinho,
    removeFromCart,
    updateQuantidade,
    limparCarrinho,
    usuarioAtual,
    setUsuarioAtual,
    MOCK_USERS,
    calcularPrecoAluguel,
    calcularFrete,
    PRECO_COMPRA,
    searchTerm,
    setSearchTerm,
  } = useComics();

  const [pedidoFinalizado, setPedidoFinalizado] = useState(false);

  // Estados do cálculo de frete
  const [cep, setCep] = useState("");
  const [freteCalculado, setFreteCalculado] = useState(null);
  const [localizacao, setLocalizacao] = useState(null);
  const [carregandoLocalizacao, setCarregandoLocalizacao] = useState(false);

  const handleChange = (e) => setSearchTerm(e.target.value);

  // Calcula preço de cada item conforme usuário atual
  function precoItem(item) {
    if (item.acao === "buy") return PRECO_COMPRA;
    return calcularPrecoAluguel(usuarioAtual, item.publisherId);
  }

  // Subtotal dos itens
  const subtotal = carrinho.reduce(
    (acc, item) => acc + precoItem(item) * item.quantidade,
    0,
  );

  // Frete original do sistema + frete calculado por CEP/localização
  const freteBase = carrinho.length > 0 ? calcularFrete(usuarioAtual) : 0;
  const frete = freteCalculado !== null ? freteCalculado : freteBase;
  const total = subtotal + frete;

  function calcularFretePorCep() {
    const cepLimpo = cep.replace(/\D/g, "");

    if (cepLimpo.length !== 8) {
      alert("Digite um CEP válido com 8 números.");
      return;
    }

    const prefixo = Number(cepLimpo.slice(0, 2));

    let valorFrete = 18;

    // Simulação de regra de negócio:
    // CEPs 20-28: Rio de Janeiro
    // CEPs 30-39: Minas Gerais
    // Outros: frete padrão
    if (prefixo >= 20 && prefixo <= 28) {
      valorFrete = 8;
    } else if (prefixo >= 30 && prefixo <= 39) {
      valorFrete = 12;
    }

    setFreteCalculado(valorFrete);
  }

  function usarLocalizacaoAtual() {
    if (!navigator.geolocation) {
      alert("Geolocalização não é suportada neste navegador.");
      return;
    }

    setCarregandoLocalizacao(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        setLocalizacao({
          latitude,
          longitude,
        });

        let valorFrete = 18;

        // Rio de Janeiro aproximado
        if (
          latitude >= -23.2 &&
          latitude <= -22.6 &&
          longitude >= -43.8 &&
          longitude <= -42.8
        ) {
          valorFrete = 8;
        }

        // Minas Gerais aproximado
        else if (
          latitude >= -22.5 &&
          latitude <= -14.0 &&
          longitude >= -51.0 &&
          longitude <= -39.5
        ) {
          valorFrete = 12;
        }

        setFreteCalculado(valorFrete);
        setCarregandoLocalizacao(false);
      },
      () => {
        alert("Não foi possível obter sua localização.");
        setCarregandoLocalizacao(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    );
  }

  // Descrição do desconto aplicado
  function descricaoPreco(item) {
    if (item.acao === "buy") return null;

    const preco = calcularPrecoAluguel(usuarioAtual, item.publisherId);
    if (preco === 0) {
      const plano = usuarioAtual.plano;
      if (plano === "superhero") return "✓ Coberto pelo Plano SuperHerói";
      if (plano === "marvel") return "✓ Coberto pelo Plano Marvel";
      if (plano === "dc") return "✓ Coberto pelo Plano DC";
    }
    if (usuarioAtual.logado && preco < 29.9) {
      return "✓ 15% desconto (cliente logado)";
    }
    return null;
  }

  if (pedidoFinalizado) {
    return (
      <div className={styles.page}>
        <Header onChange={handleChange} value={searchTerm} />
        <main className={styles.successWrapper}>
          <div className={styles.successBox}>
            <span className={styles.successIcon}>🎉</span>
            <h2>Pedido Confirmado!</h2>
            <p>
              Obrigado, <strong>{usuarioAtual.nome}</strong>! Seu pedido foi
              realizado com sucesso.
            </p>
            <p className={styles.totalConfirmado}>
              Total pago:{" "}
              <strong>R$ {total.toFixed(2).replace(".", ",")}</strong>
            </p>
            <Link to="/" className={styles.btnVoltar}>
              Voltar para a Home
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <Header onChange={handleChange} value={searchTerm} />

      <main className={styles.main}>
        <h1 className={styles.pageTitle}>
          <IoCartOutline color="red" /> Carrinho
        </h1>

        {/* Usuário ativo */}
        <div className={styles.usuarioAtivo}>
          <div className={styles.usuarioInfo}>
            <span className={styles.usuarioAvatar}>
              {usuarioAtual.logado ? "👤" : "🕵️"}
            </span>
            <div>
              <p className={styles.usuarioNome}>{usuarioAtual.nome}</p>
              <p className={styles.usuarioStatus}>
                {usuarioAtual.logado
                  ? usuarioAtual.plano
                    ? `${PLANO_LABEL[usuarioAtual.plano]} ativo`
                    : "Logado · sem plano"
                  : "Não logado · preços cheios"}
              </p>
            </div>
          </div>

          <div className={styles.freteInfo}>
            {frete === 0 ? (
              <span className={styles.freteGratis}>🚚 Frete grátis!</span>
            ) : (
              <span className={styles.fretePago}>
                🚚 Frete: R$ {frete.toFixed(2).replace(".", ",")}
              </span>
            )}
          </div>
        </div>

        {carrinho.length === 0 ? (
          <div className={styles.emptyCart}>
            <span className={styles.emptyIcon}>📭</span>
            <p>Seu carrinho está vazio.</p>
            <Link to="/catalogo" className={styles.btnVoltar}>
              Ver Catálogo
            </Link>
          </div>
        ) : (
          <div className={styles.layout}>
            {/* Lista de itens */}
            <div className={styles.itemsList}>
              {carrinho.map((item) => {
                const preco = precoItem(item);
                const desconto = descricaoPreco(item);

                return (
                  <div key={item.cartKey} className={styles.itemCard}>
                    <img
                      src={item.imagem}
                      alt={item.titulo}
                      className={styles.itemImagem}
                    />

                    <div className={styles.itemInfo}>
                      <h3 className={styles.itemTitulo}>{item.titulo}</h3>

                      <span
                        className={`${styles.itemAcao} ${
                          item.acao === "rent"
                            ? styles.acaoAluguel
                            : styles.acaoCompra
                        }`}
                      >
                        {item.acao === "rent" ? "Aluguel" : "Compra"}
                      </span>

                      {desconto && (
                        <span className={styles.descontoTag}>{desconto}</span>
                      )}

                      <p className={styles.itemPrecoUnit}>
                        {preco === 0 ? (
                          <span className={styles.gratis}>Grátis</span>
                        ) : (
                          `R$ ${preco.toFixed(2).replace(".", ",")} /un`
                        )}
                      </p>
                    </div>

                    <div className={styles.itemControls}>
                      <div className={styles.qtdControls}>
                        <button
                          type="button"
                          onClick={() => updateQuantidade(item.cartKey, -1)}
                        >
                          −
                        </button>

                        <span>{item.quantidade}</span>

                        <button
                          type="button"
                          onClick={() => updateQuantidade(item.cartKey, 1)}
                        >
                          +
                        </button>
                      </div>

                      <p className={styles.itemTotal}>
                        {preco === 0 ? (
                          <span className={styles.gratis}>Grátis</span>
                        ) : (
                          `R$ ${(preco * item.quantidade)
                            .toFixed(2)
                            .replace(".", ",")}`
                        )}
                      </p>

                      <button
                        type="button"
                        className={styles.btnRemover}
                        onClick={() => removeFromCart(item.cartKey)}
                      >
                        🗑
                      </button>
                    </div>
                  </div>
                );
              })}

              <button
                type="button"
                className={styles.btnLimpar}
                onClick={limparCarrinho}
              >
                Limpar carrinho
              </button>
            </div>

            {/* Resumo do pedido */}
            <div className={styles.resumo}>
              <h2 className={styles.resumoTitulo}>Resumo do Pedido</h2>

              <div className={styles.freteBox}>
                <h3>Calcular frete</h3>

                <input
                  className={styles.cepInput}
                  type="text"
                  placeholder="Digite seu CEP"
                  value={cep}
                  onChange={(e) => setCep(e.target.value)}
                  maxLength={9}
                />

                <button
                  className={styles.freteButton}
                  type="button"
                  onClick={calcularFretePorCep}
                >
                  Calcular pelo CEP
                </button>

                <button
                  className={styles.localizacaoButton}
                  type="button"
                  onClick={usarLocalizacaoAtual}
                  disabled={carregandoLocalizacao}
                >
                  {carregandoLocalizacao
                    ? "Buscando localização..."
                    : "Usar minha localização"}
                </button>

                {localizacao && (
                  <p className={styles.localizacaoTexto}>
                    Localização detectada: {localizacao.latitude.toFixed(4)},{" "}
                    {localizacao.longitude.toFixed(4)}
                  </p>
                )}

                {freteCalculado !== null && (
                  <p className={styles.freteResultado}>
                    Frete calculado: R${" "}
                    {freteCalculado.toFixed(2).replace(".", ",")}
                  </p>
                )}
              </div>

              <div className={styles.resumoLinha}>
                <span>Subtotal</span>
                <span>R$ {subtotal.toFixed(2).replace(".", ",")}</span>
              </div>

              <div className={styles.resumoLinha}>
                <span>Frete</span>
                <span className={frete === 0 ? styles.gratis : ""}>
                  {frete === 0
                    ? "Grátis"
                    : `R$ ${frete.toFixed(2).replace(".", ",")}`}
                </span>
              </div>

              {usuarioAtual.logado && !usuarioAtual.plano && (
                <div className={styles.resumoDesconto}>
                  <span>ℹ️ Aluguéis com 15% de desconto aplicado</span>
                </div>
              )}

              {usuarioAtual.plano && (
                <div className={styles.resumoDesconto}>
                  <span>
                    ✓ {PLANO_LABEL[usuarioAtual.plano]}: aluguéis cobertos
                    grátis
                  </span>
                </div>
              )}

              {!usuarioAtual.logado && (
                <div className={styles.resumoLogin}>
                  <Link to="/login">Faça login</Link> para ganhar 15% de
                  desconto nos aluguéis e frete grátis com um plano.
                </div>
              )}

              <div className={styles.resumoTotal}>
                <span>Total</span>
                <span>R$ {total.toFixed(2).replace(".", ",")}</span>
              </div>

              <button
                type="button"
                className={styles.btnFinalizar}
                onClick={() => {
                  limparCarrinho();
                  setPedidoFinalizado(true);
                }}
              >
                Finalizar Pedido
              </button>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}