import "./App.css";
import React, { useState } from "react";
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
import Preloader from "../Preloader/Preloader";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { SignContext } from "../../contexts/SignContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import ProtectedRouteAfterSign from "../ProtectedRouteAfterSign/ProtectedRouteAfterSign";
import mainApi from "../../utils/MainApi";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({ email: "", name: "" });
  /*const [loggedIn, setLoggedIn] = useState(
    Boolean(localStorage.getItem("token"))
  );*/

  const history = useHistory();

  /*useEffect(() => {
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
  }, []);*/

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

  function handleSignOut() {
    setLoggedIn(false);
    setCurrentUser({ email: "", name: "" });
    localStorage.setItem("token", "");
    history.push("/");
  }

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
                onSignOut={handleSignOut}
              />
              <ProtectedRoute path="/movies" component={Movies} />
              <ProtectedRoute path="/saved-movies" component={SavedMovies} />

              <Route path="/*">
                <PageNotFound />
              </Route>
            </Switch>
            <Route exact path={["/", "/movies", "/saved-movies"]}>
              <Footer />
            </Route>
            <Preloader />
          </div>
        </div>
      </CurrentUserContext.Provider>
    </SignContext.Provider>
  );
}

export default App;
