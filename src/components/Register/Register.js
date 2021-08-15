import "./Register.css";
import SignForm from "../SignForm/SignForm";
import SignInput from "../My/SignInput/SignInput";
import { Link } from "react-router-dom";
import HeaderLogo from "../../images/header_logo.svg";

function Register() {
  return (
    <div className="register">
      <Link className="header__logo" to="/">
        <img src={HeaderLogo} alt="Логотип" />
      </Link>
      <SignForm
        title="Добро пожаловать!"
        submitBtnText="Зарегистрироваться"
        text="Уже зарегистрированы?"
        textLink="Войти"
        linkTo="/signin"
      >
        <SignInput id="signup-name" type="name" name="name" label="Имя" />
        <SignInput id="signup-email" type="email" name="email" label="E-mail" />
        <SignInput
          id="signup-password"
          type="password"
          name="password"
          label="Пароль"
        />
      </SignForm>
    </div>
  );
}

export default Register;
