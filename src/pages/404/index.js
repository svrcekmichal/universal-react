if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require);

exports.default = {
    getComponent:(location, callback) => {
        require.ensure([], function (require) {
            callback(null, require('./404').default)
        })
    }
};
