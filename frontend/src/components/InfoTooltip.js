import infoImageError from '../images/info-image-red.svg'
import infoImageSuccess from '../images/info-image-black.svg'

function InfoTooltip({ regStatus, isOpen, onClose }) {
    return (
        <div id='popup-infoTooltip' className={`popup ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <div className="popup__body popup-infotool">
                    <button onClick={onClose} className="popup__close-button" id='popup-infotooltip__close-button' type="button"></button>
                    <img className="popup__info-image" src={`${regStatus ? infoImageSuccess : infoImageError}`} alt='Информационное сообщение'></img>
                    <p className="popup__caption">{regStatus ? 'Вы успешно зарегистрировались!' : (`Что-то пошло не так! Попробуйте ещё раз.`)}</p>
                </div>
            </div>
        </div>
    )
}

export default InfoTooltip;
