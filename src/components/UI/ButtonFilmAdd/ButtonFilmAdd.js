import React from "react";
import "./ButtonFilmAdd.css";

function ButtonFilmAdd({ savedID, onClick }) {
  return (
    <>
      {!savedID ? (
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
