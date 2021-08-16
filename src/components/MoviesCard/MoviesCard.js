import React from "react";
import Film from "../../images/dune_image.jpg";
import ButtonFilmAdd from "../UI/ButtonFilmAdd/ButtonFilmAdd";
import ButtonFilmDelete from "../UI/ButtonFilmDelete/ButtonFilmDelete";
import "./MoviesCard.css";

function MoviesCard({ num }) {
  return (
    <div className="movie-card">
      <div className="movie-card__header">
        <h4 className="movie-card__title">Дюна</h4>
        <p className="movie-card__duration">155 минут</p>
      </div>
      <a
        className="movie-card__link"
        href="https://www.youtube.com/watch?v=Q6nepw3fskg"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          className="movie-card__image"
          src={Film}
          alt="В погоне за Бенкси"
        />
      </a>
      {num >= 3 && num <= 5 ? (
        <ButtonFilmDelete />
      ) : (
        <ButtonFilmAdd num={num} />
      )}
    </div>
  );
}

export default MoviesCard;
