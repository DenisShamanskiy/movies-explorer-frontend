import React from "react";
import "./Techs.css";

function Techs() {
  return (
    <section className="techs" id="techs">
      <h2 className="techs__title">Технологии</h2>
      <h3 className="techs__tech-list-title">7 технологий</h3>
      <p className="techs__tech-list-subtitle">
        На курсе веб-разработки мы освоили технологии, которые применили в
        дипломном проекте.
      </p>
      <ul className="techs__tech-list">
        <li className="techs__tech-list-item">HTML</li>
        <li className="techs__tech-list-item">CSS</li>
        <li className="techs__tech-list-item">JS</li>
        <li className="techs__tech-list-item">React</li>
        <li className="techs__tech-list-item">Git</li>
        <li className="techs__tech-list-item">Express.js</li>
        <li className="techs__tech-list-item">mongoDB</li>
      </ul>
    </section>
  );
}

export default Techs;
