import "./SignInput.css";
import React from "react";

function SignInput({
  id,
  type,
  name,
  label,
  inputValue,
  setValue,
  setError,
  errors,
  isRequired,
  minlength,
  maxlength,
  setIsValid,
}) {
  function handleChange(e) {
    setValue(e.target.value);
    setError({ ...errors, [name]: e.target.validationMessage });
    setIsValid(e.target.closest("form").checkValidity());
  }

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
        required={isRequired}
        minLength={minlength}
        maxLength={maxlength}
        value={inputValue}
        onChange={handleChange}
      />
      <span className={`sign__input-error signup-${name}-error`}>
        {errors[name]}
      </span>
    </>
  );
}

export default SignInput;
