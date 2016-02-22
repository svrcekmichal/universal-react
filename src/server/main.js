import Express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import config from './../config';
import favicon from 'serve-favicon';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import path from 'path';
import createStore from './../redux/createStore';
import Html from './Html';
import Promise from 'bluebird';
import http from 'http';
import createMemoryHistory from 'history/lib/createMemoryHistory';
import {match, RouterContext} from 'react-router';
import {Provider} from 'react-redux';
import {getRoutes} from 'routes';
import {resolveOnServer} from 'reasync';
import {syncHistoryWithStore} from 'react-router-redux'
import createClient from 'utils/createClient';

// const pretty = new PrettyError();
const app = new Express();
const server = new http.Server(app);

app.use(compression());
app.use(cookieParser());

app.use(favicon(path.join('dist', 'favicon.ico')));
app.use('/assets', Express.static(path.join('dist','assets'), {maxAge: '200d'}));

app.use((req, res) => {
  if (__DEVELOPMENT__) {
    // Do not cache webpack stats: the script file would change since
    // hot module replacement is enabled in the development env
    webpackIsomorphicTools.refresh();
  }

  const client = createClient(req.cookies);
  const memoryHistory = createMemoryHistory(req.originalUrl);
  const store = createStore(memoryHistory, undefined, client);
  const history = syncHistoryWithStore(memoryHistory, store);
  const routes = getRoutes(store);

  if (__DISABLE_SSR__) {
    return hydrateOnClient();
  }

  function hydrateOnClient() {
    res.send('<!doctype html>\n' +
      ReactDOM.renderToString(<Html assets={webpackIsomorphicTools.assets()} store={store}/>));
  }

  function render(renderProps) {
    const component = (
      <Provider store={store} key="provider">
        <RouterContext {...renderProps} />
      </Provider>
    );
    res.status(200).send('<!doctype html>\n' +
      ReactDOM.renderToString(<Html assets={webpackIsomorphicTools.assets()} component={component} store={store} head={config.tags} />));
      console.log('send');
  }

  match({history,routes,location:req.originalUrl},(error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      res.redirect(redirectLocation.pathname + redirectLocation.search);
    } else if (error) {
      console.error('ROUTER ERROR:', error);
      res.status(500);
      hydrateOnClient();
    } else if(renderProps) {
      resolveOnServer(renderProps,store).then(
          render.bind(this,renderProps),
          (e) => {
            console.error(e);
            hydrateOnClient();
          }
      )
    } else {
      console.error(error);
      res.status(404);
      hydrateOnClient();
    }
  })
});

server.listen(config.port, (err) => {
  if (err) {
    console.error(err);
  }
  console.info(`==> 💻  Open http://${config.host}:${config.port} in a browser to view the app.`);
});
