//Boilerplate from 
//https://github.com/alex-paterson/todolist-auth-complete/blob/master/app/actions/authActions.js

//Axios is a promise based HTTP request library for React Native
import axios from 'axios';
//Keychain will store user ID and authentication token for us (does not use session)
import Keychain from 'react-native-keychain';

import {SIGNIN_URL, SIGNUP_URL} from '../api';

// {addAlert} is used to inform user of any errors
import {addAlert} from './alertActions';

exports.userLogin = (email, password) => {
	return function(dispatch) {
		//HTTP POST request to SIGNIN_URL
		return axios.post(SIGNIN_URL,
			//Params: email and password 
			{email: email, password: password}).then((response) => {
			//Response from server will have user ID and token (JWT strategy)
			var {user_id, token} = response.data;
			//Setting user ID and token into Keychain - 'Generic Password' is token, not user password
			Keychain.setGenericPassword(user_id, token)
				.then(function(){
					// On success of Keychain, dispatches action of authenticated user. This will put user_id
					// into store for future use. 
					// See below and reducers/authReducer.js
					dispatch(authUser(user_id));
					// On failture of Keychain, adds alert of error
				}).catch((error) => {
					console.log(error);
					dispatch(addAlert("Error logging in."));
				});
			//On failure of POST signin
			}).catch((error) => {
				console.log(error);
				dispatch(addAlert("Could not log in. Invalid user email and/or password."));
		});
	}
}

exports.userSignup = (email, password) => {
	return function(dispatch){
		//POST call to SIGNUP_URL
		return axios.post(SIGNUP_URL, {email, password}).then((response) => {
			//Response from server will have user ID and token (JWT strategy)
			var {user_id, token} = response.data;
			//Setting user ID and token into Keychain - 'Generic Password' is token, not user password
			Keychain.setGenericPassword(user_id, token)
				.then(function(){
					// On success of Keychain, dispatches action of authenticated user. This will put user_id
					// into store for future use. 
					// See below and reducers/authReducer.js
					dispatch(authUser(user_id));
				}).catch((error) => {
					// On failture of Keychain, adds alert of error
					dispatch(addAlert("Error signing up."));
				});
		//On failure of POST signup
		}).catch((error) => {
			console.log(error);
			dispatch(addAlert("Could not sign up. Email already taken."));
		});
	}
}
//Action sent to reducers/authReducer.js
authUser = (user_id) => {
	return {
		type: 'AUTH_USER',		
		user_id					
	}
}

exports.unauthUser = {
	type: 'UNAUTH_USER'
}