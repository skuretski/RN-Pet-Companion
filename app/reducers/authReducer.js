//Boilerplate from https://github.com/alex-paterson/todolist-auth-complete/blob/master/app/reducers/authReducer.js

//Default state for authentication: no user is defined
var defaultState = {
	user_id: undefined
}

//Switch statement for reducer
module.exports = (state=defaultState, action) => {
	switch(action.type){
		//If action is 'AUTH_USER'
		case 'AUTH_USER':
			return {
				//user_id (in store) is set to the action.user_id (sent from action - see actions/authActions.js)
				user_id: action.user_id
			}
		// If unauthorized user
		case 'UNAUTH_USER':
			return{
				//User ID is undefined
				user_id: undefined
			};
		default:
			return state;
	}
}