import React, { useState, useEffect } from "react";
import FilterCheckbox from "../UI/FilterCheckbox/FilterCheckbox";
import "./SearchForm.css";

function SearchForm({ search, movies, setFilteredMovies }) {
  const [error, setError] = useState("");
  const [width, setWidth] = useState(window.innerWidth);
  const [searchPhrase, setSearchPhrase] = useState("");

  const updateWidth = () => {
    setWidth(window.innerWidth);
  };

  function handleChange(e) {
    setSearchPhrase(e.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    if (!searchPhrase) {
      setError("Нужно ввести ключевое слово");
      setTimeout(() => {
        setError("");
      }, 2000);
    } else {
      search(searchPhrase);
      setSearchPhrase("");
    }
  }

  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  });

  const isMobile = width <= 768;

  return (
    <form className="search-form" noValidate onSubmit={handleSubmit}>
      <div className="search-form__search-input-wrapper">
        <input
          name="searchText"
          className="search-form__text-input"
          placeholder="Фильм"
          onChange={handleChange}
          value={searchPhrase}
        />
        {error && <span className="search-form__error">{error}</span>}
        <button className="search-form__button" type="submit">
          Найти
        </button>
      </div>
      {!isMobile ? (
        <div className="search-form__shorts-wrapper">
          <FilterCheckbox setFilteredMovies={setFilteredMovies} list={movies} />
          <p className="search-form__shorts-title">Короткометражки</p>
        </div>
      ) : (
        <div className="search-form__shorts-wrapper">
          <p className="search-form__shorts-title">Короткометражки</p>
          <FilterCheckbox setFilteredMovies={setFilteredMovies} list={movies} />
        </div>
      )}
    </form>
  );
}

export default SearchForm;
