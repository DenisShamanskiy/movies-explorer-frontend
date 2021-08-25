import "./MoviesCard.css";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ButtonFilmAdd from "../UI/ButtonFilmAdd/ButtonFilmAdd";
import ButtonFilmDelete from "../UI/ButtonFilmDelete/ButtonFilmDelete";
import durationFormatter from "../../helpers/durationFormatter";
import mainApi from "../../utils/MainApi";
import { urlMovieImage } from "../../utils/constants";

function MoviesCard({ movie, myMovies, setMyMovies, handleDeleteMovie }) {
  const { pathname } = useLocation();
  const { nameRU, duration, trailerLink, image } = movie;
  const [savedID, setSavedID] = useState(movie._id || null);

  useEffect(() => {
    if (pathname === "/movies") {
      const myMovie = myMovies.find((item) => {
        return item.movieId === movie.id;
      });
      if (myMovie) setSavedID(myMovie._id);
    }
    if (pathname === "/saved-movies") {
      setSavedID(movie._id);
    }
  }, [myMovies]);

  useEffect(() => {
    if (pathname === "/movies") {
      const myMovie = myMovies.find((item) => {
        return item.movieId === movie.id;
      });
      if (myMovie) setSavedID(myMovie._id);
    }
    if (pathname === "/saved-movies") {
      setSavedID(movie._id);
    }
  }, [movie]);

  function saveMovies() {
    if (!savedID) {
      mainApi
        .postMovie(movie)
        .then((res) => {
          setSavedID(res._id);
          setMyMovies([res, ...myMovies]);
        })
        .catch((err) => console.log(err));
    } else {
      mainApi.deleteMovie(savedID).then(() => {
        if (pathname === "/saved-movies") handleDeleteMovie(movie);
        if (pathname === "/movies") handleDeleteMyMovie();
        setSavedID(null);
      });
    }
  }

  function handleDeleteMyMovie() {
    setMyMovies(myMovies.filter((movie) => movie._id !== savedID));
  }

  return (
    <>
      {pathname === "/saved-movies" && !savedID ? (
        ""
      ) : (
        <div className="movie-card">
          <div className="movie-card__header">
            <h4 className="movie-card__title">{nameRU}</h4>
            <p className="movie-card__duration">
              {durationFormatter(duration)}
            </p>
          </div>
          <a
            className="movie-card__link"
            href={trailerLink}
            target="_blank"
            rel="noreferrer"
          >
            <img
              className="movie-card__image"
              src={
                pathname === "/movies" ? `${urlMovieImage}${image.url}` : image
              }
              alt={`Фотография к фильму ${nameRU}`}
            />
          </a>

          {pathname === "/movies" && (
            <ButtonFilmAdd onClick={saveMovies} savedID={savedID} />
          )}

          {pathname === "/saved-movies" && (
            <ButtonFilmDelete onClick={saveMovies} />
          )}
        </div>
      )}
    </>
  );
}

export default MoviesCard;
