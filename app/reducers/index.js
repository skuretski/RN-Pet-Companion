import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';

import authReducer from './authReducer';
import alertReducer from './alertReducer';
import petsReducer from './petsReducer';

module.exports = combineReducers({
	form: formReducer,
	auth: authReducer,
	alerts: alertReducer,
	pets: petsReducer
});