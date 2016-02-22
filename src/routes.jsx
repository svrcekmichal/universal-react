import React from 'react';
import App from 'containers/App';

if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require);

const module = (path, required) => {
  return {...required, path};
};

export const getRoutes = () => ({
  path: '/',
  component: App,
  getChildRoutes: (location, callback) => {
    require.ensure([], (require) => {
      callback(null, [
        module('repo', require('pages/repository').default),
        module('*', require('pages/404').default)
      ]);
    });
  },
  getIndexRoute: (location, callback) => {
    require.ensure([], function (require) {
      callback(null, {component: require('pages/homepage/Homepage').default})
    })
  }
});



