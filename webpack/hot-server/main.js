import Express from 'express';
import webpack from 'webpack';
import webpackDev from 'webpack-dev-middleware';
import webpackHot from 'webpack-hot-middleware';

import webpackConfig from './../dev.config';
import config from './../../platforms/shared/config';
const { host, hotPort: port } = config;

const compiler = webpack(webpackConfig);

const serverOptions = {
  contentBase: `http://${host}:${port}`,
  quiet: true,
  noInfo: true,
  hot: true,
  inline: true,
  lazy: false,
  publicPath: webpackConfig.output.publicPath,
  headers: { 'Access-Control-Allow-Origin': '*' },
  stats: { colors: true }
};

const app = new Express;

app.use(webpackDev(compiler, serverOptions));
app.use(webpackHot(compiler));

app.listen(port, () => {
  console.log(`Hot server started at port ${port}`);
});
