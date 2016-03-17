import { v4 } from 'uuid';

const CREATE_TODO = '@api/CREATE_TODO';
const UPDATE_TODO = '@api/UPDATE_TODO';
const DELETE_TODO = '@api/DELETE_TODO';

export const createTodo = (text) => ({
  type: CREATE_TODO,
  payload: {
    id: v4(),
    text
  }
});

export const updateTodo = (id, text) => ({
  type: UPDATE_TODO,
  payload: {
    id,
    text
  }
});

export const deleteTodo = (id) => ({
  type: DELETE_TODO,
  payload: id
});

export const readTodo = (getState, id) => {
  const state = getState();
  for (const i in state) {
    if (!state.hasOwnProperty(i)) continue;
    if (state[i].id === id) {
      return state[i];
    }
  }
  return null;
};

export const readTodos = (getState) => getState();

const initialState = [{
  id: v4(),
  text: 'Learn how to live more reactive :D'
}, {
  id: v4(),
  text: 'Try to learn something about Elm finally'
}, {
  id: v4(),
  text: 'Make awesome dinner to my lovely fiance <3'
}];

export default function (state = initialState, action) {
  switch (action.type) {
    case CREATE_TODO:
      const newState = state.concat();
      newState.push(action.payload);
      return newState;
    case UPDATE_TODO:
      return state.map((todo) => {
        if (todo.id === action.payload.id) {
          return (action.payload);
        }
        return todo;
      });
    case DELETE_TODO:
      return state.filter((todo) => todo.id !== action.payload);
    default:
      return state;
  }
}
