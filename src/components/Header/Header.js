import "./Header.css";
import React from "react";
import HeaderLogoLink from "../UI/HeaderLogoLink/HeaderLogoLink";
import Navigation from "../Navigation/Navigation";

function Header() {
  const isLoggedIn = false;

  return (
    <header className={`header ${isLoggedIn && "header_loggedIn"}`}>
      <HeaderLogoLink />
      <Navigation />
    </header>
  );
}

export default Header;
