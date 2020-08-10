import React from 'react';

import popupCloseSign from '../images/Close-icon.png';

function PopupWithForm(props) {
    return (
        <section className={props.isOpen && !props.onClose ? (`popup ${props.name} popup_opened`) : (`popup ${props.name}`)}>
        <div className="popup__container">
            <h4 className="popup__title">{props.title}</h4>
            <button type="button" className="popup__close" onClick={props.closePopups}><img className="popup__close-sign" src={popupCloseSign} alt="закрыть окно" /></button>
            <form className={`popup__form ${props.formClass}`} action="/" noValidate>
                {props.children}
                <button type="submit" className={`popup__edit-button ${props.submitButtonClass}`}>{props.submitButtonText}</button>
            </form>
        </div>
        <div className="popup__overlay"></div>
      </section>
    )
}

export default PopupWithForm;