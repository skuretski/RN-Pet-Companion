// Taken from https://github.com/alex-paterson/todolist-auth-complete/blob/master/app/components/alerts/Alert.js

import React from 'react';
import {connect} from 'react-redux';
import{
	StyleSheet,
	Text,
	View,
	TouchableWithoutFeedback
} from 'react-native';

import {removeAlert} from '../../actions';


//Creating a single Alert component
var Alert = React.createClass({
	//When removing an alert is warranted
	onRemoveAlert(){
		//Getting the current props
		var {dispatch, alert} = this.props;
		//Calling our dispatch action of removeAlert (see alertReducer.js)
		dispatch(removeAlert(alert.id));	//passing in the alert ID to find the correct alert
	},
	//This will render ONE alert
	//In {this.props.alert.text.toString()}, toString() was needed; otherwise error resulted due to
	//attempting to render an object instead of text.
	render(){
		return (
			<TouchableWithoutFeedback onPress={this.onRemoveAlert}>
				<View style={styles.container}>
					<Text style={styles.text}>
						{this.props.alert.text.toString()}	
					</Text>
				</View>
			</TouchableWithoutFeedback>
		);
	}
});

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		padding: 16,
		backgroundColor: '#f2dede',
		borderColor: 'red',
		borderTopWidth: 2
	},
	text: {
		color: 'white'
	}
});

//Exporting alert componenent and connecting to store
module.exports = connect()(Alert);