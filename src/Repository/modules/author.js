import { Map } from 'immutable';

const LOAD = 'repository/author/LOAD';
const LOAD_SUCCESS = 'repository/author/LOAD_SUCCESS';
const LOAD_FAIL = 'repository/author/LOAD_FAIL';

const stateSelector = state => state.repository.author;

export function shouldLoad(globalState) {
  const state = stateSelector(globalState);
  return !state.get('data') && !state.get('loading');
}

export const load = () => ({
  type: LOAD,
  payload: {
    request: {
      url: '/users/svrcekmichal'
    }
  }
});

const initState = Map({
  loading: false,
  failed: false,
  data: null
});

export default (previousState = initState, action) => {
  const state = Map(previousState);
  switch(action.type) {
    case LOAD:
      return state.set('loading', true);
    case LOAD_SUCCESS:
      return state.set('loading', false).set('failed', false).set('data', action.payload);
    case LOAD_FAIL:
      return state.set('loading', false).set('failed', true)
  }
  return state;
}
