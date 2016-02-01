const ADD_ENTITY = 'global/db/ADD_ENTITY';

export default function reducer (oldState = {}, action) {
  if(action.type === ADD_ENTITY) {
    const state = {...oldState};
    const {payload} = action;
    for(let type of Object.keys(payload)) {
      state[type] = state[type] || {};
      for(let id of Object.keys(payload[type])) {
        state[type][id] = payload[type][id];
      }
    }
    return state;
  }
  return oldState;
};

export const addEntity = (payload) => ({
  type:ADD_ENTITY,
  payload
})

const mergeDataToState = (oldState, payload) => {

}
