import React from 'react';
import { mount } from 'enzyme';
import { bindActionCreators, DeepPartial } from 'redux';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { ApplicationState, useActions } from './store';
import theme from './styles/theme';

const mockStore = configureStore<ApplicationState>([thunk]);

// eslint-disable-next-line import/prefer-default-export
export const mountWithStoreAndTheme = (
  children: JSX.Element,
  initialState?: DeepPartial<ApplicationState>,
) => {
  const store = mockStore({ ...(initialState || {}) } as ApplicationState);

  // eslint-disable-next-line
  const actualStore = require('./store') as { useActions: typeof useActions };
  // eslint-disable-next-line @typescript-eslint/ban-types
  jest.spyOn(actualStore, 'useActions').mockImplementation(<T extends {}>(actions: T) => {
    return React.useMemo(() => {
      return bindActionCreators(actions, store.dispatch);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [store.dispatch]);
  });

  const component = mount(
    <ThemeProvider theme={theme()}>
      <Provider store={store}>{children}</Provider>
    </ThemeProvider>,
  ).childAt(0);

  return {
    component,
    store,
  };
};

export const invokeAction = async ({
  action,
  params = [],
  state = undefined,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action: any;
  params?: Parameters<typeof action>;
  state?: DeepPartial<ApplicationState>;
}) => {
  const dispatchFn = jest.fn();
  const stateFn = jest.fn().mockReturnValue(state);

  await action(...params)(dispatchFn, stateFn, undefined);

  return dispatchFn;
};
