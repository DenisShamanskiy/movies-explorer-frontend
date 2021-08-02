import "./Header.css";
import { Link } from "react-router-dom";
import React from "react";
import HeaderLogo from "../../images/header_logo.svg";
import Navigation from "../Navigation/Navigation";

function Header() {
  return (
    <header className="header header_place_about-project">
      <Link to="/">
        <img className="header__logo" src={HeaderLogo} alt="Lоготип" />
      </Link>
      <Navigation />
    </header>
  );
}

export default Header;
