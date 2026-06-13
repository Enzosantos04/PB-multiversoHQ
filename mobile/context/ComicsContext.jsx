import { createContext, useContext, useEffect, useState } from "react";

export const MOCK_USERS = [
  { id: 1, nome: "Visitante", email: null, logado: false, plano: null },
  { id: 2, nome: "Carlos Silva", email: "carlos@email.com", logado: true, plano: null },
  { id: 3, nome: "Ana Marvel", email: "ana@email.com", logado: true, plano: "marvel" },
  { id: 4, nome: "Bruno DC", email: "bruno@email.com", senha: "1234", logado: true, plano: "dc" },
  { id: 5, nome: "Julia Super", email: "julia@email.com", logado: true, plano: "superhero" },
];

export const PRECO_COMPRA = 29.9;
export const PRECO_ALUGUEL_CHEIO = 29.9;
export const PRECO_FRETE = 15.0;
export const DESCONTO_LOGIN = 0.15;

export function calcularPrecoAluguel(usuario, publisherId) {
  if (!usuario.logado) return PRECO_ALUGUEL_CHEIO;
  const plano = usuario.plano;
  if (plano === "superhero") return 0;
  if (plano === "marvel" && publisherId === 31) return 0;
  if (plano === "dc" && publisherId === 10) return 0;
  return parseFloat((PRECO_ALUGUEL_CHEIO * (1 - DESCONTO_LOGIN)).toFixed(2));
}

export function calcularFrete(usuario) {
  if (usuario.logado && usuario.plano !== null) return 0;
  return PRECO_FRETE;
}

const ComicsContext = createContext(null);

// Sem proxy — mobile não tem restrição de CORS
// Trocado VITE_ por EXPO_PUBLIC_
const mykey = process.env.EXPO_PUBLIC_COMIC_VINE_API_KEY;

async function fetchVolumes(extraParams = "") {
  const apiUrl = `https://comicvine.gamespot.com/api/volumes/?api_key=${mykey}&format=json&field_list=id,name,image,publisher,description${extraParams}`;
  
  const url = typeof document !== 'undefined'
    ? `https://corsproxy.io/?${encodeURIComponent(apiUrl)}`
    : apiUrl

  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  const data = await response.json();
  return data.results || [];
}

function formatItems(results) {
  return results.map((item) => ({
    id: item.id,
    titulo: item.name,
    imagem: item.image?.medium_url || item.image?.original_url,
    categoria: item.publisher?.name || "Quadrinhos",
    publisherId: item.publisher?.id || null,
    description: item.description,
    preco: "29,90",
  }));
}

export function ComicsProvider({ children }) {
  const [marvel, setMarvel] = useState([]);
  const [dc, setDc] = useState([]);
  const [recent, setRecent] = useState([]);
  const [iconic, setIconic] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [usuarioAtual, setUsuarioAtual] = useState(MOCK_USERS[0]);
  const [carrinho, setCarrinho] = useState([]);

  useEffect(() => {
    async function loadAll() {
      try {
        const results = await fetchVolumes("&limit=100");
        const marvelItems = results.filter((i) => i.publisher?.id === 31);
        const dcItems = results.filter((i) => i.publisher?.id === 10);
        setMarvel(formatItems(marvelItems.slice(0, 20)));
        setDc(formatItems(dcItems.slice(0, 20)));
        setRecent(formatItems(results.slice(0, 20)));
        setIconic(formatItems([...results].sort((a, b) => (b.count_of_issues || 0) - (a.count_of_issues || 0)).slice(0, 20)));
      } catch (error) {
        console.error("ComicsContext: Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    loadAll();
  }, []);

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

  function addToCart(comic, acao) {
    const cartKey = `${comic.id}_${acao}`;
    setCarrinho((prev) => {
      const exists = prev.find((i) => i.cartKey === cartKey);
      if (exists) {
        return prev.map((i) => i.cartKey === cartKey ? { ...i, quantidade: i.quantidade + 1 } : i);
      }
      return [...prev, { cartKey, id: comic.id, titulo: comic.titulo, imagem: comic.imagem, publisherId: comic.publisherId, acao, quantidade: 1 }];
    });
  }

  function removeFromCart(cartKey) {
    setCarrinho((prev) => prev.filter((i) => i.cartKey !== cartKey));
  }

  function updateQuantidade(cartKey, delta) {
    setCarrinho((prev) =>
      prev.map((i) => i.cartKey === cartKey ? { ...i, quantidade: i.quantidade + delta } : i)
          .filter((i) => i.quantidade > 0)
    );
  }

  function limparCarrinho() {
    setCarrinho([]);
  }

  const totalItens = carrinho.reduce((acc, i) => acc + i.quantidade, 0);

  function login(email, password) {
    const user = MOCK_USERS.find((u) => u.email === email);
    if (user) {
      setUsuarioAtual({ ...user, logado: true });
      return { success: true };
    }
    return { success: false, message: "E-mail ou senha incorretos." };
  }

  function logout() {
    setUsuarioAtual(MOCK_USERS[0]);
  }

  return (
    <ComicsContext.Provider value={{
      marvel, dc, recent, iconic, loading,
      searchResults, searchTerm, setSearchTerm,
      usuarioAtual, setUsuarioAtual, MOCK_USERS, login, logout,
      carrinho, addToCart, removeFromCart, updateQuantidade, limparCarrinho, totalItens,
      calcularPrecoAluguel, calcularFrete,
      PRECO_COMPRA, PRECO_ALUGUEL_CHEIO, PRECO_FRETE,
    }}>
      {children}
    </ComicsContext.Provider>
  );
}

export const useComics = () => useContext(ComicsContext);