import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/lib/createBrowserHistory';
import createStore from './redux/createStore';
import reducers from './redux/modules';
import {getRoutes} from './routes';
import {Provider} from 'react-redux';
import {Router, browserHistory } from 'react-router';
import {syncHistory } from 'redux-simple-router'

const store = createStore(browserHistory, window.__data__);
const routes = getRoutes(store);

const mountPoint = document.getElementById('content');

const router = (
  <Router history={browserHistory} routes={routes} />
);

if(__DEVELOPMENT__ && __DEVTOOLS__) { 
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
