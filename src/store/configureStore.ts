import { Store, createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension';
import { History } from 'history';
import thunk from 'redux-thunk';
import { ApplicationState, createRootReducer } from './';

class StoreConfiguration {
  private storeInstance?: Store<ApplicationState>;

  get store(): Store<ApplicationState> {
    if (!this.storeInstance) {
      throw new Error('Cannot get Store Instance, because store has not been configured.');
    }

    return this.storeInstance;
  }

  configureStore(history: History) {
    const composeEnhancers = composeWithDevTools({ trace: true });

    this.storeInstance = createStore(
      createRootReducer(history),
      undefined,
      composeEnhancers(applyMiddleware(routerMiddleware(history), thunk)),
    );
  }
}

export default new StoreConfiguration();
