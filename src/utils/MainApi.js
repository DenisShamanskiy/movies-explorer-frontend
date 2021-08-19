import { urlBackend } from "./constants";

class MainApi {
  constructor(urlBackend) {
    this._urlBackend = urlBackend;
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

  changeInfoProfile(name, email) {
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
}
const mainApi = new MainApi(urlBackend);

export default mainApi;
