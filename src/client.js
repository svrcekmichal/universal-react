import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/lib/createBrowserHistory';
import createStore from './redux/createStore';
import reducers from './redux/modules';
import {getRoutes} from './routes';
import {Provider} from 'react-redux';
import {Router, browserHistory } from 'react-router';
import {AsyncHandler} from 'react-simple-async';
import {syncHistoryWithStore} from 'react-router-redux'

const store = createStore(browserHistory, window.__data__);
const history = syncHistoryWithStore(browserHistory, store);
const routes = getRoutes(store);

const mountPoint = document.getElementById('content');

const custom = {
    dispatch:store.dispatch,
    getState:store.getState
};

const router = (
  <Router history={history} routes={routes} render={(props) => <AsyncHandler custom={custom} {...props}/>} />
);

history.listenBefore((location,callback) => {
    console.log('new location', location);
    setTimeout(() => {
        callback();
    },1000);
});

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
