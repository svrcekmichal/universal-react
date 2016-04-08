// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require);

const route = (path,required) => ({...required,path});

export const getRoutes = (store) => ({
  path: '/',
  component: require('./App').default,
  getChildRoutes(location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        route('repo',require('./repository/routes').getRoutes()),
        route('*',{ component: require('./special/NotFound404').default })
      ]);
    });
  },
  getIndexRoute(location,cb) {
    require.ensure([], (require) => {
      cb(null, { component: require('./homapage/Homepage').default });
    });
  }
});
