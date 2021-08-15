import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import ButtonFilmLoadMore from "../My/ButtonFilmLoadMore/ButtonFilmLoadMore";
import "./MoviesCardList.css";

function MoviesCardList({ isSaved, films }) {
  return (
    <section className="movies-card-list">
      <ul className="movies-card-list__list">
        {films.map((item) => {
          return <MoviesCard key={item} num={item} isSaved={isSaved} />;
        })}
      </ul>
      <ButtonFilmLoadMore />
    </section>
  );
}

export default MoviesCardList;
