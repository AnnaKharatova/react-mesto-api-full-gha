import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = card.owner._id === currentUser._id;
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = (`element__button ${isLiked && 'element__button_active'}`);

    function handleClick() { onCardClick(card) }
    function handleLikeClick() { onCardLike(card) }
    function handleDeleteClick() { onCardDelete(card) }

    return (
        <article className="element" key={card._id}>
            {isOwn && <button className="element__delete-button" onClick={handleDeleteClick} />}
            <img onClick={handleClick} className="element__image" src={card.link} alt={`${card.name}`} />
            <h2 className="element__title">{card.name}</h2>
            <div className="element__like">
                <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick} />
                <div className="element__count">{card.likes.length}</div>
            </div>
        </article>
    )
}

export default Card;