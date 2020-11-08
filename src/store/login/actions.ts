import { Dispatch } from 'redux';
import { createAction } from 'typesafe-actions';
import axios from 'axios';
import { ThunkResult } from '../types';
import LocalStorageService from '../../services/local-storage-service';

export const loginStart = createAction('@@login/LOGIN_START')();
export const loginSuccess = createAction('@@login/LOGIN_SUCCESS')<string>();
export const loginError = createAction('@@login/LOGIN_ERROR')<string | undefined>();
export const logOut = createAction('@@login/LOG_OUT')();

export const login = (loginParams: { username: string; password: string }): ThunkResult => {
  return async (dispatch: Dispatch): Promise<void> => {
    dispatch(loginStart());
    const { username, password } = loginParams;

    try {
      const { data } = await axios.post(`https://playground.tesonet.lt/v1/tokens`, {
        username,
        password,
      });

      dispatch(loginSuccess(data.token));
      LocalStorageService.setAuthToken(data.token);
    } catch (error) {
      if (error.response?.status === 401) {
        dispatch(loginError('Incorrect username or password'));
      } else {
        dispatch(loginError(error.message));
      }
    }
  };
};

export const logOutUser = (): ThunkResult => {
  return async (dispatch: Dispatch): Promise<void> => {
    LocalStorageService.removeAuthToken();
    dispatch(logOut());
  };
};
