
function ImagePopup({card, onClose}) {
    return (
        <div className={`popup popup-picture ${card? 'popup_opened':''}`} id="popup-picture">
            <div className="popup__container">
                <div className="popup-picture__body">
                    <button onClick={onClose} className="popup__close-button" type="button" id="popup-picture__close-button"></button>
                    <img className="popup-picture__image" src={card?.link} alt={card?.name} />
                    <h2 className="popup-picture__title">{card?.name}</h2>
                </div>
            </div>
        </div>
    )
}

export default ImagePopup;