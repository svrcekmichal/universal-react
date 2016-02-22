if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require);

exports.default = {
    getIndexRoute:(location, callback) => {
        require.ensure([], function (require) {
            callback(null, {component:require('./index/DelayedPage').default})
        })
    },
    getChildRoutes:(location, callback) => {
        require.ensure([], (require) => {
            callback(null, [
                page('with-fetch',{component:require('./with-fetch/DelayedWithFetch.jsx').default})
            ]);
        });
    }
};

const page = (path, required) => {
    return {...required, path};
};