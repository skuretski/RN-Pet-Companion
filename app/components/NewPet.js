import React from 'react';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	ScrollView,
	RefreshControl,
	TextInput,
	Navigator
} from 'react-native';

import {addPet, addAlert} from '../actions';
import AlertContainer from './alerts/AlertContainer';

var NewPet = React.createClass({
	getInitialState(){
		return {
			loading: false,
			petAdded: false
		}
	},
	addNewPet(){
		var {dispatch, fields: {petName, petType}} = this.props;
		if(petName.value === '' || petName.value === null || petName.value === undefined){
			dispatch(addAlert("Pet name is required."));
			this.setState({loading:false});
			this.setState({petAdded:false});
		}
		if(petType.value === '' || petType.value === null || petType.value === undefined){
			dispatch(addAlert("Pet type is required."));
			this.setState({loading:false});
			this.setState({petAdded: false});
		}	
		else{
			this.setState({loading:true});
			dispatch(addPet(petName.value, petType.value)).then(() => {
				this.setState({loading:false});
				this.setState({petAdded: true});
			});
		}
	},
	onBack(){
		this.props.navigator.pop();
	},
	render(){
		return(
			<Navigator
				renderScene={this.renderScene}
			/>
		);
	},
	renderScene(route,navigator){
		var {fields: {petName, petType}} = this.props;
		var renderError = (field) => {
			if(field.touched && field.error){
				return(
					<Text style={styles.formError}>{field.error}</Text>
				)
			}
		} 
		var renderScrollView = () => {
			if(this.state.loading){
				return (
					<View style={{flex:1, justifyContent:'center', alignItems: 'center'}}>
						<Text>
							Adding pet...
						</Text>
					</View>
				);
			}
		}
		var renderPetStatus = () => {
			if(this.state.petAdded){
				return(
					<View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
						<Text>
							Pet added!
						</Text>
					</View>
				);
			}
		}
		return (
			<View style={styles.container}>
				<View style={styles.topBar}>
					<TouchableOpacity onPress={this.onBack}>
						<Text> Back </Text>
					</TouchableOpacity>
					<Text style={styles.title}>
						Add a New Pet
					</Text>
				</View>
					<View style={styles.field}>
						<TextInput
							{...petName} placeholder="Pet Name" style={styles.textInput}/>
						<View>{renderError(petName)}</View>
					</View>
					<View style={styles.field}>
						<TextInput
							{...petType} placeholder="Pet Type" style={styles.textInput}/>
						<View>{renderError(petType)}</View>
					</View>					
					<View style={styles.buttonContainer}>
						<TouchableOpacity onPress={this.addNewPet}>
							<Text style={styles.button}> Add Now </Text>
						</TouchableOpacity>
					</View>
				{renderScrollView()}
				{renderPetStatus()}
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
	},
	topBar: {
		padding: 16,
		paddingTop: 28,
		paddingBottom: 8,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: '#4fc3f7'
	},
	title: {
		color: 'white',
		fontSize: 20
	},
	inputContainer: {
		padding: 5,
		paddingLeft: 10,
		margin: 10,
		borderWidth: 2,
		borderRadius: 10,
		borderColor: '#4fc3f7'
	},
	buttonContainer: {
		padding: 20,
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center'
	},
	button: {
		fontSize: 20
	},
	input: {
		height: 26
	},
	formError: {
		color: 'red'
	}
});

var validate = (formProps) => {
	var errors = {};
	if(!formProps.petName){
		errors.petName = "A pet name is required.";
	}
	if(!formProps.petType){
		errors.petType = "A pet type is required (i.e. Canine or Feline).";
	}
	return errors;
}

module.exports = reduxForm({
	form: 'newPet',
	fields: ['petName', 'petType'],
	validate: validate
}, null, null)(NewPet);