import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import { routerReducer as routing } from 'react-router-redux';

export default combineReducers({
  form,
  routing
});
