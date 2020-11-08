import { combineReducers, bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import { useMemo } from 'react';
import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import loginReducer, { LoginState } from './login';

export interface ApplicationState {
  login: LoginState;
  router: RouterState;
}

export const createRootReducer = (history: History) =>
  combineReducers<ApplicationState>({
    router: connectRouter(history),
    login: loginReducer,
  });

// eslint-disable-next-line @typescript-eslint/ban-types
export const useActions = <T extends {}>(actions: T) => {
  const dispatch = useDispatch();
  return useMemo(() => {
    return bindActionCreators(actions, dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
};
