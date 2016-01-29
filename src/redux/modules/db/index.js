import {combineReducers} from 'redux';
import entities from './entities';
import relations from './relations';

export default combineReducers({
  entities,
  relations
})
