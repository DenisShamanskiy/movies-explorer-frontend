import "./Movies.css";
import React, { useEffect, useState } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Divider from "../UI/Divider/Divider";
import Preloader from "../Preloader/Preloader";
import { getMovies } from "../../utils/MoviesApi";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [allMovies, setAllMovies] = useState([]);
  const [isLoader, setIsLoader] = useState(false);
  const [resultSearchMessage, setResultSearchMessage] = useState("");
  const [filteredMovies, setFilteredMovies] = useState(
    JSON.parse(localStorage.getItem("movies"))
  );

  const searchFilter = (data, searchText) => {
    if (searchText) {
      const searchMoviesArr = data.filter((item) => {
        return item.nameRU.includes(searchText);
      });
      if (searchMoviesArr.length === 0) {
        setResultSearchMessage("Ничего не найдено");
      } else {
        setResultSearchMessage("");
      }
      return searchMoviesArr;
    }
    return [];
  };

  const searchMovies = (searchText) => {
    setIsLoader(true);
    setTimeout(() => {
      setMovies(searchFilter(allMovies, searchText));
      setIsLoader(false);
    }, 600);
  };

  useEffect(() => {
    getMovies()
      .then((res) => setAllMovies(res))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    setIsLoader(false);
    localStorage.setItem("movies", JSON.stringify(filteredMovies));
  }, [filteredMovies]);

  return (
    <div className="movies">
      <SearchForm
        search={searchMovies}
        setFilteredMovies={setFilteredMovies}
        movies={movies}
      />
      {isLoader ? (
        <Preloader />
      ) : (
        filteredMovies && (
          <MoviesCardList
            movies={filteredMovies || []}
            message={resultSearchMessage}
            setMessage={setResultSearchMessage}
          />
        )
      )}
      <Divider />
    </div>
  );
}

export default Movies;
