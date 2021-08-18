import "./Navigation.css";
import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

function Navigation() {
  const [isBurgerMenuOpen, setBurgerMenuOpen] = useState(false);

  const { pathname } = useLocation();

  const pathnameList = ["/profile", "/movies", "/saved-movies"];

  return (
    <>
      {pathname === "/" && (
        <nav className="navigation">
          <Link className="navigation__link-signup" to="/signup">
            Регистрация
          </Link>
          <Link className="navigation__link-signin" to="/signin">
            <button className="navigation__signin-button" type="button">
              Войти
            </button>
          </Link>
        </nav>
      )}
      {pathnameList.some((i) => i === pathname) && (
        <>
          <nav className="navigation navigation_hidden">
            <NavLink
              className="navigation__link-film"
              activeClassName="navigation__link-film_active"
              to="/movies"
            >
              Фильмы
            </NavLink>
            <NavLink
              className="navigation__link-film"
              activeClassName="navigation__link-film_active"
              to="/saved-movies"
            >
              Сохранённые фильмы
            </NavLink>
            <Link
              className="navigation__link-profile link-profile"
              to="/profile"
              onClick={() => setBurgerMenuOpen(false)}
            >
              <div className="profile-logo" />
              Аккаунт
            </Link>
          </nav>
          <button
            className="burger-button"
            type="button"
            onClick={() => setBurgerMenuOpen(true)}
          />
          <nav
            className={`burger-navigation ${
              isBurgerMenuOpen && "burger-navigation_visible"
            }`}
          >
            <ul className="burger-navigation-list">
              <li className="burger-navigation-item">
                <NavLink
                  exact
                  to="/"
                  className="burger-navigation-link"
                  activeClassName="burger-navigation-link_active"
                >
                  Главная
                </NavLink>
              </li>

              <li className="burger-navigation-item">
                <NavLink
                  to="/movies"
                  className="burger-navigation-link"
                  activeClassName="burger-navigation-link_active"
                  onClick={() => setBurgerMenuOpen(false)}
                >
                  Фильмы
                </NavLink>
              </li>

              <li className="burger-navigation-item">
                <NavLink
                  to="/saved-movies"
                  className="burger-navigation-link"
                  activeClassName="burger-navigation-link_active"
                  onClick={() => setBurgerMenuOpen(false)}
                >
                  Сохранённые фильмы
                </NavLink>
              </li>

              <li className="burger-navigation-item">
                <Link
                  className="link-profile"
                  to="/profile"
                  onClick={() => setBurgerMenuOpen(false)}
                >
                  <div className="profile-logo" />
                  Аккаунт
                </Link>
              </li>
            </ul>
            <button
              className="burger-button-close"
              type="button"
              onClick={() => setBurgerMenuOpen(false)}
            />
          </nav>
        </>
      )}
    </>
  );
}

export default Navigation;
