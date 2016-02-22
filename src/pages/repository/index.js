if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require);

exports.default = {
    getComponents:(location, callback) => {
        require.ensure([], function (require) {
            callback(null, require('./Repo').default)
        })
    },
    getIndexRoute:(location, callback) => {
        require.ensure([], function (require) {
            callback(null, {component:require('./info/RepoInfo').default})
        })
    },
    getChildRoutes:(location, callback) => {
        require.ensure([], (require) => {
            callback(null, [
                page('author',{component:require('./author/RepoAuthor').default}),
                page('contributors',{component:require('./contributors/RepoContributors').default})
            ]);
        });
    }
};

const page = (path, required) => {
    return {...required, path};
};