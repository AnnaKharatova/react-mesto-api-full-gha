import PopupWithForm from "./PopupWithForm";

function ConfirmationPopup() {
    return (
        <PopupWithForm
            name="confirmation"
            title="Вы уверены?"
            buttonName="Да"
        >
        </PopupWithForm>
    )
}

export default ConfirmationPopup;