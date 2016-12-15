import axios from 'axios';
import Keychain from 'react-native-keychain';

import {GET_PETS_URL, ONE_PET_URL} from '../api';
import {addAlert} from './alertActions';


exports.getPets = (dispatch) => {
	return Keychain.getGenericPassword().then((credentials) => {
		var {username, password} = credentials;
		return axios.get(GET_PETS_URL(username), {
			headers: {authorization: password}
		}).then((response) => {
			dispatch(setPets(response.data));
		}).catch((error) => {
			dispatch(addAlert("Could not retrieve your pets."));
		});
	});
}

exports.deletePet = (pet_id) => {
	return function(dispatch) {
		return Keychain.getGenericPassword().then((credentials) => {
			var {username, password} = credentials;
			return axios.delete(ONE_PET_URL(username, pet_id), {
				headers: {authorization: password}
			}).then((response) => {
				dispatch(removePet(pet_id));
			}).catch((error) => {
				dispatch(addAlert("Could not delete pet."));
			});
		});
	}
}

exports.addPet = (petName, petType) => {
	return function (dispatch) {
		if(petName === '')
			dispatch(addAlert("Pet name is required."));
		else{
			return Keychain.getGenericPassword().then((credentials) => {
				var {username, password} = credentials;
				var config = {headers: {authorization: password}};
				return axios.post(GET_PETS_URL(username),
				{
					petname: petName,
					type: petType
				}, config).then((response) => {
					dispatch(createPet(response.data));
				}).catch((error) => {
					dispatch(addAlert("Could not add pet."));
				});
			});
		}
	}
}

exports.editPet = (pet_id, petName, petType) => {
	return function(dispatch) {
		if(petName === '' || petType === ''){
			dispatch(addAlert("Fields are required."));
		}else{
			return Keychain.getGenericPassword().then((credentials) => {
				var {username, password} = credentials;
				var config = {headers: {authorization: password}};
				return axios.put(ONE_PET_URL(username, pet_id),
				{
					petname: petName,
					type: petType
				}, config).then((response) => {
					dispatch(editPet(response.data, pet_id));
				}).catch((error) => {
					dispatch(addAlert("Could not edit pet."));
				});
			});		
		}
	}
}
export var setPets = (pets) => {
	return {
		type: 'SET_PETS',
		pets
	}
}

var createPet = (newPet) => {
	return{
		type: 'ADD_PET',
		pet: newPet.data
	}
}

var removePet = (pet_id) => {
	return {
		type: 'REMOVE_PET',
		pet_id
	}
}

var editPet = (editPet, pet_id) => {
	return{
		type: 'EDIT_PET',
		pet: editPet.data,
		pet_id: pet_id
	}
}