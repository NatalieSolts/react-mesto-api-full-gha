import { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = useRef();

  useEffect(() => {
    avatarRef.current.value = "";
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="update-avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <input
        type="url"
        // defaultValue=""
        className="popup__input popup__input_type_avatar"
        name="avatar"
        placeholder="Ссылка на картинку"
        required=""
        id="avatar"
        ref={avatarRef}
      />
      <span className="popup__error avatar-error" />
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
