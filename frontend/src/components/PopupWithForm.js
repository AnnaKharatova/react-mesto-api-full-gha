
function PopupWithForm(props) {

    return (
        <div id={`popup-${props.name}`} className={`popup ${props.isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <div className="popup__body">
                    <button onClick={props.onClose} className="popup__close-button" id={`popup-${props.name}__close-button`} type="button"></button>
                    <h2 className="popup__title">{props.title}</h2>
                    <form onSubmit={props.onSubmit} className="popup__content" id={`popup-${props.name}__content`} name={props.name}>
                        {props.children}
                        <button type="submit" className="popup__save-button" id={`popup-${props.name}__form-button`}
                            name="popup__form-button">{props.buttonName}</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default PopupWithForm;