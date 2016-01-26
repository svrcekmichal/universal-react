import Express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import config from './../config';
import favicon from 'serve-favicon';
import compression from 'compression';
import path from 'path';
import createStore from './../redux/createStore';
import reducers from './../redux/modules';
import Html from './Html';
import Promise from 'bluebird';
import http from 'http';
import createHistory from 'history/lib/createMemoryHistory';
import {match, RouterContext} from 'react-router';
import {Provider} from 'react-redux';
import {getRoutes} from 'routes';
import {createInitialState as createAuthInitialState} from './../redux/modules/auth';
import {getDataDependencies} from 'utils/fetching';


// const pretty = new PrettyError();
const app = new Express();
const server = new http.Server(app);

app.use(compression());

app.use(favicon(path.join('dist', 'favicon.ico')));
app.use('/assets', Express.static(path.join('dist','assets'), {maxAge: '200d'}));

app.use((req, res) => {
  if (__DEVELOPMENT__) {
    // Do not cache webpack stats: the script file would change since
    // hot module replacement is enabled in the development env
    webpackIsomorphicTools.refresh();
  }

  const history = createHistory();
  const store = createStore(history, {
    auth:createAuthInitialState(req.query && req.query.i9)
  });
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
        Promise.all(getDataDependencies(renderProps.components)(store,renderProps.location, renderProps.params))
          .then(() => Promise.all(getDataDependencies(renderProps.components, true)(store,renderProps.location, renderProps.params)))
          .then(render.bind(this,renderProps))
          .catch((e) => {
            console.error(e);
            hydrateOnClient();
          });
    } else {
      console.error(err);
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
