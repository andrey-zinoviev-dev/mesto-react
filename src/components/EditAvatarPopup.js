import React from 'react';
import PopupWithForm from "./PopupWithForm.js";

import {CurrentUserContext} from "../contexts/CurrentUserContext.js";

export function EditAvatarPopup(props) {
    
    const user = React.useContext(CurrentUserContext);

    const [value, setValue] = React.useState('');

    function changeInput(event) {
        setValue(event.target.value);
    }

    function handleAvatarUpdate(event) {
        event.preventDefault();
        props.onUpdateAvatar({
            name: user.name,
            about: user.about,
            avatar: value
        })
        event.target.reset();
    }

    return (
        <PopupWithForm name="popup_avatar-edit" title="Обновить аватар" formClass="popup__form_type_change-avatar" submitButtonClass="" submitButtonText="Сохранить" isOpen={props.isOpen} onClose={props.onClose} closePopups={props.closePopups} onSubmit={handleAvatarUpdate} dataLoading={props.dataLoading}>
          <>
          <input type="url" className="popup__input popup__input_type_avatar-link" name="avatar-link" id="avatar-link-input" placeholder="Ссылка на картинку" required autoComplete="off" onChange={changeInput} />
          <span className="popup__input-error-message" id="avatar-link-input-error"></span>
          </>
        </PopupWithForm>
    )
}
