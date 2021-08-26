import { urlBackend, urlMovieImage } from "./constants";

class MainApi {
  constructor(urlBackend, moviesUrlImage) {
    this._urlBackend = urlBackend;
    this._moviesUrlImage = moviesUrlImage;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  register = (name, email, password) => {
    return fetch(`${this._urlBackend}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        password: password,
        email: email,
      }),
    }).then(this._checkResponse);
  };

  login = (email, password) => {
    return fetch(`${this._urlBackend}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: password,
        email: email,
      }),
    }).then(this._checkResponse);
  };

  getMe() {
    return fetch(`${this._urlBackend}/users/me`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then(this._checkResponse);
  }

  updateUser(name, email) {
    return fetch(`${this._urlBackend}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
      }),
    }).then(this._checkResponse);
  }

  getSavedMovies() {
    return fetch(`${this._urlBackend}/movies`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-type": "application/json",
        Accept: "application/json",
      },
    }).then(this._checkResponse);
  }

  postMovie({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    id,
    nameRU,
    nameEN,
  }) {
    return fetch(`${this._urlBackend}/movies`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        country: country || "unknown",
        director: director || "unknown",
        duration: duration || "No data",
        year: year || "unknown",
        description: description || "No description",
        image: `${this._moviesUrlImage}${image.url}`,
        trailer: trailerLink || "No trailer",
        thumbnail:
          `${this._moviesUrlImage}${image.formats.thumbnail.url}` || "No image",
        movieId: id || "No data",
        nameRU: nameRU || "No name",
        nameEN: nameEN || "No name",
      }),
    }).then(this._checkResponse);
  }

  deleteMovie(movieID) {
    return fetch(`${this._urlBackend}/movies/${movieID}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then(this._checkResponse);
  }
  addBookmark(data) {
    return fetch(`${this._urlBackend}/movies`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        country: data.country || "unknown",
        director: data.director || "unknown",
        duration: data.duration || "No data",
        year: data.year || "unknown",
        description: data.description || "No description",
        image: data.image,
        trailer: data.trailerLink || "No trailer",
        thumbnail: data.image || "No image",
        movieId: data.id || "No data",
        nameRU: data.nameRU,
        nameEN: data.nameEN || "No name",
      }),
    }).then(this._checkResponse);
  }
  removeBookmark(movieId) {
    return fetch(`${this._urlBackend}/movies/${movieId}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then(this._checkResponse);
  }
}
const mainApi = new MainApi(urlBackend, urlMovieImage);

export default mainApi;
