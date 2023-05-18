import { useState } from "react";
import Header from "./Header";

const Login = ({ onLogin, title, buttonText }) => {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onLogin(formValue);
  };

  return (
    <>
      <Header buttonText="Регистрация" buttonLink="/sign-up" />
      <section className="auth-form">
        <h2 className="auth-form__title">{title}</h2>
        <form onSubmit={handleSubmit}>
          <div className="auth-form__inputs-all">
            <label>
              <input
                className="auth-form__input"
                value={formValue.email || ""}
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
                value={formValue.password || ""}
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
      </section>
    </>
  );
};

export default Login;
