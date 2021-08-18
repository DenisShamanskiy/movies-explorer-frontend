import "./App.css";
import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
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
import EditProfilePopup from "../EditProfilePopup/EditProfilePopup";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
  }

  return (
    <div className="App">
      <div className="page-container">
        <Route exact path={["/", "/movies", "/saved-movies", "/profile"]}>
          <Header />
        </Route>

        <Switch>
          <Route exact path="/">
            <Main />
          </Route>
          <Route exact path="/signup">
            <Register />
          </Route>
          <Route exact path="/signin">
            <Login />
          </Route>
          <Route exact path="/profile">
            <Profile editProfile={handleEditProfileClick} />
          </Route>
          <Route exact path="/movies">
            <Movies />
          </Route>
          <Route exact path="/saved-movies">
            <SavedMovies />
          </Route>

          <Route path="/*">
            <PageNotFound />
          </Route>
        </Switch>
        <Route exact path={["/", "/movies", "/saved-movies"]}>
          <Footer />
        </Route>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
        />
        <Preloader />
      </div>
    </div>
  );
}

export default App;
