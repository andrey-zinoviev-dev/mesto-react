import React from 'react';

import userEditSign from '../images/user-edit-sign.png';

import profileEditSign from '../images/Vector-edit.png';

import addCardSign from '../images/Vector.png';

import api from '../utils/api.js';

import Card from './Card.js';

function Main (props) {
    
    const [userName, setUserName] = React.useState('');
    const [userDescription, setUserDescription] = React.useState('');
    const [userAvatar, setUserAvatar] = React.useState('');

    React.useEffect(() => {
        function getInfoFromServer () {
            api.getUser()
            .then((data) => {
                setUserName(data.name);
                setUserDescription(data.about);
                setUserAvatar(data.avatar);
            })
            .catch((err) => {
                console.log(err);
            });
        }

        getInfoFromServer();
    }, [])

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



    return (
        <main className="content">
        <section className="profile">
            <div className="profile__image-wrapper">
                <img className="profile__avatar" src={userAvatar} />
                <img className="profile__avatar-edit-sign" src={userEditSign} onClick={props.onEditAvatar} alt="конпка редактирования профиля"/>
                <div className="profile__avatar-overlay"></div>
            </div>
            <div className="profile__info">
                <div className="profile__wrapper">
                    <h1 className="profile__heading">{userName}</h1>
                    <button type="button" className="profile__edit-button" onClick={props.onEditProfile}><img className="profile__edit-button-sign" src={profileEditSign}  alt="изменить пользователя" /></button>
                </div>
                <p className="profile__subtitle">{userDescription}</p>
            </div>
            <button type="button" className="profile__add-button" onClick={props.onAddPlace}><img className="profile__add-button-sign" src={addCardSign} alt="Добавить картинку"/></button>
        </section>
        <section className="elements">
            <ul className="elements__list">
                {cards.map((card, i) => (
                    <Card key={card._id} name={card.name} link={card.link} likes={card.likes.length} onCardClick={props.onCardClick} card={card} onDeleteClick={props.onDeleteClick}/>
                ))}
            </ul>
        </section>
      </main>
    )
}

export default Main;