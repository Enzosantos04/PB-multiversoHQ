import { createContext, useContext, useEffect, useState } from "react";

// ============================================================
// MOCK USERS — 4 situações cadastrais diferentes
// ============================================================
export const MOCK_USERS = [
  {
    id: 1,
    nome: "Visitante",
    email: null,
    logado: false,
    plano: null, // sem login
  },
  {
    id: 2,
    nome: "Carlos Silva",
    email: "carlos@email.com",
    logado: true,
    plano: null, // logado sem plano → 15% desconto no aluguel, paga frete
  },
  {
    id: 3,
    nome: "Ana Marvel",
    email: "ana@email.com",
    logado: true,
    plano: "marvel", // aluguel Marvel grátis, DC preço cheio
  },
  {
    id: 4,
    nome: "Bruno DC",
    email: "bruno@email.com",
    logado: true,
    plano: "dc", // aluguel DC grátis, Marvel preço cheio
  },
  {
    id: 5,
    nome: "Julia Super",
    email: "julia@email.com",
    logado: true,
    plano: "superhero", // aluguel Marvel E DC grátis
  },
];

// ============================================================
// PRICING LOGIC
// Preços base:
//   compra:  R$ 29,90
//   aluguel: R$ 29,90 (sem login) | R$ 25,42 (logado, -15%) | R$ 0 (coberto pelo plano)
//   frete:   R$ 15,00 (sem login ou sem plano) | R$ 0 (qualquer plano ativo)
// ============================================================
export const PRECO_COMPRA = 29.9;
export const PRECO_ALUGUEL_CHEIO = 29.9;
export const PRECO_FRETE = 15.0;
export const DESCONTO_LOGIN = 0.15;

export function calcularPrecoAluguel(usuario, publisherId) {
  // Sem login → preço cheio
  if (!usuario.logado) return PRECO_ALUGUEL_CHEIO;

  const plano = usuario.plano;

  // Plano superhero cobre tudo
  if (plano === "superhero") return 0;

  // Plano Marvel cobre quadrinhos Marvel (publisherId 31)
  if (plano === "marvel" && publisherId === 31) return 0;

  // Plano DC cobre quadrinhos DC (publisherId 10)
  if (plano === "dc" && publisherId === 10) return 0;

  // Logado sem cobertura de plano → 15% de desconto
  return parseFloat((PRECO_ALUGUEL_CHEIO * (1 - DESCONTO_LOGIN)).toFixed(2));
}

export function calcularFrete(usuario) {
  // Qualquer plano ativo = frete grátis
  if (usuario.logado && usuario.plano !== null) return 0;
  return PRECO_FRETE;
}

// ============================================================
// API FETCH
// ============================================================
const ComicsContext = createContext(null);
const mykey = import.meta.env.VITE_COMIC_VINE_API_KEY;

async function fetchVolumes(extraParams = "") {
  const apiUrl = `https://comicvine.gamespot.com/api/volumes/?api_key=${mykey}&format=json&field_list=id,name,image,publisher,description${extraParams}`;
  const response = await fetch(`https://corsproxy.io/?${encodeURIComponent(apiUrl)}`);
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  const data = await response.json();
  return data.results || [];
}

// publisherId injetado direto para regras de plano serem seguras
function formatItems(results) {
  return results.map((item) => ({
    id: item.id,
    titulo: item.name,
    imagem: item.image?.medium_url || item.image?.original_url,
    categoria: item.publisher?.name || "Quadrinhos",
    publisherId: item.publisher?.id || null, // <-- chave para regras do plano
    description: item.description,
    preco: "29,90",
  }));
}

// ============================================================
// PROVIDER
// ============================================================
export function ComicsProvider({ children }) {
  // --- Comics state ---
  const [marvel, setMarvel] = useState([]);
  const [dc, setDc] = useState([]);
  const [recent, setRecent] = useState([]);
  const [iconic, setIconic] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // --- Auth state (mock) ---
  // Começa como visitante (MOCK_USERS[0])
  const [usuarioAtual, setUsuarioAtual] = useState(MOCK_USERS[0]);

  // --- Cart state ---
  // Chave primária do item = `${id}_buy` ou `${id}_rent`
  const [carrinho, setCarrinho] = useState([]);

  // --- Comics fetch ---
  useEffect(() => {
    async function loadAll() {
      try {
        const results = await fetchVolumes("&limit=100");
        const marvelItems = results.filter((i) => i.publisher?.id === 31);
        const dcItems = results.filter((i) => i.publisher?.id === 10);

        setMarvel(formatItems(marvelItems.slice(0, 20)));
        setDc(formatItems(dcItems.slice(0, 20)));
        setRecent(formatItems(results.slice(0, 20)));
        setIconic(
          formatItems(
            [...results]
              .sort((a, b) => (b.count_of_issues || 0) - (a.count_of_issues || 0))
              .slice(0, 20)
          )
        );
      } catch (error) {
        console.error("ComicsContext: Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    loadAll();
  }, []);

  // --- Search ---
  useEffect(() => {
    if (!searchTerm) { setSearchResults([]); return; }
    async function search() {
      try {
        const results = await fetchVolumes(`&filter=name:${searchTerm}`);
        setSearchResults(formatItems(results));
      } catch (error) {
        console.error("ComicsContext: Search error:", error);
      }
    }
    const debounce = setTimeout(search, 400);
    return () => clearTimeout(debounce);
  }, [searchTerm]);

  // --- Cart actions ---
  function addToCart(comic, acao) {
    // acao: 'buy' | 'rent'
    const cartKey = `${comic.id}_${acao}`;
    setCarrinho((prev) => {
      const exists = prev.find((i) => i.cartKey === cartKey);
      if (exists) {
        // Se já existe, incrementa quantidade
        return prev.map((i) =>
          i.cartKey === cartKey ? { ...i, quantidade: i.quantidade + 1 } : i
        );
      }
      return [
        ...prev,
        {
          cartKey,
          id: comic.id,
          titulo: comic.titulo,
          imagem: comic.imagem,
          publisherId: comic.publisherId,
          acao, // 'buy' | 'rent'
          quantidade: 1,
        },
      ];
    });
  }

  function removeFromCart(cartKey) {
    setCarrinho((prev) => prev.filter((i) => i.cartKey !== cartKey));
  }

  function updateQuantidade(cartKey, delta) {
    setCarrinho((prev) =>
      prev
        .map((i) =>
          i.cartKey === cartKey ? { ...i, quantidade: i.quantidade + delta } : i
        )
        .filter((i) => i.quantidade > 0)
    );
  }

  function limparCarrinho() {
    setCarrinho([]);
  }

  const totalItens = carrinho.reduce((acc, i) => acc + i.quantidade, 0);

  return (
    <ComicsContext.Provider
      value={{
        // Comics
        marvel, dc, recent, iconic, loading,
        searchResults, searchTerm, setSearchTerm,
        // Auth
        usuarioAtual, setUsuarioAtual, MOCK_USERS,
        // Cart
        carrinho, addToCart, removeFromCart, updateQuantidade, limparCarrinho, totalItens,
        // Pricing helpers
        calcularPrecoAluguel, calcularFrete,
        PRECO_COMPRA, PRECO_ALUGUEL_CHEIO, PRECO_FRETE,
      }}
    >
      {children}
    </ComicsContext.Provider>
  );
}

export const useComics = () => useContext(ComicsContext);
