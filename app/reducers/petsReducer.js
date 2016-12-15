module.exports = (state=[], action) => {
	switch(action.type){
		case 'REMOVE_PET':
			return state.filter((pet) => {
				if(pet._id === action.pet_id){
					return false;
				} else{
					return true;
				}
			});
		case 'ADD_PET':
			return [
				...state,
				{
					petname: action.pet.petname,
					type: action.pet.type,
					_id: action.pet._id
				}
			];
		case 'SET_PETS':
			return action.pets;
		case 'EDIT_PET':
			return state.map((pet) => {
				if(pet._id === action.pet_id){
					return Object.assign({}, pet, {
						petname: action.pet.petname,
						type: action.pet.type,
						_id: action.pet._id
					});
				}
				return pet;
			});
		default:
			return state;
	}
}