//Boilerplate from https://github.com/alex-paterson/todolist-auth-complete/blob/master/app/reducers/alertsReducer.js
//See actions/alertActions.js for corresponding actions.
import uuid from 'uuid';

//Declaring the default state as null
var defaultState = [];

//Reducer to handle actions of adding and removing alert
module.exports = (state=defaultState, action) => {
	switch(action.type){
		case 'ADD_ALERT':
			return [
				//Returning current state
				...state,
				//Adding alert object with id generated from UUID and text
				{
					text: action.text,
					id: uuid.v4()
				}
			];
		case 'REMOVE_ALERT':
			//Finding the alert by ID
			return state.filter((alert) => {
				//If found
				if(alert.id === action.id){
					//Return alert as false (it is removed)
					return false;
				} else {
					//If no match is found, return true (state is the same as before) 
					return true;
				}
			});
		default:
			return state;
	}
}