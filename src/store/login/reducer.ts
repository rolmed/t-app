/* eslint-disable default-case, no-param-reassign */
import { Reducer } from 'redux';
import { getType } from 'typesafe-actions';
import { LoginState } from './types';
import { actions, LoginActions } from '.';
import LocalStorageService from '../../services/local-storage-service';

const initialState: LoginState = {
  authToken: LocalStorageService.getAuthToken(),
  loggingIn: false,
  loginError: undefined,
};

const reducer: Reducer<LoginState> = (state = initialState, action: LoginActions) => {
  switch (action.type) {
    case getType(actions.loginStart): {
      const newState = { ...state, loggingIn: true };
      return newState;
    }
    case getType(actions.loginSuccess): {
      const newState = {
        loggingIn: false,
        loginError: undefined,
        authToken: action.payload,
      };
      return newState;
    }
    case getType(actions.loginError): {
      const newState = { ...state, loggingIn: false, loginError: action.payload };
      return newState;
    }
    case getType(actions.logOut): {
      const newState = { ...state, authToken: undefined };
      return newState;
    }
    default:
      return state;
  }
};

export default reducer;
