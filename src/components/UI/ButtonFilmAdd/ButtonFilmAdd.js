import React from "react";
import "./ButtonFilmAdd.css";

function ButtonFilmAdd() {
  const isAdded = false;
  return (
    <>
      {!isAdded ? (
        <button className="button-film-add " type="button">
          Сохранить
        </button>
      ) : (
        <button
          className="button-film-add button-film-is-added"
          type="button"
        ></button>
      )}
    </>
  );
}

export default ButtonFilmAdd;
