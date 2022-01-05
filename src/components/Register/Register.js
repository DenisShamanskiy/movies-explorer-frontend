import "./Register.css";
import React, { useState } from "react";
import SignForm from "../SignForm/SignForm";
import SignInput from "../UI/SignInput/SignInput";
import Preloader from "../Preloader/Preloader";
import { Link } from "react-router-dom";
import HeaderLogo from "../../images/header_logo.svg";

function Register({ onRegister }) {
  const [isLoader, setIsLoader] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  function handleRegister(e) {
    e.preventDefault();
    setIsLoader(true);
    onRegister(name, email, password)
      .catch((err) => {
        console.log(err);
        setIsError(true);
      })
      .finally(() => setIsLoader(false));
  }

  return (
    <div className="register">
      <>
        <Link className="header__logo" to="/">
          <img src={HeaderLogo} alt="Логотип" />
        </Link>
        {isLoader ? (
          <Preloader />
        ) : (
          <SignForm
            title="Добро пожаловать!"
            submitBtnText="Зарегистрироваться"
            linkTo="/signin"
            text="Уже зарегистрированы?"
            textLink="Войти"
            handleSubmit={handleRegister}
            isError={isError}
            isDisabled={!isValid}
          >
            <SignInput
              id="signup-name"
              type="name"
              name="name"
              label="Имя"
              inputValue={name}
              setValue={setName}
              setError={setValidationErrors}
              minlength="2"
              maxlength="30"
              errors={validationErrors}
              setIsValid={setIsValid}
            />
            <SignInput
              id="signup-email"
              type="email"
              name="email"
              label="E-mail"
              inputValue={email}
              setValue={setEmail}
              setError={setValidationErrors}
              isRequired={true}
              errors={validationErrors}
              setIsValid={setIsValid}
            />
            <SignInput
              id="signup-password"
              type="password"
              name="password"
              label="Пароль"
              nputValue={password}
              setValue={setPassword}
              setError={setValidationErrors}
              isRequired={true}
              errors={validationErrors}
              setIsValid={setIsValid}
            />
          </SignForm>
        )}
      </>
    </div>
  );
}

export default Register;
