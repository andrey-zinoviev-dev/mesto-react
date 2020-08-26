import React from "react";

import PopupWithForm from "./PopupWithForm";

export function AddCardPopup(props) {

    const [name ,setName] = React.useState('');

    const [link, setLink] = React.useState('');

    function handleNameChange(event) {
        setName(event.target.value);
    }

    function handleLinkChange(event) {
        setLink(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        event.target.reset();
        props.onAddCard({
            name: name,
            link: link,
        });

    }



    return (
        <PopupWithForm name='popup_addCard' title="Новое место" formClass="popup__form_type_addCard-form" submitButtonClass="popup__edit-button_action_addCard" submitButtonText="Сохранить" isOpen={props.isOpen} onClose={props.onClose} closePopups={props.closePopups} onSubmit={handleSubmit} dataLoading={props.dataLoading}>
            <>
                <input id="place-name-input" className="popup__input popup__input_order_first popup__input_place-name" name="place-name" type="text" placeholder="Название" required minLength="1" maxLength="30" autoComplete="off" onChange={handleNameChange} />
                <span id="place-name-input-error" className="popup__input-error-message"></span>
                <input id="palce-image-link-input" className="popup__input popup__input_order_second popup__input_image-link" name="palce-image-link" placeholder="Ссылка на картинку" required type="url" autoComplete="off" onChange={handleLinkChange} />
                <span id="palce-image-link-input-error" className="popup__input-error-message popup__input-error-message_order_second"></span>
            </>
        </PopupWithForm>
    )
    
}