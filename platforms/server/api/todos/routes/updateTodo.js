import { updateTodo, readTodo } from '../redux';

const updateTodoRoute = ({ getState, dispatch }) => (req, res) => {
  // validate
  const { text } = req.body;
  const { id } = req.params;
  if (!text || !text.trim || !text.trim()) {
    res.status(400).send('Empty text not allowed');
    return;
  }

  // exists?
  if (!readTodo(getState, id)) {
    res.status(404).send();
    return;
  }

  // update
  dispatch(updateTodo(id, text));

  // return updated
  const todo = readTodo(getState, id);
  if (todo) {
    res.send(JSON.stringify(todo));
  } else {
    res.status(500).send('Something went wrong');
  }
};

export default updateTodoRoute;
