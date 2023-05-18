import React from 'react';

function ImagePopup( {card, onClose} ) {
  return (
    <section className={`popup popup_type_increase-img ${card ? 'popup_opened' : ''}`}>
    <div className="popup__image-container">
      <button
        className="popup__button-close button-hover"
        type="reset"
        onClick={onClose}
      />
      <img
        className="popup__cards-image"
        src={card?.link}
        alt={card?.name}
      />
      <h2 className="popup__cards-name">{card?.name}</h2>
    </div>
  </section>
  )
}

export default ImagePopup;
