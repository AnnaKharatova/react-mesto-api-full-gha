import React, {useState} from 'react';

export default function AuthForm(props) {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const handleInputPasswordInput = e => { setPassword(e.target.value) };
  const handleInputEmail = e => { setEmail(e.target.value) };
  const handleSubmit = e => {
    e.preventDefault();
    props.onRegister(email, password);
  };

    return (
      <section className='sing'>
        <h3 className='sing__title'>{props.title}</h3>
        <form className='sing__form' onSubmit={handleSubmit}>
          <input className='sing__input' type='email' placeholder='Email' value={email} onChange={handleInputEmail} required></input>
          <input className='sing__input' type='password' placeholder='Пароль' value={password} onChange={handleInputPasswordInput} required></input>
          <button className='sing__submit-button'>{props.button}</button>
            {props.children}
        </form>
      </section>
    );

  }