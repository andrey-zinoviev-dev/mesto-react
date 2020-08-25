import React from 'react';

import Header from './Header.js';

import Main from './Main.js';

import Footer from './Footer.js';

import PopupWithImage from './PopupWithImage.js';

import api from '../utils/api.js';

import {CurrentUserContext} from "../contexts/CurrentUserContext";

import {EditProfilePopup} from "./EditProfilePopup";

import {EditAvatarPopup} from "./EditAvatarPopup";

import {DeleteCardPopup} from "./DeleteCardPopup";

import {AddCardPopup} from "./AddCardPopup";

function App() {

  const[isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);

  const [isAddCardPopupOpen, setIsAddCardPopupOpen] = React.useState(false);

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);

  const [isEditProfilePopupClosed, setisEditProfilePopupClosed] = React.useState(false);

  const [isAddCardPopupClosed, setIsAddCardPopupClosed] = React.useState(false);

  const [isEditAvatarPopupClosed, setIsEditAvatarPopupClosed] = React.useState(false);

  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = React.useState(false);

  const [isDeleteCardPopupClosed, setIsDeleteCardPopupClosed] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState(null);

  const [selectedCardClosed, setSelectedCardClosed] = React.useState(false);

  const [currentUser, setCurrentUser] = React.useState();

  const [deletingCard, setDeletingCard] = React.useState();

  const [dataIsLoading, setDataIsLoading] = React.useState(false);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
    setIsEditAvatarPopupClosed(false);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
    setisEditProfilePopupClosed(false);
  }

  function handleAddPlaceClick() {
    setIsAddCardPopupOpen(true);
    setIsAddCardPopupClosed(false);
  }

  function closeAllPopups() {
    setisEditProfilePopupClosed(true);
    // setIsAddPlacePopupClosed(true);
    setIsEditAvatarPopupClosed(true);
    setIsEditProfilePopupOpen(false);
    setIsAddCardPopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    // setIsAddPlacePopupOpen(false);
    setIsDeleteCardPopupClosed(true);
    setSelectedCard(null);
    setIsAddCardPopupOpen(false);
    setSelectedCardClosed(true);
  }

  function handleCardClick(data) {
    setSelectedCardClosed(false);
    setSelectedCard(data);
  }

  function getDataFromServer() {
    api.getUser()
    .then((data) => {
      setCurrentUser(data);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  React.useEffect(() => {
    getDataFromServer();
  },[])

  function handleUpdateUser(data) {
    setDataIsLoading(true);
    api.editProfile(data)
    .then((data) => {
      setDataIsLoading(false);
      setCurrentUser(data);
      closeAllPopups();
    })
    
  }

  function handleAvatarUpdate(link) {
    setDataIsLoading(true);
    api.updateAvatar(link)
    .then((data) => {
      setDataIsLoading(false);
      setCurrentUser(data);
      closeAllPopups();
    })
  }

  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
      function getCardsFromServer () {
          api.getInitialCards()
          .then((data) => {
              setCards(data);
          })
          .catch((err) => {
              console.log(err);
          });
      }

      getCardsFromServer();
  }, [])

  function handleCardLike(card) {
      let isLiked = card.likes.some((like) => {return like._id === currentUser._id})
      if(!isLiked) {
          api.setLike(card._id)
          .then((data) => {
          const newCards = cards.map((oldCard) => {
              return oldCard._id === data._id ? (data) : (oldCard)
          })
          setCards(newCards);
          isLiked = !isLiked;
      })} else {
          api.removeLike(card._id)
          .then((data) => {
              const newCards = cards.map((oldCard) => {
                  return oldCard._id === data._id ? (data) : (oldCard)
              })
              setCards(newCards);
              isLiked = !isLiked;
          })
      }
  }

  function handleDeleteCardClick(card) {
      setIsDeleteCardPopupOpen(true);
      setIsDeleteCardPopupClosed(false);
      setDeletingCard(card._id);
  }

  function handleCardDelete(id) {
    setDataIsLoading(true);
    api.deleteCard(id)
    .then((data) => {
      setDataIsLoading(false);
      const newCards = cards.filter((card) => {
        return card._id!==id;
      })
      setCards(newCards);
      closeAllPopups();
    })
  }

  function handleAddCard(card) {
    setDataIsLoading(true);
    api.addCard(card)
    .then((data) => {
      setDataIsLoading(false);
      setCards([...cards, data]);
      closeAllPopups();
    })
  }

  return (
    <div className="root">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} cards={cards} onCardLike={handleCardLike} onCardDelete={handleDeleteCardClick} user={currentUser} />
        <Footer />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={isEditProfilePopupClosed} closePopups={closeAllPopups} onUpdateUser={handleUpdateUser} dataLoading={dataIsLoading} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={isEditAvatarPopupClosed} closePopups={closeAllPopups} onUpdateAvatar={handleAvatarUpdate} dataLoading={dataIsLoading} />
        <AddCardPopup isOpen={isAddCardPopupOpen} onClose={isAddCardPopupClosed} closePopups={closeAllPopups} onAddCard={handleAddCard} dataLoading={dataIsLoading} />
        <DeleteCardPopup deleteCard={deletingCard} isOpen={isDeleteCardPopupOpen} onClose={isDeleteCardPopupClosed} closePopups={closeAllPopups} onDeleteCard={handleCardDelete} dataLoading={dataIsLoading} />
        <PopupWithImage card={selectedCard} onClose={selectedCardClosed} closePopups={closeAllPopups}/>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
