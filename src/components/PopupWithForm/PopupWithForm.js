import "./PopupWithForm.css";
import React from "react";

function PopupWithForm({
  title,
  name,
  buttonSubmitText,
  children,
  isOpen,
  onClose,
  onSubmit,
}) {
  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container popup__container_form">
        <h2 className="popup__title">{title}</h2>
        <button
          type="button"
          aria-label="Закрыть"
          className="popup__button-close"
          onClick={onClose}
        ></button>
        <form
          className="popup__form"
          name={name}
          onSubmit={onSubmit}
          noValidate
        >
          {children}
          <button type="submit" className="popup__form_button-submit">
            {buttonSubmitText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;