import "./SavedMovies.css";
import React, { useState, useEffect } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Divider from "../UI/Divider/Divider";
import Preloader from "../Preloader/Preloader";
import mainApi from "../../utils/MainApi";

function SavedMovies() {
  const [isLoader, setIsLoader] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);
  const [findedMovies, setFindedMovies] = useState([]);
  const [filteredSavedMovies, setFilteredSavedMovies] = useState(
    JSON.parse(localStorage.getItem("savedMovies"))
  );
  const [resultSearchMessage, setResultSearchMessage] = useState("");

  useEffect(() => {
    mainApi.getSavedMovies().then((res) => {
      setSavedMovies(res);
    });
  }, []);

  useEffect(() => {
    setFindedMovies(savedMovies);
  }, [savedMovies]);

  function searchSavedMovies(phrase) {
    setIsLoader(true);
    setFindedMovies(
      savedMovies.filter((item) => {
        return item.nameRU.includes(phrase);
      })
    );
  }

  useEffect(() => {
    setIsLoader(false);
    localStorage.setItem("savedMovies", JSON.stringify(filteredSavedMovies));
  }, [filteredSavedMovies]);

  function handleDeleteMovie(movie) {
    setSavedMovies(savedMovies.filter((m) => m._id !== movie._id));
  }

  return (
    <div className="saved-movies">
      <SearchForm
        search={searchSavedMovies}
        movies={findedMovies}
        setFilteredMovies={setFilteredSavedMovies}
      />
      {isLoader ? (
        <Preloader />
      ) : (
        filteredSavedMovies && (
          <MoviesCardList
            movies={filteredSavedMovies || []}
            message={resultSearchMessage}
            setMessage={setResultSearchMessage}
            handleDeleteMovie={handleDeleteMovie}
          />
        )
      )}
      <Divider />
    </div>
  );
}

export default SavedMovies;
