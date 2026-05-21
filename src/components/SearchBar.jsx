import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./modules/SearchBar.module.css";

const SearchBar = ({ value, onChange }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const searchRef = useRef(null);

  const apiKey = import.meta.env.VITE_COMIC_VINE_API_KEY;

  // Fecha dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  // Busca quadrinhos
  useEffect(() => {
    if (value.length < 2) {
      setSuggestions([]);
      setOpen(false);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);

      try {
        const url = `https://comicvine.gamespot.com/api/volumes/?api_key=${apiKey}&format=json&field_list=id,name,image,publisher&filter=name:${value}`;

        const response = await fetch(
          `https://corsproxy.io/?${encodeURIComponent(
            url
          )}`
        );

        const data = await response.json();

        // Apenas Marvel e DC
        const comics = data.results
          .filter(
            (item) =>
              item.publisher?.id === 31 ||
              item.publisher?.id === 10
          )
          .slice(0, 8)
          .map((item) => ({
            id: item.id,
            title: item.name,
            image:
              item.image?.small_url ||
              item.image?.thumb_url,
            publisher: item.publisher?.name,
          }));

        setSuggestions(comics);
        setOpen(comics.length > 0);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [value, apiKey]);

  // Seleciona item
  const handleSelect = (comic) => {
    navigate(`/quadrinho/${comic.id}`);
    setOpen(false);
  };

  return (
    <div
      className={styles.searchContainer}
      ref={searchRef}
    >
      <div className={styles.inputWrapper}>
        <input
          type="text"
          placeholder="Buscar Marvel ou DC..."
          value={value}
          onChange={onChange}
          className={styles.searchInput}
        />

        {loading && (
          <div className={styles.loadingSpinner}>
            <div className={styles.spinner}></div>
          </div>
        )}
      </div>

      {open && (
        <div className={styles.dropdown}>
          <ul className={styles.suggestionsList}>
            {suggestions.map((comic) => (
              <li
                key={comic.id}
                className={styles.suggestionItem}
                onClick={() =>
                  handleSelect(comic)
                }
              >
                <div
                  className={styles.suggestionImage}
                >
                  <img
                    src={comic.image}
                    alt={comic.title}
                  />
                </div>

                <div
                  className={styles.suggestionInfo}
                >
                  <div
                    className={
                      styles.suggestionTitle
                    }
                  >
                    {comic.title}
                  </div>

                  <div
                    className={
                      styles.suggestionPublisher
                    }
                  >
                    {comic.publisher}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
