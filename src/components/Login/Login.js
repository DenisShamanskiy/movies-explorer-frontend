import "./Login.css";
import SignForm from "../SignForm/SignForm";
import SignInput from "../UI/SignInput/SignInput";
import { Link } from "react-router-dom";
import HeaderLogo from "../../images/header_logo.svg";

function Login() {
  return (
    <div className="login">
      <Link className="header__logo" to="/">
        <img src={HeaderLogo} alt="Логотип" />
      </Link>
      <SignForm
        title="Рады видеть!"
        submitBtnText="Войти"
        linkTo="/signup"
        text="Ещё не зарегистрированы?"
        textLink="Регистрация"
      >
        <SignInput
          id="signup-email"
          type="email"
          name="email"
          label="E-mail"
          autoComplete="off"
        />
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

export default Login;
