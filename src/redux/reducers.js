import {combineReducers} from 'redux';
import {routerReducer as routing} from 'react-router-redux'
import {reducer as form} from 'redux-form';

import repo from 'pages/repository/redux';

export default combineReducers({
    form,
    routing,
    repo
})