import "./MoviesCard.css";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ButtonFilmAdd from "../UI/ButtonFilmAdd/ButtonFilmAdd";
import ButtonFilmDelete from "../UI/ButtonFilmDelete/ButtonFilmDelete";
import durationFormatter from "../../helpers/durationFormatter";
import mainApi from "../../utils/MainApi";

function MoviesCard({
  movie,
  mySavedMovies,
  savedMovies,
  setSavedMovies,
  handleRemove,
}) {
  const { nameRU, duration, trailer, image } = movie;
  const { pathname } = useLocation();
  const [savedID, setSavedID] = useState(movie._id || null);

  useEffect(() => {
    if (pathname === "/movies") {
      const myMovie = mySavedMovies.find((item) => {
        return item.movieId === movie.id;
      });
      if (myMovie) setSavedID(myMovie._id);
    }
    if (pathname === "/saved-movies") {
      setSavedID(movie._id);
    }
  }, [mySavedMovies]);

  useEffect(() => {
    if (pathname === "/movies") {
      const myMovie = mySavedMovies.find((item) => {
        return item.movieId === movie.id;
      });
      if (myMovie) setSavedID(myMovie._id);
    }
    if (pathname === "/saved-movies") {
      setSavedID(movie._id);
    }
  }, [movie]);

  function toggleLikeMovies() {
    if (!savedID) {
      mainApi
        .postMovie(movie)
        .then((res) => {
          setSavedID(res._id);
          setSavedMovies([res, ...mySavedMovies]);
        })
        .catch((err) => console.log(err));
    } else {
      mainApi.deleteMovie(savedID).then(() => {
        if (pathname === "/saved-movies") handleRemove(movie);
        if (pathname === "/movies") handlRemoveMyMovie();
        setSavedID(null);
      });
    }
  }

  function handlRemoveMyMovie() {
    setSavedMovies(mySavedMovies.filter((m) => m._id !== savedID));
  }

  return (
    <div className="movie-card">
      <div className="movie-card__header">
        <h4 className="movie-card__title">{nameRU}</h4>
        <p className="movie-card__duration">{durationFormatter(duration)}</p>
      </div>
      <a
        className="movie-card__link"
        href={trailer}
        target="_blank"
        rel="noreferrer"
      >
        <img
          className="movie-card__image"
          src={image}
          alt={`Фотография к фильму ${nameRU}`}
        />
      </a>
      {savedMovies ? (
        <ButtonFilmDelete onClick={toggleLikeMovies} />
      ) : (
        <ButtonFilmAdd isAdded={savedID} onClick={toggleLikeMovies} />
      )}
    </div>
  );
}

export default MoviesCard;
