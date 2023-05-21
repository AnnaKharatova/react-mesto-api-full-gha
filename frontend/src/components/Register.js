import React from 'react';
import AuthForm from './AuthForm';
import { Link } from 'react-router-dom';

export default function Register(props) {

  return (
    <AuthForm
      {...props}
    >
      <p className='sing__caption'>Вы уже зарегистрированы?&#8194;
        <Link to='/sing-up' className='sing__link'>Войти</Link>
      </p>
    </AuthForm >
    );
}