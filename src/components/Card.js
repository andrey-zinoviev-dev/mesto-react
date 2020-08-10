import React from 'react';

import deleteSign from '../images/delete_icon.png';

import likeSign from '../images/like.svg';

function Card (props) {
    function handleClick() {
        props.onCardClick(props.card);
    }
    
    return (
        <li className="elements__element">
            <img className="elements__element-delete-sign" src={deleteSign} alt="удалить" onClick={props.onDeleteClick}/>
            <img className="elements__element-photo" alt="" src={props.link} onClick={handleClick}/>
            <div className="elements__element-rectangle">
                <p className="elements__element-text">{props.name}</p>
                <div className="elements__element-like-count">
                    <button type="button" className="elements__element-like"><img className="elements__element-like-sign" src={likeSign} alt="лайк" /></button>
                    <span className="elements__element-like-number">{props.likes.length}</span>
                </div>
            </div>
        </li>
    )
}

export default Card;