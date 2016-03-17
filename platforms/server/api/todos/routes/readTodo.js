import { readTodo } from '../redux';

const readTodoRoute = ({ getState }) => (req, res) => {
  const todo = readTodo(getState, req.params.id);
  if (todo) {
    res.send(JSON.stringify(todo));
  } else {
    res.status(404).send();
  }
};

export default readTodoRoute;
