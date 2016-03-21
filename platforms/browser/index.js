import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory, match } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import { getRoutes } from 'routes';
import createStore from 'shared/createStore';
import createClient from 'shared/createClient';
import { createClientResolver } from 'shared/reasync';

const store = createStore(browserHistory, window.__data__, createClient());
const history = syncHistoryWithStore(browserHistory, store);
const routes = getRoutes(store);
const mountPoint = document.getElementById('content');
const router = (<Router history={history} routes={routes} />);
createClientResolver(history, routes, store);

const hasDevToolsExtension = () => typeof window === 'object'
&& typeof window.devToolsExtension !== 'undefined';

const showDevTools = __DEVELOPMENT__ && __DEVTOOLS__ && !hasDevToolsExtension();

const { pathname, search, hash } = window.location;
const location = `${pathname}${search}${hash}`;
match({ routes, history, location }, () => { // to preload all components needed and not break server markup
  if (showDevTools && !hasDevToolsExtension()) {
    const DevTools = require('./DevTools').default;
    ReactDOM.render(
      <Provider store={store} key="provider">
        <div>
          {router}
          <DevTools />
        </div>
      </Provider>,
      mountPoint
    );
  } else {
    ReactDOM.render(
      <Provider store={store} key="provider">
        {router}
      </Provider>,
      mountPoint
    );
  }
});
