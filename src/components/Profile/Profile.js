import "./Profile.css";
import React, { useState, useContext, useEffect } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Preloader from "../Preloader/Preloader";
import {
  messageUpdateProfileFale,
  messageUpdateProfileOk,
} from "../../utils/constants";

function Profile({ onSignOut, onUpdateUser }) {
  const userContext = useContext(CurrentUserContext);
  const { currentUser } = userContext;

  const [isLoader, setIsLoader] = useState(false);

  const [nameInputValue, setNameInputValue] = useState(currentUser.name);
  const [emailInputValue, setEmailInputValue] = useState(currentUser.email);

  const [isDisableChange, setIsDisableChange] = useState(true);
  const [profileMessage, setProfileMessage] = useState("");

  useEffect(() => {
    setNameInputValue(currentUser.name);
    setEmailInputValue(currentUser.email);
    setIsDisableChange(true);
  }, [currentUser]);

  function handleChangeName(e) {
    setNameInputValue(e.target.value);
  }

  function handleChangeEmail(e) {
    setEmailInputValue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoader(true);
    onUpdateUser(nameInputValue, emailInputValue)
      .then(() => setProfileMessage(messageUpdateProfileOk))
      .catch((err) => {
        setNameInputValue(currentUser.name);
        setEmailInputValue(currentUser.email);
        setIsDisableChange(true);
        setProfileMessage(messageUpdateProfileFale);
        console.log(err);
      })
      .finally(() => setIsLoader(false));
  }

  useEffect(() => {
    setProfileMessage("");
    if (
      nameInputValue === currentUser.name &&
      emailInputValue === currentUser.email
    ) {
      setIsDisableChange(true);
    } else {
      setIsDisableChange(false);
    }
  }, [nameInputValue, emailInputValue, currentUser.name, currentUser.email]);

  return (
    <>
      {isLoader ? (
        <Preloader />
      ) : (
        <form className="profile" onSubmit={handleSubmit}>
          <h2 className="profile__title">Привет, {currentUser.name}!</h2>
          <ul className="profile__info">
            <li className="profile__item">
              <p className="profile__item-name">Имя</p>
              <input
                type="text"
                name="user-name"
                className="profile__input"
                value={nameInputValue}
                onChange={handleChangeName}
              />
            </li>
            <li className="profile__item">
              <p className="profile__item-name">E-mail</p>
              <input
                type="text"
                name="user-email"
                className="profile__input"
                value={emailInputValue}
                onChange={handleChangeEmail}
              />
            </li>
          </ul>
          <p className="profile__message" id="blink">
            {profileMessage}
          </p>

          <button
            type="submit"
            className="profile__button"
            disabled={isDisableChange}
          >
            Редактировать
          </button>
          <button
            type="button"
            className="profile__button_logout"
            onClick={onSignOut}
          >
            Выйти из аккаунта
          </button>
        </form>
      )}
    </>
  );
}

export default Profile;
