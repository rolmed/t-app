import { Dispatch } from 'redux';
import { createAction } from 'typesafe-actions';
import axios from 'axios';
import { ThunkResult } from '../types';
import { logOut } from '../login/actions';
import { ServerItem } from '.';

export const fetchServersStart = createAction('@@servers/FETCH_SERVERS_START')();
export const fetchServersSuccess = createAction('@@servers/FETCH_SERVERS_SUCCESS')<ServerItem[]>();
export const fetchServersError = createAction('@@servers/FETCH_SERVERS_ERROR')<
  string | undefined
>();

export const fetchServers = (): ThunkResult => {
  return async (dispatch: Dispatch, getState): Promise<void> => {
    const { authToken } = getState().login;
    dispatch(fetchServersStart());

    try {
      const { data } = await axios.get<ServerItem[]>(`https://playground.tesonet.lt/v1/servers`, {
        headers: {
          Authorization: authToken,
        },
      });

      dispatch(fetchServersSuccess(data));
    } catch (error) {
      if (error.response?.status === 401) {
        dispatch(logOut());
      } else {
        dispatch(fetchServersError(error.message));
      }
    }
  };
};
