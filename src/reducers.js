import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as form } from 'redux-form';

import { reducer as repo } from 'Repository/redux';

export default combineReducers({
  form,
  routing,
  repo
});
