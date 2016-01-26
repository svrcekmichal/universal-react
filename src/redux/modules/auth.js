export const createInitialState = (i9) => {
  return {i9:i9 || null};
}

export default function reducer(state = createInitialState(), action) {
  return state;
}
