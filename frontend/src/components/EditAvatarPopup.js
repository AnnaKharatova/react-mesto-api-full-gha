import React from 'react';
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
    const avatarRef = React.useRef();
    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar(avatarRef.current.value);
    }
    React.useEffect(() => {
        avatarRef.current.value = '';
    }, [props.isOpen]);

    return (
        <PopupWithForm
            name="avatar"
            title="Обновить аватар"
            buttonName="Создать"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
        >
            <input ref={avatarRef} className="popup__input" id="popup-avatar-url" type="url"
                placeholder="https://somewebsite.com/someimage.jpg" name="link" required />
            <span className="popup__input-error popup-avatar-url-error"></span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;