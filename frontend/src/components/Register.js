import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";

function Register({ onRegister, title, buttonText }) {
  const [regFormValue, setRegFormValue] = useState({
    email: "",
    password: "",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setRegFormValue({
      ...regFormValue,
      [name]: value,
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onRegister(regFormValue);
  };

  return (
    <>
      <Header buttonText="Войти" buttonLink="/sign-in" />
      <section className="auth-form">
        <h2 className="auth-form__title">{title}</h2>
        <form onSubmit={handleSubmit}>
          <div className="auth-form__inputs-all">
            <label>
              <input
                className="auth-form__input"
                value={regFormValue.email || ""}
                type="email"
                placeholder="Email"
                name="email"
                onChange={handleChange}
                minLength="6"
                maxLength="30"
                required
              />
            </label>
            <label>
              <input
                className="auth-form__input"
                value={regFormValue.password || ""}
                type="password"
                placeholder="Пароль"
                name="password"
                onChange={handleChange}
                minLength="6"
                maxLength="30"
                required
              />
            </label>
          </div>
          <button className={`auth-form__button button`} type="submit">
            {buttonText}
          </button>
        </form>
        <span className="auth-form__text">
          Уже зарегистрированы?
          <Link to="/sign-in" className="auth-form__link button-hover">
            Войти
          </Link>
        </span>
      </section>
    </>
  );
}

export default Register;
