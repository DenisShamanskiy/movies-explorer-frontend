import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Divider from "../UI/Divider/Divider";
import "./SavedMovies.css";

function SavedMovies() {
  return (
    <div className="saved-movies">
      <SearchForm />
      <MoviesCardList films={[...Array(11).keys()]} />
      <Divider />
    </div>
  );
}

export default SavedMovies;
