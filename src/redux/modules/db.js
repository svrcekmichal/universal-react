const ADD_DATA = 'global/db/ADD_DATA';
const ADD_ERROR = 'global/db/ADD_ERROR';

export const addData = (payload) => ({
  type:ADD_DATA,
  payload
})

export const addError = (payload) => ({
  type:ADD_ERROR,
  payload
})


export default function reducer (state = {}, action) {
  switch(action.type) {
    case ADD_DATA: return addDataHandler(state, action.payload);
    case ADD_ERROR: return addErrorHandler(state,action.error);
  }
  return state;
};

const addDataHandler = (state, payload) => {
  const data = mergePayload(payload);
  return mergeDataToState(state,data);
}

const mergePayload = (payload) => {
  let {data = [],include = []} = payload;

  if(!Array.isArray(data)) {
    data = [data];
  }

  return data.concat(include);
}

const mergeDataToState = (oldState, data) => {
  const state = {...oldState};

  for(let entity of data) {
    const {id,type} = entity;
    if(state[type] === undefined) {
        state[type] = {};
    }

    state[type][id] = entity;
  }
  return state;
}


const addErrorHandler = (state,error) => {
  console.log(error);
  return state;
}
