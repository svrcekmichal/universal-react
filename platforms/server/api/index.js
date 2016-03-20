import { createStore } from 'redux';
import reducer from './todos/redux';
import express from 'express';
import todos from './todos';
import bodyParser from 'body-parser';
import { readFileSync, writeFile } from 'jsonfile';

const app = express();
const file = `${__dirname}/tmp/store.json`;
let oldState;
try {
  oldState = readFileSync(file);
} catch (e) {
  console.log('File store.json is invalid json or not found. Creating new.');
  oldState = {};
}

const store = createStore(reducer, oldState);

store.subscribe(() => writeFile(file, store.getState(), (err) => err && console.error('Error writeFile:', err)));

app.use(bodyParser.json());
app.use('/todos', todos(store));
app.on('mount', () => {
  console.log('Api is available at %s', app.mountpath);
});

export default app;
