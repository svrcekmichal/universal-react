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
import http from 'http';
import createMemoryHistory from 'history/lib/createMemoryHistory';
import { match, RouterContext } from 'react-router';
import { Provider } from 'react-redux';
import { getRoutes } from 'routes';
import { resolveOnServer } from 'reasync';
import { syncHistoryWithStore } from 'react-router-redux';
import createClient from 'utils/createClient';
import api from './api';

// const pretty = new PrettyError();
const app = new Express();
const server = new http.Server(app);

app.use(compression());
app.use(cookieParser());

app.use(favicon(path.join('dist', 'favicon.ico')));
app.use('/assets', Express.static(path.join('dist', 'assets'), { maxAge: '200d' }));

app.use('/api', api); // you can safely remove this, and whole api folder if you don't need api

app.use((req, res) => { // eslint-disable-line consistent-return
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

  const hydrateOnClient = (status = 200) => {
    const html = ReactDOM.renderToString(
      <Html assets={webpackIsomorphicTools.assets()} store={store} />
    );
    res.status(status).send(`<!doctype html>\n${html}`);
  };

  if (__DISABLE_SSR__) {
    return hydrateOnClient();
  }

  function render(renderProps) {
    const component = (
      <Provider store={store} key="provider">
        <RouterContext {...renderProps} />
      </Provider>
    );
    const html = ReactDOM.renderToString(
      <Html assets={webpackIsomorphicTools.assets()} component={component} store={store} head={config.tags} />
    );
    return res.status(200).send(`<!doctype html>\n${html}`);
  }

  match({ history, routes, location: req.originalUrl }, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      return res.redirect(redirectLocation.pathname + redirectLocation.search);
    }

    if (error) {
      console.error('ROUTER ERROR:', error);
      return hydrateOnClient(500);
    }

    if (renderProps) {
      return resolveOnServer(renderProps, store)
        .then(() => render(renderProps))
        .catch((e) => {
          console.error(e);
          hydrateOnClient();
        });
    }

    return hydrateOnClient(404);
  });
});

server.listen(config.port, (err) => {
  if (err) {
    console.error(err);
  }
  console.info(`==> 💻  Open http://${config.host}:${config.port} in a browser to view the app.`);
});
