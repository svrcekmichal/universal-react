import { createTodo, readTodo } from '../redux';

const createTodoRoute = ({ getState, dispatch }) => (req, res) => {
  // validate
  const { text } = req.body;
  if (!text || !text.trim || !text.trim()) {
    res.status(400).send(400);
    return;
  }

  // create
  const action = createTodo(text);
  dispatch(action);

  // return created
  const todo = readTodo(getState, action.payload.id);
  if (todo) {
    res.send(JSON.stringify(todo));
  } else {
    res.status(500).send('Something went wrong');
  }
};

export default createTodoRoute;
