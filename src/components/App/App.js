import "./App.css";
import React, { useState, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import Main from "../Main/Main";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Profile from "../Profile/Profile";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import PageNotFound from "../PageNotFound/PageNotFound";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { SignContext } from "../../contexts/SignContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import ProtectedRouteAfterSign from "../ProtectedRouteAfterSign/ProtectedRouteAfterSign";
import mainApi from "../../utils/MainApi";
import { getMovies } from "../../utils/MoviesApi";
import {
  ERROR_LOAD_MESSAGE,
  EMPTY_SEARCH_MESSAGE,
} from "../../utils/constants";

function App() {
  const history = useHistory();
  const [currentUser, setCurrentUser] = useState({});
  const [editIsSuccess, setEditIsSuccess] = useState(false);
  const [editIsFailed, setEditIsFailed] = useState(false);
  const [allMovies, setAllMovies] = useState([]);
  const [loadingError, setLoadingError] = useState("");
  const [filterMovies, setFilterMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [isLoader, setIsLoader] = useState(false);
  const [loggedIn, setLoggedIn] = useState(
    Boolean(localStorage.getItem("token"))
  );

  useEffect(() => {
    if (localStorage.getItem("token")) {
      mainApi
        .getMe()
        .then((res) => {
          setLoggedIn(true);
          setCurrentUser({ email: res.email, name: res.name });
        })
        .catch((err) => {
          console.log(err);
          setLoggedIn(false);
          localStorage.setItem("token", "");
        });
    }
  }, []);

  function login(email, password) {
    return mainApi.login(email, password).then((res) => {
      localStorage.setItem("token", res.token);
      mainApi.getMe().then((res) => {
        setLoggedIn(true);
        setCurrentUser({ email: res.email, name: res.name });
        history.push("/movies");
      });
    });
  }

  function register(name, email, password) {
    return mainApi.register(name, email, password).then(() => {
      return login(email, password);
    });
  }

  const updateUser = (updateUserData) => {
    const { name, email } = updateUserData;
    mainApi
      .updateUser(name, email)
      .then((res) => {
        setCurrentUser({ email: res.email, name: res.name });
        setEditIsSuccess(true);
        setEditIsFailed(false);
        setTimeout(() => {
          setEditIsSuccess(false);
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        setEditIsFailed(true);
        setTimeout(() => {
          setEditIsFailed(false);
        }, 3000);
      });
  };

  function handleSignOut() {
    setLoggedIn(false);
    setCurrentUser({});
    localStorage.removeItem("token");
    localStorage.removeItem("allMovies");
    localStorage.removeItem("savedMovies");
    history.push("/");
  }

  const getAllMoviesData = () => {
    getMovies()
      .then((data) => {
        const allMoviesData = data.map((item) => {
          const imageURL = item.image ? item.image.url : "";
          return {
            ...item,
            image: `https://api.nomoreparties.co${imageURL}`,
            trailer: item.trailerLink,
          };
        });

        localStorage.setItem("allMovies", JSON.stringify(allMoviesData));
        setAllMovies(allMoviesData);
      })
      .catch(() => {
        localStorage.removeItem("allMovies");
        setLoadingError(ERROR_LOAD_MESSAGE);
      });
  };

  const getSavedMovies = () => {
    mainApi
      .getSavedMovies()
      .then((data) => {
        const savedArray = data.map((item) => ({ ...item, id: item.movieId }));
        localStorage.setItem("savedMovies", JSON.stringify(savedArray));
        setSavedMovies(savedArray);
      })
      .catch(() => {
        localStorage.removeItem("savedMovies");
        setLoadingError(ERROR_LOAD_MESSAGE);
      });
  };

  useEffect(() => {
    const allMoviesLocal = JSON.parse(localStorage.getItem("allMovies"));
    if (loggedIn && allMoviesLocal) {
      setAllMovies(allMoviesLocal);
    } else {
      getAllMoviesData();
    }
    const allSavedMoviesLocal = JSON.parse(localStorage.getItem("savedMovies"));
    if (allSavedMoviesLocal) {
      setSavedMovies(allSavedMoviesLocal);
    } else {
      getSavedMovies();
    }
  }, [loggedIn]);

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

  const searchMovies = (searchText) => {
    setIsLoader(true);
    setTimeout(() => {
      setFilterMovies(searchFilter(allMovies, searchText));
      setIsLoader(false);
    }, 600);
  };
  return (
    <SignContext.Provider value={{ loggedIn, setLoggedIn }}>
      <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
        <div className="App">
          <div className="page-container">
            <Route exact path={["/", "/movies", "/saved-movies", "/profile"]}>
              <Header />
            </Route>

            <Switch>
              <Route exact path="/">
                <Main />
              </Route>
              <ProtectedRouteAfterSign
                path="/signup"
                component={Register}
                onRegister={register}
              />
              <ProtectedRouteAfterSign
                path="/signin"
                component={Login}
                onLogin={login}
              />
              <ProtectedRoute
                path="/profile"
                component={Profile}
                currentUser={currentUser}
                editIsSuccess={editIsSuccess}
                editIsFailed={editIsFailed}
                onUpdateUser={updateUser}
                onSignOut={handleSignOut}
              />
              <ProtectedRoute
                path="/movies"
                component={Movies}
                loggedIn={loggedIn}
                isLoader={isLoader}
                loadingError={loadingError}
                savedMovies={false}
                movies={filterMovies}
                searchMovies={searchMovies}
                setLoadingError={setLoadingError}
                mySavedMovies={savedMovies}
                setSavedMovies={setSavedMovies}
              />
              <ProtectedRoute
                path="/saved-movies"
                component={SavedMovies}
                loggedIn={loggedIn}
                isLoader={isLoader}
                setIsLoader={setIsLoader}
                loadingError={loadingError}
                savedMovies
                movies={savedMovies}
                setLoadingError={setLoadingError}
                getSavedMovies={getSavedMovies}
                setSavedMovies={setSavedMovies}
                mySavedMovies={savedMovies}
              />

              <Route path="/*">
                <PageNotFound />
              </Route>
            </Switch>
            <Route exact path={["/", "/movies", "/saved-movies"]}>
              <Footer />
            </Route>
          </div>
        </div>
      </CurrentUserContext.Provider>
    </SignContext.Provider>
  );
}

export default App;
