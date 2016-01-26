import { createStore as _createStore, applyMiddleware, compose } from 'redux';
import customMiddlewares from './middlewares';
import reducers from './modules';
import {syncHistory} from 'redux-simple-router'

export default function createStore(history, data) {

  const reduxRouterMiddleware = syncHistory(history);
  const middleware = [reduxRouterMiddleware].concat(customMiddlewares);
  if (__CLIENT__) {
    // middleware.push(createLogger({ collapsed: true }));
  }

  let finalCreateStore;
  if (__DEVELOPMENT__ && __CLIENT__ && __DEVTOOLS__) {
    const { persistState } = require('redux-devtools');
    const DevTools = require('../containers/DevTools/DevTools').default;
    finalCreateStore = compose(
      applyMiddleware(...middleware),
      window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument(),
      persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
    )(_createStore);
  } else {
    finalCreateStore = applyMiddleware(...middleware)(_createStore);
  }

  const store = finalCreateStore(reducers, data);
  reduxRouterMiddleware.listenForReplays(store);

  if(__DEVELOPMENT__ && module.hot) {
    module.hot.accept('./modules', () => {
      store.replaceReducer(require('./modules').default);
    });
  }

  return store;
}
