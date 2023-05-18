import React from "react";

function PopupWithForm({
  name,
  title,
  buttonText,
  children,
  isOpen,
  onClose,
  onSubmit,
}) {
  return (
    <section
      className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}
    >
      <div className="popup__container">
        <button
          className="popup__button-close button-hover"
          type="reset"
          onClick={onClose}
        />
        <h2 className="popup__title">{title}</h2>
        <form
          action="#"
          name="popup__form"
          className={`popup__form popup__form_${name}`}
          // noValidate=""
          onSubmit={onSubmit}
        >
          {children}
          <button
            className="popup__button-submit button button-submit button-hover"
            type="submit"
          >
            {buttonText}
          </button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
