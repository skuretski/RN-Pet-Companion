var api = 'http://52.33.68.0:3030/api';

exports.SIGNIN_URL = `${api}/signin`;
exports.SIGNUP_URL = `${api}/signup`;
exports.GET_PETS_URL= (user_id) => `${api}/users/${user_id}/pets`;
exports.ONE_PET_URL= (user_id, pet_id) => `${api}/users/${user_id}/pets/${pet_id}`;