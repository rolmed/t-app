import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import styled, { ThemeProvider } from 'styled-components';
import { History } from 'history';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { ApplicationState } from './store';
import Routes from './router';
import theme from './styles/theme';

const StyledWrapper = styled.div`
  min-height: 100vh;
  background-color: ${(props) => props.theme.colors.background};
  align-items: center;
  display: flex;
  * {
    box-sizing: border-box;
  }
`;

interface OwnProps {
  history: History;
  store: Store<ApplicationState>;
}

const App = ({ history, store }: OwnProps) => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme()}>
        <StyledWrapper>
          <ConnectedRouter history={history} key={history.location.pathname}>
            <Routes />
          </ConnectedRouter>
        </StyledWrapper>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
