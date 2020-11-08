import React from 'react';
import { useSelector } from 'react-redux';
import { login as loginAction } from '../../store/login/actions';
import { ApplicationState, useActions } from '../../store';

import Login from './Login';

const LoginContainer = () => {
  const { loggingIn, loginError } = useSelector((state: ApplicationState) => {
    return {
      loggingIn: state.login.loggingIn,
      loginError: state.login.loginError,
    };
  });

  const { login } = useActions({
    login: loginAction,
  });

  return <Login login={login} loggingIn={loggingIn} loginError={loginError} />;
};

export default LoginContainer;
