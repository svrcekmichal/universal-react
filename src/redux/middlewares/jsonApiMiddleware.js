import {addData, addError} from 'redux/modules/db';

export default ({dispatch}) => next => action => {
  const {type, payload, error, meta} = action;

  if(!meta || !meta.jsonApi) {
    return next(action);
  }

  if(error) {
    dispatch(addError(error));
  } else if(payload) {
    dispatch(addData(payload.data));
  }

  return next(action);
}
