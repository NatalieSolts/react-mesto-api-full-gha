import { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace(name, link);
  }

  return (
    <PopupWithForm
      name="add-place"
      title="Новое место"
      buttonText="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className="popup__input popup__input_type_card-name"
        name="name"
        placeholder="Название"
        required=""
        minLength={2}
        maxLength={30}
        id="card-name"
        value={name}
        onChange={handleChangeName}
      />
      <span className="popup__error card-name-error" />
      <input
        type="url"
        className="popup__input popup__input_type_link"
        name="link"
        placeholder="Ссылка на картинку"
        required=""
        id="link"
        value={link}
        onChange={handleChangeLink}
      />
      <span className="popup__error link-error" />
    </PopupWithForm>
  );
}

export default AddPlacePopup;
