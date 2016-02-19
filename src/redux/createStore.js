import { createStore as _createStore, applyMiddleware, compose } from 'redux';
import reducers from './modules';

import {routerMiddleware} from 'react-router-redux'
import jsonApiMiddleware from './middlewares/jsonApiMiddleware';
import axiosMiddleware from 'redux-axios-middleware';

export default function createStore(history, data = undefined, client) {

  let devTools = [];
  if(__DEVELOPMENT__ && __CLIENT__ && __DEVTOOLS__) {
    const { persistState } = require('redux-devtools');
    const DevTools = require('../containers/DevTools/DevTools').default;
    devTools = [
      window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument(),
      persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
    ]
  }

  const store = _createStore(
      reducers,
      data,
      compose(
          applyMiddleware(
              routerMiddleware(history),
              axiosMiddleware({client}),
              jsonApiMiddleware
          ),
          ...devTools
      )

  );

  if(__DEVELOPMENT__ && module.hot) {
    module.hot.accept('./modules', () => {
      store.replaceReducer(require('./modules').default);
    });
  }

  return store;
}
