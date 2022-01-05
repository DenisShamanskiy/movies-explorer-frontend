import "./MoviesCardList.css";
import React, { useEffect, useState } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import ButtonFilmLoadMore from "../UI/ButtonFilmLoadMore/ButtonFilmLoadMore";
import {
  DESKTOP_WIDTH,
  TABLET_WIDTH,
  MOBILE_WIDTH,
} from "../../utils/constants";

function MoviesCardList({
  movies,
  mySavedMovies,
  savedMovies,
  message,
  handleRemove,
  setSavedMovies,
}) {
  const [currentCount, setCurrentCount] = useState(0);
  const [extraRow, setExtraRow] = useState(3);
  const [moviesToRender, setMoviesToRender] = useState([]);

  const getCount = (windowSize) => {
    if (windowSize > DESKTOP_WIDTH) {
      return { first: 12, extra: 3 };
    }
    if (windowSize > TABLET_WIDTH && windowSize <= DESKTOP_WIDTH) {
      return { first: 8, extra: 2 };
    }
    if (windowSize >= MOBILE_WIDTH && windowSize <= TABLET_WIDTH) {
      return { first: 6, extra: 2 };
    }
    return { first: 5, extra: 1 };
  };

  const renderExtraRow = () => {
    const count = Math.min(movies.length, currentCount + extraRow);
    const extraMovies = movies.slice(currentCount, count);
    setMoviesToRender([...moviesToRender, ...extraMovies]);
    setCurrentCount(count);
  };

  const resize = () => {
    const windowSize = window.innerWidth;
    setExtraRow(getCount(windowSize));
  };

  useEffect(() => {
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  useEffect(() => {
    const windowSize = window.innerWidth;
    setExtraRow(getCount(windowSize).extra);
    const count = Math.min(movies.length, getCount(windowSize).first);
    setMoviesToRender(movies.slice(0, count));
    setCurrentCount(count);
  }, [movies]);

  const renderMore = () => renderExtraRow();

  return (
    <>
      {movies.length ? (
        <section className="movies-card-list">
          <ul className="movies-card-list__list">
            {moviesToRender.map((movieData) => (
              <li className="movies-card-list__item" key={movieData.id}>
                <MoviesCard
                  movie={movieData}
                  handleRemove={handleRemove}
                  savedMovies={savedMovies}
                  setSavedMovies={setSavedMovies}
                  mySavedMovies={mySavedMovies}
                />
              </li>
            ))}
          </ul>
          {currentCount < movies.length && (
            <ButtonFilmLoadMore onClick={renderMore} />
          )}
        </section>
      ) : (
        <p>{message}</p>
      )}
    </>
  );
}

export default MoviesCardList;
