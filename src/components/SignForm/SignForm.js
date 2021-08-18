import "./SignForm.css";
import { Link } from "react-router-dom";

function SignForm({ title, children, submitBtnText, text, textLink, linkTo }) {
  return (
    <>
      <section className="sign">
        <h2 className="sign__title">{title}</h2>
        <form className="sign__form" name="form-sign">
          <fieldset className="sign__field">{children}</fieldset>
          <button type="submit" className="sign__button">
            {submitBtnText}
          </button>
        </form>
        <p className="sign__text">
          {text}
          <Link className="sign__link" to={linkTo}>
            {textLink}
          </Link>
        </p>
      </section>
    </>
  );
}

export default SignForm;
