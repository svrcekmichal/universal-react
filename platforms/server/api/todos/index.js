import express from 'express';

import createTodo from './routes/createTodo';
import readTodo from './routes/readTodo';
import readTodos from './routes/readTodos';
import updateTodo from './routes/updateTodo';
import deleteTodo from './routes/deleteTodo';

const routes = (store) => {
  const app = express();
  app.get('/', readTodos(store));
  app.get('/:id', readTodo(store));
  app.post('/', createTodo(store));
  app.put('/:id', updateTodo(store));
  app.delete('/:id', deleteTodo(store));
  return app;
};

export default routes;
