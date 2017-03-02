// See reducers/alertReducer.js for the matching reducer

//Action for adding alert. type: 'ADD_ALERT' will be used in reducer switch statement.
//text, which is passed into function, will be sent to reducer to create alert in store. 
exports.addAlert = (text) => {
	return {
		type: 'ADD_ALERT',
		text
	}
}

//Action to remove alert. type: 'REMOVE_ALERT' will be used in reducer switch statement.
//id, which is passed into function, will be sent to reducer to find which alert to delete.
exports.removeAlert = (id) => {
	return {
		type: 'REMOVE_ALERT',
		id
	}
}