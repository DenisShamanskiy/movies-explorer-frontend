import "./Navigation.css";
import React from "react";
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <>
      <nav className="navigation">
        <Link />
        <Link className="navigation__link-signup" to="/signup">
          Регистрация
        </Link>
        <Link className="navigation__link-signin" to="/signin">
          <button className="navigation__signin-btn" type="button">
            Войти
          </button>
        </Link>
      </nav>
    </>
  );
}

export default Navigation;
