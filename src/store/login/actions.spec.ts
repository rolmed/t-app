import { DeepPartial } from 'redux';
import axios from 'axios';
import * as actions from './actions';
import { ApplicationState } from '..';
import LocalStorageService from '../../services/local-storage-service';
import { invokeAction } from '../../testHelpers';

describe('login actions', () => {
  const initialState: DeepPartial<ApplicationState> = {
    login: {
      authToken: undefined,
      loggingIn: false,
      loginError: undefined,
    },
  };

  describe('logOutUser', () => {
    it('should dispatch push action on logOutUser when keepReturnUrl is false', async () => {
      const removeAuthTokenSpy = jest.spyOn(LocalStorageService, 'removeAuthToken');

      const dispatchFn = await invokeAction({
        action: actions.logOutUser,
        state: initialState,
      });

      expect(dispatchFn).toHaveBeenCalledWith(actions.logOut());
      expect(removeAuthTokenSpy).toHaveBeenCalled();
    });
  });

  describe('login', () => {
    it('should dispatch loginSuccess action on login success', async () => {
      const payload = {
        data: { username: 'name', password: 'pass' },
      };
      const loginResult = { token: 'abc' };
      const setAuthTokenSpy = jest.spyOn(LocalStorageService, 'setAuthToken');
      jest.spyOn(axios, 'post').mockResolvedValue({ data: loginResult });

      const dispatchFn = await invokeAction({
        action: actions.login,
        params: [payload],
        state: initialState,
      });

      expect(dispatchFn).toHaveBeenCalledWith(actions.loginStart());
      expect(setAuthTokenSpy).toHaveBeenCalledWith(loginResult.token);
      expect(dispatchFn).toHaveBeenCalledWith(actions.loginSuccess(loginResult.token));
    });

    it('should dispatch loginError action on unauthorized login', async () => {
      const payload = {
        data: { username: 'name', password: 'pass' },
      };
      const error = {
        message: 'error message',
        response: { status: 401 },
      };
      jest.spyOn(axios, 'post').mockRejectedValueOnce(error);

      const dispatchFn = await invokeAction({
        action: actions.login,
        params: [payload],
        state: initialState,
      });

      expect(dispatchFn).toHaveBeenCalledWith(actions.loginError('Incorrect username or password'));
    });

    it('should dispatch loginError action with empty message on failed login', async () => {
      const payload = {
        data: { username: 'name', password: 'pass' },
      };
      const error = {
        message: 'error message',
        response: { status: 400 },
      };
      jest.spyOn(axios, 'post').mockRejectedValueOnce(error);

      const dispatchFn = await invokeAction({
        action: actions.login,
        params: [payload],
        state: initialState,
      });

      expect(dispatchFn).toHaveBeenCalledWith(actions.loginError(error.message));
    });
  });
});
