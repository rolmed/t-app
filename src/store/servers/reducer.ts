import { Reducer } from 'redux';
import { getType } from 'typesafe-actions';
import { ServersState } from './types';
import { actions, ServersActions } from '.';
import { actions as loginActions, LoginActions } from '../login';

const initialState: ServersState = {
  servers: [],
  fetchingServers: false,
  serversError: undefined,
};

const reducer: Reducer<ServersState> = (
  state = initialState,
  action: ServersActions | LoginActions,
) => {
  switch (action.type) {
    case getType(actions.fetchServersStart): {
      const newState = { ...state, fetchingServers: true };
      return newState;
    }
    case getType(actions.fetchServersSuccess): {
      const newState = { servers: action.payload, fetchingServers: false, serversError: undefined };
      return newState;
    }
    case getType(actions.fetchServersError): {
      const newState = { ...state, fetchingServers: false, serversError: action.payload };
      return newState;
    }
    case getType(loginActions.logOut): {
      return initialState;
    }
    default:
      return state;
  }
};

export default reducer;
