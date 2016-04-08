import {combineReducers} from 'redux';

import base from './base';
import author from './author';
import contributors from './contributors';

export default combineReducers({
  base,
  author,
  contributors
})
