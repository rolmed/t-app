import React, { useCallback, useState } from 'react';
import Loader from 'react-loader-spinner';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { login as loginAction } from '../../store/login/actions';
import { ApplicationState, useActions } from '../../store';

const LoginCard = styled.div`
  padding: 20px;
  border: ${(props) => props.theme.vars.border};
  width: 50%;
  min-width: 380px;
  margin: auto;
  background: white;
`;

const LoginText = styled.div`
  padding-bottom: 5px;
`;

const StyledInput = styled.input<{ error: boolean }>`
  display: block;
  width: 100%;
  margin-bottom: 15px;
  padding: 10px;
  border: none;
  border: ${(props) => props.theme.vars.border};
  :focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary};
  }
  ${(props) => props.error && `border-color: ${props.theme.colors.error};`}
`;

const StyledButton = styled.button`
  border: none;
  padding: 10px 15px;
  background-color: ${(props) => props.theme.colors.primary};
  color: white;
  cursor: pointer;
  line-height: 1;
  :focus {
    outline: none;
  }
  svg {
    margin-right: 5px;
  }
`;

const StyledLoader = styled(Loader)`
  float: left;
`;

const Error = styled.span`
  color: ${(props) => props.theme.colors.error};
  font-size: 13px;
  display: block;
  margin-bottom: 10px;
`;

const LoginContainer = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const { loggingIn, loginError } = useSelector((state: ApplicationState) => {
    return {
      loggingIn: state.login.loggingIn,
      loginError: state.login.loginError,
    };
  });

  const { login } = useActions({
    login: loginAction,
  });

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
    <LoginCard>
      <LoginText>Login</LoginText>
      <Error>{loginError}</Error>
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
    </LoginCard>
  );
};

export default LoginContainer;
