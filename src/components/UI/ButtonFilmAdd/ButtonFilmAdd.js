import React from "react";
import "./ButtonFilmAdd.css";

function ButtonFilmAdd({ isAdded, onClick }) {
  return (
    <>
      {!isAdded ? (
        <button className="button-film-add " type="button" onClick={onClick}>
          Сохранить
        </button>
      ) : (
        <button
          className="button-film-add button-film-is-added"
          type="button"
          onClick={onClick}
        ></button>
      )}
    </>
  );
}

export default ButtonFilmAdd;
