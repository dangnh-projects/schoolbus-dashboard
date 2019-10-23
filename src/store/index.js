/* Global window */
import { applyMiddleware, createStore, compose } from 'redux';
import createSaga from 'redux-saga';
import saga from './saga';
import reducer from './reducer';
import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const sagaMiddleware = createSaga();

const persistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'v0.0.1:',
};

const persistedReducer = persistReducer(persistConfig, reducer);

export default function configureStore(initialState) {
  const reduxDevToolsCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__; // eslint-disable-line no-underscore-dangle
  const composeEnhancers = reduxDevToolsCompose || compose;
  const enhancer = composeEnhancers(applyMiddleware(logger, sagaMiddleware));
  const store = createStore(persistedReducer, initialState, enhancer);
  sagaMiddleware.run(saga);
  let persistor = persistStore(store);
  return { store, persistor };
}
