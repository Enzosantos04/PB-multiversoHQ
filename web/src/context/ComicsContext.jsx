import React, { createContext, useContext, useEffect, useState } from "react";

// ============================================================
// MOCK USERS — 4 situações cadastrais diferentes e um visitante
// ============================================================

export const USUARIO_VISITANTE = {
  id: null,
  nome: "Usuário não logado",
  email: null,
  logado: false,
  plano: null,
};

export const MOCK_USERS = [
  {
    id: 1,
    nome: "Carlos Silva",
    email: "carlos@email.com",
    password: "1234",
    logado: true,
    plano: null,
  },
  {
    id: 2,
    nome: "Ana Marvel",
    email: "ana@email.com",
    password: "1234",
    logado: true,
    plano: "marvel",
  },
  {
    id: 3,
    nome: "Bruno DC",
    email: "bruno@email.com",
    password: "1234",
    logado: true,
    plano: "dc",
  },
  {
    id: 4,
    nome: "Julia Super",
    email: "julia@email.com",
    password: "1234",
    logado: true,
    plano: "superhero",
  },
];

// ============================================================
// PRICING LOGIC
// Preços base:
//   compra:  R$ 29,90
//   aluguel: R$ 29,90 sem plano | R$ 0 quando coberto pelo plano
//   frete:   R$ 15,00 sem plano | R$ 0 com qualquer plano ativo
// ============================================================
export const PRECO_COMPRA = 29.9;
export const PRECO_ALUGUEL_CHEIO = 29.9;
export const PRECO_FRETE = 15.0;
export const DESCONTO_LOGIN = 0.15;

export function calcularPrecoAluguel(usuario, publisherId) {
  // Sem login → preço cheio
  if (!usuario.logado) return PRECO_ALUGUEL_CHEIO;

  const plano = usuario.plano;

  // Plano SuperHerói cobre tudo
  if (plano === "superhero") return 0;

  // Plano Marvel cobre quadrinhos Marvel
  if (plano === "marvel" && publisherId === 31) return 0;

  // Plano DC cobre quadrinhos DC
  if (plano === "dc" && publisherId === 10) return 0;

  // Logado sem cobertura de plano → 15% de desconto no aluguel
  return parseFloat((PRECO_ALUGUEL_CHEIO * (1 - DESCONTO_LOGIN)).toFixed(2));
}

export function calcularFrete(usuario) {
  if (usuario?.logado && usuario?.plano !== null) {
    return 0;
  }

  return PRECO_FRETE;
}

// ============================================================
// API FETCH
// ============================================================
const ComicsContext = createContext(null);
const mykey = import.meta.env.VITE_COMIC_VINE_API_KEY;

async function fetchVolumes(extraParams = "") {
  const apiUrl = `https://comicvine.gamespot.com/api/volumes/?api_key=${mykey}&format=json&field_list=id,name,image,publisher,description${extraParams}`;
  const response = await fetch(
    `https://corsproxy.io/?${encodeURIComponent(apiUrl)}`,
  );
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
  const [historicoPedidos, setHistoricoPedidos] = useState(() => {
    const pedidosSalvos = localStorage.getItem("historicoPedidos");
    return pedidosSalvos ? JSON.parse(pedidosSalvos) : [];
  });
  // --- Auth state (mock) ---
  const [users, setUsers] = useState(MOCK_USERS);
  // Começa como visitante (USUARIO_VISITANTE)
  const [usuarioAtual, setUsuarioAtual] = useState(USUARIO_VISITANTE);

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
              .sort(
                (a, b) => (b.count_of_issues || 0) - (a.count_of_issues || 0),
              )
              .slice(0, 20),
          ),
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
    if (!searchTerm) {
      setSearchResults([]);
      return;
    }
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
          i.cartKey === cartKey ? { ...i, quantidade: i.quantidade + 1 } : i,
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
          i.cartKey === cartKey
            ? { ...i, quantidade: i.quantidade + delta }
            : i,
        )
        .filter((i) => i.quantidade > 0),
    );
  }

  function limparCarrinho() {
    setCarrinho([]);
  }

  function finalizarPedido({ itens, subtotal, frete, total }) {
    const novoPedido = {
      id: `#${Date.now().toString().slice(-6)}`,
      data: new Date().toLocaleDateString("pt-BR"),
      usuarioEmail: usuarioAtual.email,
      itens: itens.map((item) => ({
        titulo: item.titulo,
        tipo: item.acao === "rent" ? "Aluguel" : "Compra",
        quantidade: item.quantidade,
      })),
      item: itens.map((item) => item.titulo).join(", "),
      tipo: itens.some((item) => item.acao === "buy")
        ? itens.some((item) => item.acao === "rent")
          ? "Compra/Aluguel"
          : "Compra"
        : "Aluguel",
      status: "Processando",
      subtotal,
      frete,
      total,
    };

    setHistoricoPedidos((prev) => {
      const atualizado = [novoPedido, ...prev];
      localStorage.setItem("historicoPedidos", JSON.stringify(atualizado));
      return atualizado;
    });

    return novoPedido;
  }

  const totalItens = carrinho.reduce((acc, i) => acc + i.quantidade, 0);
  function login(email, password) {
    // Busca usuário pelo email (mock simples)
    const user = users.find((u) => u.email === email);

    if (user && user.password === password) {
      setUsuarioAtual(user);
      return { success: true };
    }

    return { success: false, message: "E-mail ou senha incorretos." };
  }

  function register(name, email, password) {
    // Verifica se usuário já existe
    if (users.find((u) => u.email === email)) {
      return { success: false, message: "Este e-mail já está cadastrado." };
    }

    const newUser = {
      id: users.length + 1,
      nome: name,
      email: email,
      password: password,
      logado: true,
      plano: null,
    };

    setUsers((prev) => [...prev, newUser]);
    setUsuarioAtual(newUser);

    return { success: true };
  }

  function assinarPlano(plano) {
    if (!usuarioAtual.logado) {
      return {
        success: false,
        message: "Você precisa estar logado para assinar um plano.",
      };
    }

    const usuarioAtualizado = {
      ...usuarioAtual,
      plano,
    };

    setUsuarioAtual(usuarioAtualizado);

    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.email === usuarioAtual.email ? usuarioAtualizado : user,
      ),
    );

    return {
      success: true,
      message: "Plano assinado com sucesso!",
    };
  }

  function logout() {
     setUsuarioAtual(USUARIO_VISITANTE);
  }

  return (
    <ComicsContext.Provider
      value={{
        // Comics
        marvel,
        dc,
        recent,
        iconic,
        loading,
        searchResults,
        searchTerm,
        setSearchTerm,
        // Auth
        usuarioAtual,
        setUsuarioAtual,
        MOCK_USERS,
        login,
        logout,
        register,
        assinarPlano,
        // Pedidos
        historicoPedidos,
        finalizarPedido,
        // Cart
        carrinho,
        addToCart,
        removeFromCart,
        updateQuantidade,
        limparCarrinho,
        totalItens,
        // Pricing helpers
        calcularPrecoAluguel,
        calcularFrete,
        PRECO_COMPRA,
        PRECO_ALUGUEL_CHEIO,
        PRECO_FRETE,
      }}
    >
      {children}
    </ComicsContext.Provider>
  );
}

export const useComics = () => useContext(ComicsContext);
