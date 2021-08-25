import "./MoviesCardList.css";
import React, { useEffect, useState } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import ButtonFilmLoadMore from "../UI/ButtonFilmLoadMore/ButtonFilmLoadMore";
import mainApi from "../../utils/MainApi";

function MoviesCardList({ movies, handleDeleteMovie, message, setMessage }) {
  const [count, setCount] = useState([0, 0]);
  const [myMovies, setMyMovies] = useState([]);
  const [currentElementNumber, setCurrentElementNumber] = useState(0);
  const [windowSize, setWindowSize] = useState(
    document.documentElement.clientWidth
  );

  window.addEventListener("resize", resizeHandler);

  function resizeHandler() {
    setWindowSize(document.documentElement.clientWidth);
  }

  useEffect(() => {
    if (windowSize >= 990) setCount([3, 3]);
    if (windowSize >= 630 && windowSize < 990) setCount([2, 4]);
    if (windowSize < 630) setCount([5, 1]);
  }, [windowSize]);

  useEffect(() => {
    //if (!movies.length) setMessage("Ничего не найдено");
    setCurrentElementNumber(count[0] * count[1]);
  }, [movies]);

  useEffect(() => {
    setCurrentElementNumber(count[0] * count[1]);
  }, [count]);

  function handlePushElements() {
    setCurrentElementNumber(currentElementNumber + count[0]);
  }

  useEffect(() => {
    mainApi.getSavedMovies().then((res) => {
      setMyMovies(res);
    });
  }, []);

  return (
    <>
      {movies.length ? (
        <section className="movies-card-list">
          <ul className="movies-card-list__list">
            {movies.map((item, index) => {
              if (index < Math.max(currentElementNumber, count[0] * count[1])) {
                return (
                  <MoviesCard
                    key={item.id || item._id}
                    movie={item}
                    myMovies={myMovies}
                    setMyMovies={setMyMovies}
                    handleDeleteMovie={handleDeleteMovie}
                  />
                );
              }
            })}
          </ul>
          {movies[currentElementNumber] && (
            <ButtonFilmLoadMore onClick={handlePushElements} />
          )}
        </section>
      ) : (
        <p className="search__message">{message}</p>
      )}
    </>
  );
}

export default MoviesCardList;
