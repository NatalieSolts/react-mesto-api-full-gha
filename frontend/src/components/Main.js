import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Card from "./Card";
import Header from "./Header";

function Main({
  cards,
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onCardDelete,
  onSignout,
  email,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <>
      <Header
        buttonText="Выйти"
        buttonLink="/sign-in"
        onSignout={onSignout}
        email={email}
      />
      <main className="content">
        <section className="profile">
          <button className="profile__avatar-button" onClick={onEditAvatar}>
            <img
              src={currentUser.avatar}
              alt="Аватар пользователя"
              className="profile__avatar"
            />
          </button>
          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              className="profile__edit-button button-hover"
              type="button"
              onClick={onEditProfile}
            />
            <p className="profile__about">{currentUser.about}</p>
          </div>
          <button
            className="profile__add-button button-hover"
            type="button"
            onClick={onAddPlace}
          />
        </section>
        <section className="cards" aria-label="Карточки с изображением мест">
          <ul className="cards__list">
            {
              Array.isArray(cards)
                ? cards.reverse((card) => (
                <Card
                  card={card}
                  key={card._id}
                  onCardClick={onCardClick}
                  onCardLike={onCardLike}
                  onCardDelete={onCardDelete}
                />
                ))
                : ''
            }
          </ul>
        </section>
      </main>
    </>
  );
}

export default Main;
