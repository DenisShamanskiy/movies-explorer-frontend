import React from "react";
import "./ButtonFilmLoadMore.css";

function ButtonFilmLoadMore({ onClick }) {
  return (
    <div className="load-more">
      <button className="load-more-button" type="button" onClick={onClick}>
        Ещё
      </button>
    </div>
  );
}

export default ButtonFilmLoadMore;
