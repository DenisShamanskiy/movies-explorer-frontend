import React from "react";
import "./EditProfilePopup.css";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

function EditProfilePopup({ isOpen, onClose }) {
  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="user"
      buttonSubmitText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
    >
      <fieldset className="form__fieldset">
        <label className="form__label">
          <input
            type="text"
            name="name"
            placeholder="Имя"
            className="form__input"
            required
            minLength="2"
            maxLength="40"
            defaultValue="Виталий"
          />
        </label>
        <label className="form__label">
          <input
            type="text"
            name="E-mail"
            placeholder="E-mail"
            className="form__input"
            required
            minLength="2"
            maxLength="200"
            defaultValue="pochta@yandex.ru"
          />
        </label>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
