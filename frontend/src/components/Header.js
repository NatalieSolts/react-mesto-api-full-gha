import React from "react";
import { Link } from "react-router-dom";
import headerLogo from "../image/header-logo.svg";

function Header({ buttonText, buttonLink, email, onSignout }) {
  return (
    <header className="header">
      <img
        src={headerLogo}
        alt="Логотип Место"
        className="header__logo button-hover"
      />
      <div className="header__container">
        <span className="header__email">{email}</span>
        <Link
          to={buttonLink}
          onClick={onSignout}
          className="header__button button-hover"
        >
          {buttonText}
        </Link>
      </div>
    </header>
  );
}

export default Header;
