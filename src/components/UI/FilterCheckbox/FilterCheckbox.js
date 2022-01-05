import "./FilterCheckbox.css";
import React from "react";

function FilterCheckbox({ onFilterClick }) {
  return (
    <div className="filter-checkbox">
      <input
        className="filter-checkbox__switcher"
        id="film"
        type="checkbox"
        onClick={onFilterClick}
      />
    </div>
  );
}

export default FilterCheckbox;
