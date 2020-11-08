import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createBrowserHistory } from 'history';
import App from './App';

const loadApp = async () => {
  const history = createBrowserHistory({ basename: '/' });

  const storeConfiguration = await import('./store/configureStore');
  storeConfiguration.default.configureStore(history);

  ReactDOM.render(
    <React.StrictMode>
      <App history={history} store={storeConfiguration.default.store} />
    </React.StrictMode>,
    document.getElementById('root'),
  );
};

loadApp();
