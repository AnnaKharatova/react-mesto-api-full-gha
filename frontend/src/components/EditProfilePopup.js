import React from 'react';
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function EditProfilePopup(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const [nameValue, setNameValue] = React.useState('')
    const [description, setDescription] = React.useState('')

    React.useEffect(() => {
        setNameValue(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, props.isOpen]);

    function handleChangeName(e) { setNameValue(e.target.value) }
    function handleChangeDescription(e) { setDescription(e.target.value) }
    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({
            name: nameValue,
            about: description,
        });
    }

    return (

        <PopupWithForm
            name="profile"
            title="Редактировать профиль"
            buttonName="Сохранить"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
        >
            <input
                className="popup__input"
                id="popup-profile-name"
                type="text"
                value={nameValue || ""}
                onChange={handleChangeName}
                name="name"
                placeholder="Введите имя"
                minLength="2"
                maxLength="40"
                required />
            <span className="popup__input-error popup-profile-name-error"></span>
            <input
                className="popup__input"
                id="popup-profile-profession"
                type="text"
                value={description || ""}
                onChange={handleChangeDescription}
                placeholder="Введите сферу деятельности"
                name="profession"
                minLength="2"
                maxLength="200"
                required />
            <span className="popup__input-error popup-profile-profession-error"></span>
        </PopupWithForm>
    )
}

export default EditProfilePopup;