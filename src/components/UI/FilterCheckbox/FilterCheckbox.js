import "./FilterCheckbox.css";
import React, { useState, useEffect } from "react";
import { shortMovie } from "../../../utils/constants";

function FilterCheckbox({ list, setFilteredMovies, checkboxLocalStorageName }) {
  const [isFilterOn, setFilter] = useState(
    JSON.parse(localStorage.getItem(`${checkboxLocalStorageName}`))
  );

  function applyFilter(list) {
    setFilteredMovies(
      list.filter((item) => {
        return item.duration <= shortMovie;
      })
    );
  }

  function cancelFilter(list) {
    setFilteredMovies(list);
  }

  useEffect(() => {
    if (list) {
      isFilterOn ? applyFilter(list) : cancelFilter(list);
    }
  }, [list]);

  useEffect(() => {
    if (list) {
      isFilterOn ? applyFilter(list) : cancelFilter(list);
    }
    localStorage.setItem(
      `${checkboxLocalStorageName}`,
      JSON.stringify(isFilterOn)
    );
  }, [isFilterOn]);

  return (
    <div className="filter-checkbox">
      <input
        className="filter-checkbox__switcher"
        id="film"
        type="checkbox"
        checked={isFilterOn}
        onChange={() => setFilter(!isFilterOn)}
      />
    </div>
  );
}

export default FilterCheckbox;
