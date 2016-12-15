import React from 'react';
import axios from 'axios';
import {reduxForm} from 'redux-form';
import{
	StyleSheet,
	TouchableOpacity,
	Text,
	View,
	TextInput,
	Navigator
} from 'react-native';

import {userLogin, userSignup, addAlert} from '../actions';
import AlertContainer from './alerts/AlertContainer';

var Login = React.createClass({
	getInitialState: function(){
		return{
			loading: false
		}
	},
	onSignin: function(){
		var {dispatch, fields: {email, password}} = this.props;
		this.setState({
			loading: true
		});
		dispatch(userLogin(email.value, password.value)).then(() => {
			this.setState({
				loading: false
			});
		});
	},
	onSignup: function(){
		var {dispatch, fields: {email, password}} = this.props;
		this.setState({
			loading: true
		});
		dispatch(userSignup(email.value, password.value)).then(() => {
			this.setState({
				loading: false
			});
		});
	},
	render() {
		if(this.state.loading){
			return (
				<View style={{
					flex: 1,
					justifyContent: 'center',
					alignItems: 'center' 
				}}>
					<Text> Loading page... </Text>
				</View>
			)
		}
		else {
			return(
				<Navigator
					renderScene={this.renderScene}
				/>	
			);
		}
	},
	renderScene(route,navigator){
		var {fields: {email,password}} = this.props;
		var renderError = (field) => {
			if(field.touched && field.error){
				return(
					<Text style={styles.formError}>{field.error}</Text>
				)
			}
		} 
		return (
			<View style={styles.container}>
				<View style={styles.titleContainer}>
					<Text style={styles.title}>
						Pet Companion
					</Text>
					</View>
				 <View style={styles.field}>
					<TextInput
						{...email} placeholder="Email" style={styles.textInput}/>
					<View>{renderError(email)}</View>
				</View>
				<View style={styles.field}>
					<TextInput
						{...password} placeholder="Password" secureTextEntry={true} style={styles.textInput}/>
					<View>{renderError(password)}</View>
				</View>					
				<View style={styles.buttonContainer}>
					<TouchableOpacity onPress={this.onSignin}>
						<Text style={styles.button}>
							Sign In
						</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={this.onSignup}>
						<Text style={styles.button}>
							Sign Up
						</Text>
					</TouchableOpacity>
				</View>
				<AlertContainer>
				</AlertContainer>
			</View>
		);
	}	
});

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'stretch',
		paddingTop: 20,
		backgroundColor: '#4fc3f7'
	},
	titleContainer: {
		padding: 10
	},
	title: {
		color: 'white',
		marginTop: 20,
		fontSize: 35,
		marginBottom: 20
	},
	field: {
		borderRadius: 5,
		padding: 5,
		paddingLeft: 8,
		margin: 7,
		marginTop: 0,
		backgroundColor: 'white'
	},
	textInput: {
		flex: 1,
		height: 50,
		backgroundColor: 'white'
	},
	buttonContainer: {
		padding: 20,
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center'
	},
	button: {
		fontSize: 30,
		color: 'white'
	},
	formError: {
		color: 'red'
	}
});

var validateEmail = (email) => {
	var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return regex.test(email);
}
var validate = (formProps) => {
	var errors = {};	
	if(!formProps.email){
		errors.email = "Please enter an email address.";
	}
	if(formProps.email && !validateEmail(formProps.email))
		errors.email = "Please enter a valid email address.";

	if(!formProps.password){
		errors.password = "Please enter a password.";
	}
	return errors;
}

module.exports = reduxForm({
	form: 'login',
	fields: ['email', 'password'],
	validate: validate
}, null, null)(Login);