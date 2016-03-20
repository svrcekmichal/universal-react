import { createStore as _createStore, applyMiddleware, compose } from 'redux';
import reducers from 'reducers';

import axiosMiddleware from 'redux-axios-middleware';
import { routerMiddleware } from 'react-router-redux';

export default function (history, data = undefined, client) {
  let devTools = [];
  if (__DEVELOPMENT__ && __CLIENT__ && __DEVTOOLS__) {
    const { persistState } = require('redux-devtools');
    const DevTools = require('browser/DevTools').default;
    devTools = [
      window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument(),
      persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
    ];
  }

  const store = _createStore(
    reducers,
    data,
    compose(
      applyMiddleware(
        routerMiddleware(history),
        axiosMiddleware(client)
      ),
      ...devTools
    )
  );

  if (__DEVELOPMENT__ && module.hot) {
    module.hot.accept('reducers', () => {
      store.replaceReducer(require('reducers').default);
    });
  }

  return store;
}
