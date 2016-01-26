import {createClient} from 'utils/fetching';

export default ({dispatch, getState}) => {
  const client = createClient({dispatch,getState});
  return next => action => {

    if (typeof action === 'function') {
      return action(dispatch, getState);
    }

    const { payload, types, ...rest } = action; // eslint-disable-line no-redeclare
    if (!payload || !payload.promise || !action.meta || !action.meta.client) {
      return next(action);
    }

    const [REQUEST, SUCCESS, FAILURE] = types;
    next({...rest, type: REQUEST});
    return payload.promise(client).then(
      (payload) => next({...rest, payload, type: SUCCESS}),
      (error) =>  next({...rest, error, type: FAILURE})
    ).catch((error)=> {
      console.error('MIDDLEWARE ERROR:', error);
      return next({...rest, error, type: FAILURE});
    });
  };
}
