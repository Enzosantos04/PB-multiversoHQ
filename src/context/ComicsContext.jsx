import { createContext, useContext, useEffect, useState } from "react";

const ComicsContext = createContext(null);

const mykey = import.meta.env.VITE_COMIC_VINE_API_KEY;

async function fetchVolumes(extraParams = "") {
  const apiUrl = `https://comicvine.gamespot.com/api/volumes/?api_key=${mykey}&format=json&field_list=id,name,image,publisher,description${extraParams}`;
  const response = await fetch(`https://corsproxy.io/?${encodeURIComponent(apiUrl)}`);
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

  // Fetch all sections once on mount
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

  // Search — fires when searchTerm changes
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

    const debounce = setTimeout(search, 400); // avoid firing on every keystroke
    return () => clearTimeout(debounce);
  }, [searchTerm]);

  return (
    <ComicsContext.Provider
      value={{
        marvel,
        dc,
        recent,
        iconic,
        loading,
        searchResults,
        searchTerm,
        setSearchTerm,
      }}
    >
      {children}
    </ComicsContext.Provider>
  );
}

export const useComics = () => useContext(ComicsContext);
