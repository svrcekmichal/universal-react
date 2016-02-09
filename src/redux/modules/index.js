import {combineReducers} from 'redux';

import {routeReducer as routing} from 'react-router-redux'
import {reducer as form} from 'redux-form';

import db from './db';

export default combineReducers({
  db,
  form,
  routing
})
