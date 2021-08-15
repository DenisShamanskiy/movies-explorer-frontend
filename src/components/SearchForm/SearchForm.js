import React, { useState, useEffect } from "react";
import FilterCheckbox from "../My/FilterCheckbox/FilterCheckbox";
import "./SearchForm.css";

function SearchForm() {
  const [width, setWidth] = useState(window.innerWidth);

  const updateWidth = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  });

  const isMobile = width <= 768;

  return (
    <form className="search-form" noValidate>
      <div className="search-form__search-input-wrapper">
        <input
          name="searchText"
          className="search-form__text-input"
          type="text"
          placeholder="Фильм"
          required
          autoComplete="off"
        />
        <button className="search-form__button" type="submit">
          Найти
        </button>
      </div>

      {!isMobile ? (
        <div className="search-form__shorts-wrapper">
          <FilterCheckbox />
          <p className="search-form__shorts-title">Короткометражки</p>
        </div>
      ) : (
        <div className="search-form__shorts-wrapper">
          <p className="search-form__shorts-title">Короткометражки</p>
          <FilterCheckbox />
        </div>
      )}
    </form>
  );
}

export default SearchForm;
