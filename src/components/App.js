import React from 'react';

import Header from './Header.js';

import Main from './Main.js';

import Footer from './Footer.js';

import PopupWithForm from './PopupWithForm.js';

import PopupWithImage from './PopupWithImage.js';

function App() {

  const[isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);

  const [isEditProfilePopupClosed, setisEditProfilePopupClosed] = React.useState(false);

  const [isAddPlacePopupClosed, setIsAddPlacePopupClosed] = React.useState(false);

  const [isEditAvatarPopupClosed, setIsEditAvatarPopupClosed] = React.useState(false);

  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = React.useState(false);

  const [isDeleteCardPopupClosed, setIsDeleteCardPopupClosed] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState(null);

  const [selectedCardClosed, setSelectedCardClosed] = React.useState(false);

  function handleEditAvatarClick() {
   
    setIsEditAvatarPopupOpen(true);
    setIsEditAvatarPopupClosed(false);
  }

  function handleEditProfileClick() {
  
    setIsEditProfilePopupOpen(true);
    setisEditProfilePopupClosed(false);
  }

  function handleAddPlaceClick() {

    setIsAddPlacePopupOpen(true);
    setIsAddPlacePopupClosed(false);
  }

  function closeAllPopups() {
    setisEditProfilePopupClosed(true);
    setIsAddPlacePopupClosed(true);
    setIsEditAvatarPopupClosed(true);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeleteCardPopupClosed(true);
    setSelectedCard(null);
    setIsAddPlacePopupOpen(false);
    setSelectedCardClosed(true);
  }
  
  function handleDeleteButtonClick() {
    setIsDeleteCardPopupOpen(true);
    setIsDeleteCardPopupClosed(false);
  }

  function handleCardClick(data) {
    setSelectedCardClosed(false);
    setSelectedCard(data);
  }

  return (
    <div className="root">
      <Header />
      <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} onDeleteClick={handleDeleteButtonClick}/>
      <Footer />
      <PopupWithForm name="popup" title="Редактировать профиль" children={<form name="popup" className="popup__form popup__form_type_user-edit" action="/" noValidate>
                <input id="username-input" className="popup__input popup__input_order_first" name="username" type="text" required minLength="2" maxLength="40" pattern="[A-Za-zА-Яа-я -]{2,40}" autoComplete="off" />
                <span id="username-input-error" className="popup__input-error-message"></span>
                <input id="occupation-input" className="popup__input popup__input_order_second" name="occupation" type="text" required minLength="2" maxLength="200" pattern="[A-Za-zА-Яа-я -]{2,30}" autoComplete="off" />
                <span id="occupation-input-error" className="popup__input-error-message popup__input-error-message_order_second"></span>
                <button type="submit" className="popup__edit-button">Сохранить</button>
            </form>} isOpen={isEditProfilePopupOpen} onClose={isEditProfilePopupClosed} closePopups={closeAllPopups}/>
      <PopupWithForm name='popup_addCard' title="Новое место" children={<form name="popup_addCard" className="popup__form popup__form_type_addCard-form" action="/">
                <input id="place-name-input" className="popup__input popup__input_order_first popup__input_place-name" name="place-name" type="text" placeholder="Название" required type="text" minLength="1" maxLength="30" autoComplete="off" />
                <span id="place-name-input-error" className="popup__input-error-message"></span>
                <input id="palce-image-link-input" className="popup__input popup__input_order_second popup__input_image-link" name="palce-image-link" placeholder="Ссылка на картинку" required type="url" autoComplete="off" />
                <span id="palce-image-link-input-error" className="popup__input-error-message popup__input-error-message_order_second"></span>
                <button type="submit" className="popup__edit-button popup__edit-button_action_addCard">Сохранить</button>
            </form>} isOpen={isAddPlacePopupOpen} onClose={isAddPlacePopupClosed} closePopups={closeAllPopups}/>
      <PopupWithForm name="popup_avatar-edit" title="Обновить аватар" children={<form name="popup_avatar-edit" className="popup__form popup__form_type_change-avatar" action="/">
                <input type="url" className="popup__input popup__input_type_avatar-link" name="avatar-link" id="avatar-link-input" placeholder="Ссылка на картинку" required autoComplete="off" />
                <span className="popup__input-error-message" id="avatar-link-input-error"></span>
                <button type="submit" className="popup__edit-button">Сохранить</button>
            </form>} isOpen={isEditAvatarPopupOpen} onClose={isEditAvatarPopupClosed} closePopups={closeAllPopups}/>
      <PopupWithForm name="popup_delete-image" title="Вы уверены?" children={<div className="popup__wrapper">
                <button className="popup__edit-button">Да</button>
            </div>} isOpen={isDeleteCardPopupOpen} onClose={isDeleteCardPopupClosed} closePopups={closeAllPopups}/>
      <PopupWithImage card={selectedCard} onClose={selectedCardClosed} closePopups={closeAllPopups}/>
    </div>
  );
}

export default App;
