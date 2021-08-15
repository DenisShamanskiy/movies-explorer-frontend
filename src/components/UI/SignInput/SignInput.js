import "./SignInput.css";

function SignInput({ id, type, name, label }) {
  return (
    <>
      <label htmlFor={id} className="sign__label">
        {label}
      </label>
      <input
        id={id}
        className={`sign__input sign__input_type_${name}`}
        type={type}
        name={name}
        required
      />
      <span className={`sign__input-error signup-${name}-error`}>
        Что-то пошло не так...
      </span>
    </>
  );
}

export default SignInput;
