import React from 'react';
import {connect} from 'react-redux';

import {
	StyleSheet,
	Text,
	View,
	TextInput,
	TouchableOpacity,
	ListView,
	Navigator
} from 'react-native';

import {unauthUser, setPets, getPets, deletePet, editPet} from '../actions';
import NewPet from './NewPet';
import AlertContainer from './alerts/AlertContainer';

var ListViewPet = connect()(React.createClass({
	getInitialState(){
		var ds = this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
		return{
			dataSource: this.ds.cloneWithRows(this.props.pets),
			loading: true,
		}
	},
	componentDidMount(){

		this.setState({loading:true});
		this.props.dispatch(getPets).then(() => {
			this.setState({loading:false});
		});
	},
	componentWillReceiveProps(nextProps){
		this.setState({
			dataSource: this.ds.cloneWithRows(nextProps.pets),
		})
	},
	onLogout(){
		this.props.dispatch(setPets([]));
		this.props.dispatch(unauthUser);
	},
	goPic(){
		this.props.navigator.push({
			id: 'TakePic'
		});
	},
	onDelete(id){
		this.props.dispatch(deletePet(id));
	},
	onEdit(id, name, type){
		this.props.navigator.push({
			id: 'EditPet',
			passProps: {
				pet_id: id,
				petName: name,
				petType: type
			}
		});
	},
	addNewPet(){
		this.props.navigator.push({
			id: 'NewPet'
		});
	},
	renderRow(rowData){
		return(
			<View>
				<View style={styles.petContainer}>
					<View>
						<Text style={styles.petName}> {rowData.petname}</Text>
						<Text> {rowData.type}</Text>
					</View>
					<View style={styles.buttonContainer}>
						<TouchableOpacity onPress={() => this.onDelete(rowData._id)}>
							<Text style={styles.deleteButton}> Delete </Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={() => this.onEdit(rowData._id, rowData.petname, rowData.type)}>
							<Text style={styles.editButton}> Edit </Text>
						</TouchableOpacity>
					</View>
				</View>				
			</View>
		)
	},
	render(){
		if(this.state.loading === true){
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
	renderScene(route, navigator){
		if(this.props.pets.length === 0){
			return(
				<View style={styles.container}>
					<View style={styles.topBar}>
						<TouchableOpacity onPress={this.onLogout}>
							<Text style={styles.button}>
								Logout
							</Text>
						</TouchableOpacity>
						<Text style={styles.title}>
							Your Pets
						</Text>
						<TouchableOpacity onPress={this.addNewPet}>
						<Text style={styles.button}>
							+ Add a Pet
						</Text>
						</TouchableOpacity>
					</View>
				<Text>
					You have no pets saved!
				</Text>
				</View>
			)
		}
		else {
			return(
				<View style={styles.container}>
						<View style={styles.topBar}>
							<TouchableOpacity onPress={this.onLogout}>
								<Text style={styles.button}>
									Logout
								</Text>
							</TouchableOpacity>
							<Text style={styles.title}>
								Your Pets
							</Text>
							<TouchableOpacity onPress={this.addNewPet}>
							<Text style={styles.button}>
								+ Add a Pet
							</Text>
							</TouchableOpacity>
						</View>
						<ListView
							dataSource={this.state.dataSource}
							renderRow={this.renderRow}/>
						<View style={styles.bottomBar}>
							<TouchableOpacity onPress={this.goPic}>
								<Text style={styles.places}>
									Press to take a picture of your pet and save to your camera roll!
								</Text>
							</TouchableOpacity>
						</View>
						<AlertContainer>
						</AlertContainer>
				</View>
			)	
		}
	}
}));
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'stretch',
	},
	petContainer: {
		padding: 16,
		borderTopWidth: 1,
		borderBottomWidth: 1,
		marginTop: -1,
		borderColor: '#ccc',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	topBar: {
		padding: 16,
		paddingTop: 28,
		paddingBottom: 8,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: '#4fc3f7',
	},
	bottomBar:{
		padding: 10,
		paddingBottom: 8,
		paddingTop: 8,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		backgroundColor: '#4fc3f7'
	},
	button: {
		fontSize: 15,
		color: 'white'
	},
	buttonContainer:{
		justifyContent: 'flex-start',
		flexDirection: 'row-reverse'
	},
	deleteButton: {
		fontSize: 16,
		color: 'red',
		padding: 10
	},
	editButton: {
		fontSize: 16,
		color: 'green',
		padding: 10
	},
	petDetails:{
		justifyContent: 'center'
	},
	petName: {
		fontSize: 20,
	},
	title: {
		color: 'white',
		fontSize: 30
	},
	places: {
		color: 'white',
		fontSize: 15,
		justifyContent: 'center',
		textAlign: 'center'
	}
});

var mapStateToProps = (state) => {
	return {
		pets: state.pets
	}
}

module.exports = connect(mapStateToProps)(ListViewPet);