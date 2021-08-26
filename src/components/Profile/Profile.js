import "./Profile.css";
import React, { useEffect } from "react";
import useFormWithValidation from "../../hooks/useFormWithValidation";

function Profile({
  currentUser,
  onSignOut,
  onUpdateUser,
  editIsSuccess,
  editIsFailed,
}) {
  const { values, setValues, handleChange, errors, isValid, setIsValid } =
    useFormWithValidation();
  ///
  useEffect(() => {
    setValues(currentUser);
    setIsValid(true);
  }, [currentUser, setValues, setIsValid]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser(values);
  };

  return (
    <div className="profile">
      <h2 className="profile__title">Привет, {currentUser.name}!</h2>
      <form className="profile__form" onSubmit={handleSubmit}>
        <label className="profile__form-label" htmlFor="name">
          Имя
          <input
            className="profile__form-input"
            id="name"
            required
            minLength="2"
            maxLength="30"
            name="name"
            type="text"
            placeholder="Имя"
            value={values.name || ""}
            onChange={handleChange}
          />
        </label>
        <span className="profile__form-error">{errors.name}</span>
        <label className="profile__form-label" htmlFor="email">
          E-mail
          <input
            className="profile__form-input"
            id="email"
            required
            name="email"
            type="email"
            placeholder="Почта"
            value={values.email || ""}
            onChange={handleChange}
            autoComplete="off"
          />
        </label>
        <span className="profile__form-error">{errors.email}</span>
        {editIsSuccess && (
          <p className="profile__form-submit-success">
            Данные успешно изменены
          </p>
        )}
        {editIsFailed && (
          <p className="profile__form-submit-failed">
            Ошибка при изменении данных
          </p>
        )}

        <button
          type="submit"
          className="profile__form-submit"
          disabled={
            (values.name === currentUser.name &&
              values.email === currentUser.email) ||
            !isValid
          }
        >
          Редактировать
        </button>
        <button
          type="button"
          className="profile__button_logout"
          onClick={onSignOut}
        >
          Выйти из аккаунта
        </button>
      </form>
    </div>
  );
}

export default Profile;
