import React from 'react';
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
    const [pictureLink, setPictureLink] = React.useState('')
    const [pictureName, setPictureName] = React.useState('')

    function handleChangePictureName(e) { setPictureName(e.target.value) }
    function handleChangePictureLink(e) { setPictureLink(e.target.value) }
    function handleAddPlaceSubmit(e) {
        e.preventDefault();
        props.onAddPlace({
            name: pictureName,
            link: pictureLink,
        })
    }

    React.useEffect(() => {
        setPictureName('');
        setPictureLink('')
    }, [props.isOpen]);

    return (
        <PopupWithForm
            name="card"
            title="Новое место"
            buttonName="Создать"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleAddPlaceSubmit}
        >
            <input
                onChange={handleChangePictureName}
                value={pictureName}
                className="popup__input"
                id="popup-card-place"
                type="text"
                name="name"
                placeholder="Название"
                minLength="2"

                maxLength="30"
                required />
            <span className="popup__input-error popup-card-place-error "></span>
            <input
                onChange={handleChangePictureLink}
                value={pictureLink}
                className="popup__input"
                id="popup-card-url"
                type="url"
                placeholder="Ссылка на картинку"
                name="link"
                required />
            <span className="popup__input-error popup-card-url-error"></span>
        </PopupWithForm>
    )
}

export default AddPlacePopup;

