import "./Profile.css";

function Profile({ onSignOut }) {
  return (
    <>
      <section className="profile">
        <h2 className="profile__title">Привет, Виталий!</h2>
        <ul className="profile__info">
          <li className="profile__item">
            <p className="profile__item-name">Имя</p>
            <p className="profile__item-value">Виталий</p>
          </li>
          <li className="profile__item">
            <p className="profile__item-name">E-mail</p>
            <p className="profile__item-value">name@email.ru</p>
          </li>
        </ul>

        <button type="button" className="profile__button">
          Редактировать
        </button>
        <button
          type="button"
          className="profile__button_logout"
          onClick={onSignOut}
        >
          Выйти из аккаунта
        </button>
      </section>
    </>
  );
}

export default Profile;
