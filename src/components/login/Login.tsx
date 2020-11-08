import React, { useCallback, useState } from 'react';
import { Error } from '../global-components/GlobalComponents';
import {
  LoginWrapper,
  LoginText,
  StyledInput,
  StyledButton,
  StyledLoader,
} from './StyledComponents';

interface OwnProps {
  loggingIn: boolean;
  loginError?: string;
  login: ({ username, password }: { username: string; password: string }) => void;
}

const Login = ({ loggingIn, loginError, login }: OwnProps) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleSubmit = useCallback(
    (event?: React.FormEvent) => {
      event?.preventDefault();
      login(credentials);
    },
    [credentials, login],
  );

  const handleInputKeyPress = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleSubmit();
      }
    },
    [handleSubmit],
  );

  const handleUpdateCredentials = useCallback(
    (data: { username?: string; password?: string }) =>
      setCredentials((prevState) => ({ ...prevState, ...data })),
    [],
  );

  return (
    <LoginWrapper>
      <LoginText>Login</LoginText>
      <Error message={loginError} />
      <form onSubmit={handleSubmit}>
        <StyledInput
          error={!!loginError}
          placeholder='Userame'
          type='text'
          value={credentials.username}
          onChange={(e) => handleUpdateCredentials({ username: e.target.value })}
          onKeyPress={handleInputKeyPress}
        />

        <StyledInput
          error={!!loginError}
          placeholder='Password'
          type='password'
          value={credentials.password}
          onChange={(e) => handleUpdateCredentials({ password: e.target.value })}
          onKeyPress={handleInputKeyPress}
        />
        <StyledButton>
          {loggingIn && <StyledLoader type='Oval' width={13} height={13} color='white' />}
          Submit
        </StyledButton>
      </form>
    </LoginWrapper>
  );
};

export default Login;
