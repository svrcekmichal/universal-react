// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require);

import App from './App';

const route = (path,required) => ({...required,path});

export const getRoutes = (store) => ({
  path: '/',
  component: App,
  getChildRoutes(location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        route('repo',require('./repository1/routes').getRoutes()),
        route('*',{ component: require('./NotFound404/NotFound404').default })
      ]);
    });
  },
  getIndexRoute(location,cb) {
    require.ensure([], (require) => {
      cb(null, { component: require('./homepage1/Homepage').default });
    });
  }
});
