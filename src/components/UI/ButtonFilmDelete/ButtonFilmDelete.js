import React from "react";
import "./ButtonFilmDelete.css";

function ButtonFilmDelete({ onClick }) {
  return <button className="button-delete" type="button" onClick={onClick} />;
}

export default ButtonFilmDelete;
