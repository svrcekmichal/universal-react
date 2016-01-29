const ADD_RELATIONS = 'global/db/ADD_RELATIONS';

export const addRelations = (payload) => ({
  type:ADD_RELATIONS,
  payload
})

export default function reducer(oldState = {}, action) {
  if(action.type === ADD_RELATIONS) {
    const {payload} = action;
    const state = {...oldState};
    for(let type of Object.keys(payload)) {
      state[type] = state[type] || {};
      for(let id of Object.keys(payload[type])) {
        state[type][id] = payload[type][id];
      }
    }
    return state;
  }
  return oldState;
}
