import "./SavedMovies.css";
import React, { useState, useEffect } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Divider from "../UI/Divider/Divider";
import Preloader from "../Preloader/Preloader";
import { EMPTY_SEARCH_MESSAGE } from "../../utils/constants";

function SavedMovies({
  savedMovies,
  mySavedMovies,
  movies,
  isLoader,
  loadingError,
  setLoadingError,
  setIsLoader,
  loggedIn,
  getSavedMovies,
  setSavedMovies,
}) {
  const [filterIsOn, setFilterIsOn] = useState(false);

  const filterShortFilm = (moviesToFilter) =>
    moviesToFilter.filter((item) => item.duration < 40);
  const onFilterClick = () => {
    setFilterIsOn(!filterIsOn);
  };

  const [moviesToRender, setMoviesToRender] = useState([]);

  useEffect(() => {
    setMoviesToRender(movies);
  }, [movies]);

  const searchFilter = (data, searchText) => {
    if (searchText) {
      const searchMoviesArr = data.filter((item) => {
        return item.nameRU.includes(searchText);
      });
      if (searchMoviesArr.length === 0) {
        setLoadingError(EMPTY_SEARCH_MESSAGE);
      } else {
        setLoadingError("");
      }
      return searchMoviesArr;
    }
    return [];
  };

  const searchInSavedHandler = (searchText) => {
    setIsLoader(true);
    setTimeout(() => {
      setMoviesToRender(searchFilter(movies, searchText));
      setIsLoader(false);
    }, 600);
  };

  const handleRemove = (movie) => {
    setSavedMovies(mySavedMovies.filter((m) => m._id !== movie._id));
  };

  useEffect(() => {
    if (loggedIn) {
      getSavedMovies();
    }
  }, [loggedIn]);

  return (
    <div className="saved-movies">
      <SearchForm search={searchInSavedHandler} onFilterClick={onFilterClick} />
      {isLoader && <Preloader />}

      {!isLoader && loadingError === "" && (
        <MoviesCardList
          savedMovies={savedMovies}
          mySavedMovies={mySavedMovies}
          movies={filterIsOn ? filterShortFilm(moviesToRender) : moviesToRender}
          message={loadingError}
          handleRemove={handleRemove}
        />
      )}

      {!isLoader && loadingError !== "" && (
        <div className="movies__error">{loadingError}</div>
      )}
      <Divider />
    </div>
  );
}

export default SavedMovies;
