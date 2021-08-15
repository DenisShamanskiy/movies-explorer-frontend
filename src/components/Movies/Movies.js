import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import "./Movies.css";

function Movies() {
  return (
    <div className="movies">
      <SearchForm />
      <MoviesCardList films={[...Array(12).keys()]} />
    </div>
  );
}

export default Movies;
