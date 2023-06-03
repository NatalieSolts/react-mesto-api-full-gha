import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id; // Определяем, являемся ли мы владельцем текущей карточки
  const isLiked = card.likes.some((i) => i._id === currentUser._id); // Определяем, есть ли у карточки лайк, поставленный текущим пользователем

  // Создаём переменную, которую зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `cards__icon-heart button-hover ${
    isLiked ? "cards__icon-heart_is-active" : ""
  }`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="cards__card">
      <img
        className="cards__image"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      {/* используем переменную для условного рендеринга */}
      {isOwn && (
        <button
          className="cards__delete button-hover"
          type="button"
          onClick={handleDeleteClick}
        ></button>
      )}
      <div className="cards__description">
        <h2 className="cards__name">{card.name}</h2>
        <div className="cards__like-group">
          <button
            className={cardLikeButtonClassName}
            type="button"
            onClick={handleLikeClick}
          ></button>
          <p className="cards__number-of-likes">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
