// компонент модального окна,который информирует пользователя
// об успешной (или не очень) регистрации
import successImage from "../image/icon-success.svg";
import failImage from "../image/icon-fail.svg";

function InfoTooltip({ isOpen, onClose, isSuccess, message }) {
  return (
    <section
      className={`popup popup_type_success ${isOpen ? "popup_opened" : ""}`}
      onClick={onClose}
    >
      <div className="popup__container popup__container-success">
        <button
          className="popup__button-close button-hover"
          type="reset"
          onClick={onClose}
        />
        <img
          className="popup__image-success"
          src={isSuccess ? successImage : failImage}
          alt="#"
        />
        <h2 className="popup__title popup__title-success">{message}</h2>
      </div>
    </section>
  );
}

export default InfoTooltip;
