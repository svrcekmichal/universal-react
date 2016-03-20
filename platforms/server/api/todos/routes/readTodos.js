import { readTodos } from '../redux';

const readTodosRoute = ({ getState }) => (req, res) => {
  res.send(JSON.stringify(readTodos(getState)));
};

export default readTodosRoute;
