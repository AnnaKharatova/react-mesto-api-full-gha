import logo from '../images/logo.svg';
import { Link } from 'react-router-dom';

function Header({ route, title, onClick, authEmail, titleClassName }) {
    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="Логотип Место Россия" />
            <div className='header__auth'>
                <p className='header__auth-email'>{authEmail}</p>
                <Link to={route} className={`header__link ${titleClassName}`} onClick={onClick}>{title}</Link>
            </div>
        </header>
    )
}

export default Header;