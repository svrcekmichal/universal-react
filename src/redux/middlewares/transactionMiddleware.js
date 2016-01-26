import {UPDATE_LOCATION} from 'redux-simple-router';

export default ({getState, dispatch}) => next => action => {
  if(!action.type == 'UPDATE_LOCATION') {
    return next(action);
  }








  return next(action);
}
