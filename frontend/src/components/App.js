import { useState, useEffect } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import EditAvatarPopup from './EditAvatarPopup';
import ConfirmationPopup from './ConfirmationPopup';
import ImagePopup from './ImagePopup';
import api from '../utils/api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import ProtectedRouteElement from "./ProtectedRoute";
import Register from './Register';
import Login from './Login';
import InfoTooltip from './InfoTooltip';
import { checkToken, register, authorize } from '../utils/auth';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const [selectedCard, showSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [infoTooltip, setInfoTooltip] = useState(false);
  const [authEmail, setAuthEmail] = useState(null);
  const [regStatus, setRegStatus] = useState(false);
  const navigate = useNavigate();

  function onLogin(email, password) {
    authorize(email, password)
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        setLoggedIn(true);
        setAuthEmail(email)
        navigate("/");
      })
      .catch((err) => {
        console.log(err)
        handleInfoTooltipOpen()
        setRegStatus(false)
      });
  };

  function handleLogOut() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    setAuthEmail(null);
    navigate("/sign-in");
  };

  function onSignOut(email, password) {
    register(email, password)
      .then(() => {
        handleInfoTooltipOpen()
        setRegStatus(true)
        navigate("/sign-in", { replace: true });
      })
      .catch((err) => {
        handleInfoTooltipOpen()
        setRegStatus(false)
        console.log(err)
      })
  };

  /*useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      checkToken(jwt).then((res) => {
        if (res) {
          const { email } = res;
          setLoggedIn(true);
          setAuthEmail(email);
          navigate("/", { replace: true })
        }
      }).catch((err) => {
        console.log(err)
      });
    }
  }, [navigate])

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then((data) => {
          setCurrentUser(data[0])
          setCards([...data[1]].reverse());
        })
        .catch((err) => console.log(err));
    }
  }, [loggedIn]);*/

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      checkToken(jwt)
        .then((res) => {
          if (res) {
            const { email } = res;
            setLoggedIn(true);
            setAuthEmail(email);
            navigate("/", { replace: true })
          }
        })
        .then(() => {
          if (loggedIn) {
            Promise.all([api.getUserInfo(), api.getInitialCards()])
              .then((data) => {
                setCurrentUser(data[0])
                setCards([...data[1]].reverse());
              })
              .catch((err) => console.log(err));
          }
        })
        .catch((err) => {
          console.log(err)
        });
    }
  }, [loggedIn, navigate]);
  

  function addPlace(data) {
    api.addCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups()
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleUpdateAvatar(data) {
    api.editAvatar(data)
      .then((newAvatar) => {
        setCurrentUser(newAvatar)
        closeAllPopups()
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleUpdateUser(data) {
    api.editUserInfo(data)
      .then((newData) => {
        setCurrentUser(newData)
        closeAllPopups()
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((items) => items.filter((c) => c._id !== card._id && c));
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(id => id === currentUser._id);
    if (!isLiked) {
      api.addLike(card._id).then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      })
        .catch((err) => {
          console.error(err);
        });
    } else {
      api.deleteLike(card._id).then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  function handleInfoTooltipOpen() {
    setInfoTooltip(true)
  }
  function handleCardClick(card) {
    showSelectedCard(card)
  }
  function handleEditAvatarPopupOpen() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen)
  }
  function handleEditProfilePopupOpen() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen)
  }
  function handleAddPlacePopupOpen() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen)
  }
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    showSelectedCard(null);
    setInfoTooltip(false)
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Routes>
            <Route exact path='/'
              element={
                <>
                  <Header
                    title='Выйти'
                    route=''
                    authEmail={authEmail}
                    titleClassName='title-grey'
                    onClick={handleLogOut}
                  />
                  <ProtectedRouteElement
                    element={Main}
                    onEditAvatar={handleEditAvatarPopupOpen}
                    onEditProfile={handleEditProfilePopupOpen}
                    onAddPlace={handleAddPlacePopupOpen}
                    onCardClick={handleCardClick}
                    cards={cards}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                    loggedIn={loggedIn}
                  />
                  <Footer />
                </>
              }
            />
            <Route path='/sign-up'
              element={
                <>
                  <Header
                    title='Войти'
                    route='/sign-in'

                  />
                  <Register
                    onRegister={onSignOut}
                    title='Регистрация'
                    button='Зарегистрироваться'
                  />
                </>
              }
            />
            <Route path='/sign-in'
              element={
                <>
                  <Header
                    title='Регистрация'
                    route='/sign-up'
                    />
                  <Login
                    onRegister={onLogin}
                    title='Вход'
                    button='Войти'
                  />
                </>
              }
            />
            <Route exact path="*"
              element={
                loggedIn ? <Navigate to="/" /> : <Navigate to="/sign-in" />
              }
            />
          </Routes>
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar} />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser} />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={addPlace} />
          <ConfirmationPopup />
          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups} />
          <InfoTooltip
            regStatus={regStatus}
            isOpen={infoTooltip}
            onClose={closeAllPopups} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App;
