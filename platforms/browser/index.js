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

const render = (component) => () => ReactDOM.render(
  <Provider store={store} key="provider">
    {component}
  </Provider>,
  mountPoint
);

let componentToRender;
if (showDevTools) {
  const DevTools = require('./DevTools').default;
  componentToRender = (
    <div>
      {router}
      <DevTools />
    </div>
  );
} else {
  componentToRender = router;
}

const { pathname, search, hash } = window.location;
const location = `${pathname}${search}${hash}`;
match({ routes, history, location }, render(componentToRender));
