import React from "react";
import "./Portfolio.css";

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__list">
        <li className="portfolio__list-item">
          <a
            href="https://github.com/"
            className="portfolio__link"
            target="_blank"
            rel="noreferrer"
          >
            Статичный сайт
            <span className="portfolio__links-arrow">&#8599;</span>
          </a>
        </li>

        <li className="portfolio__list-item">
          <a
            href="https://github.com/"
            className="portfolio__link"
            target="_blank"
            rel="noreferrer"
          >
            Адаптивный сайт
            <span className="portfolio__links-arrow">&#8599;</span>
          </a>
        </li>

        <li className="portfolio__list-item">
          <a
            href="https://github.com/"
            className="portfolio__link"
            target="_blank"
            rel="noreferrer"
          >
            Одностраничное приложение
            <span className="portfolio__links-arrow">&#8599;</span>
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
