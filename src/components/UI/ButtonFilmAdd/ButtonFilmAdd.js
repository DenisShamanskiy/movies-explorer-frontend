import React from "react";
import "./ButtonFilmAdd.css";

function ButtonFilmAdd({ num }) {
  return (
    <>
      {num >= 0 && num <= 2 ? (
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
