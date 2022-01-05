import "./SearchForm.css";
import React, { useState, useEffect } from "react";
import FilterCheckbox from "../UI/FilterCheckbox/FilterCheckbox";
import useFormWithValidation from "../../hooks/useFormWithValidation";
import { TABLET_WIDTH } from "../../utils/constants";

function SearchForm({ search, onFilterClick, isLoading }) {
  const formWithValidation = useFormWithValidation();
  const { searchText } = formWithValidation.values;
  const { handleChange, resetForm } = formWithValidation;
  const [error, setError] = useState("");

  const [width, setWidth] = useState(window.innerWidth);
  const updateWidth = () => {
    setWidth(window.innerWidth);
  };

  function handleSubmit(evt) {
    evt.preventDefault();
    if (!searchText) {
      console.log(searchText);
      setError("Нужно ввести ключевое слово");
      setTimeout(() => {
        setError("");
      }, 2000);
    } else {
      search(searchText);
      resetForm();
    }
  }

  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  });

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  const isMobile = width <= TABLET_WIDTH;

  return (
    <form className="search-form" noValidate onSubmit={handleSubmit}>
      <div className="search-form__search-input-wrapper">
        <input
          name="searchText"
          className="search-form__text-input"
          placeholder="Фильм"
          onChange={handleChange}
          value={searchText || ""}
          disabled={isLoading}
        />
        {error && <span className="search-form__error">{error}</span>}
        <button className="search-form__button" type="submit">
          Найти
        </button>
      </div>
      {!isMobile ? (
        <div className="search-form__shorts-wrapper">
          <FilterCheckbox onFilterClick={onFilterClick} />
          <p className="search-form__shorts-title">Короткометражки</p>
        </div>
      ) : (
        <div className="search-form__shorts-wrapper">
          <p className="search-form__shorts-title">Короткометражки</p>
          <FilterCheckbox onFilterClick={onFilterClick} />
        </div>
      )}
    </form>
  );
}

export default SearchForm;
