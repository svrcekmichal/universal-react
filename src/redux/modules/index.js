import {combineReducers} from 'redux';

import {routeReducer as routing} from 'redux-simple-router'
import {reducer as form} from 'redux-form';

import auth from './auth';
import db from './db';

export default combineReducers({
  auth,
  db,
  form,
  routing
})
