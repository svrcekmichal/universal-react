import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/lib/createBrowserHistory';
import createStore from './redux/createStore';
import {getRoutes} from './routes';
import {Provider} from 'react-redux';
import {Router, browserHistory } from 'react-router';
import {resolveOnClient} from 'reasync';
import {syncHistoryWithStore} from 'react-router-redux'
import createClient from 'utils/createClient';

const store = createStore(browserHistory, window.__data__, createClient());
const history = syncHistoryWithStore(browserHistory, store);
const routes = getRoutes(store);

const mountPoint = document.getElementById('content');

resolveOnClient(history, routes, store);
const router = (<Router history={history} routes={routes} />);

const hasDevToolsExtension = () => typeof window === 'object'
  && typeof window.devToolsExtension !== 'undefined';

if(__DEVELOPMENT__ && __DEVTOOLS__ && !hasDevToolsExtension()) {
  const DevTools = require('./containers/DevTools/DevTools').default;
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
