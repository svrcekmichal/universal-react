import { deleteTodo, readTodo } from '../redux';

const deleteTodoRoute = ({ getState, dispatch }) => (req, res) => {
  // validate
  const { id } = req.params;

  // exists?
  if (!readTodo(getState, id)) {
    res.status(404).send();
    return;
  }

  // update
  dispatch(deleteTodo(id));

  // return updated
  const todo = readTodo(getState, id);
  if (todo) {
    res.status(500).send('Something went wrong');
  } else {
    res.status(204).send();
  }
};

export default deleteTodoRoute;
