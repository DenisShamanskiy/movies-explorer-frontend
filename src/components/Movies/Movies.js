import "./Movies.css";
import React, { useState, useEffect } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import { SHORT_MOVIE } from "../../utils/constants";

function Movies({
  savedMovies,
  mySavedMovies,
  searchMovies,
  movies,
  isLoader,
  loadingError,
  setLoadingError,
  loggedIn,
  setSavedMovies,
}) {
  const [filterIsOn, setFilterIsOn] = useState(false);

  const filterShortFilm = (moviesToFilter) =>
    moviesToFilter.filter((item) => item.duration < SHORT_MOVIE);

  const onFilterClick = () => {
    setFilterIsOn(!filterIsOn);
  };

  useEffect(() => {
    if (loggedIn) {
      setLoadingError("");
    }
  });

  return (
    <div className="movies">
      <SearchForm onFilterClick={onFilterClick} search={searchMovies} />
      {isLoader && <Preloader />}

      {!isLoader && loadingError === "" && (
        <MoviesCardList
          savedMovies={savedMovies}
          movies={filterIsOn ? filterShortFilm(movies) : movies}
          setSavedMovies={setSavedMovies}
          mySavedMovies={mySavedMovies}
        />
      )}

      {!isLoader && loadingError !== "" && (
        <div className="movies__error">{loadingError}</div>
      )}
    </div>
  );
}

export default Movies;
