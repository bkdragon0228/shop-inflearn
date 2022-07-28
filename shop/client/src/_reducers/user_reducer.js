import { LOGIN_USER, REGISTER_USER, AUTH_USER, ADD_TO_CART } from '../_action/types';

export default function reducer(state = {}, action) {
    switch (action.type) {
        case LOGIN_USER:
            return { ...state, loginSuccess: action.payload };

        case REGISTER_USER:
            return { ...state, register: action.payload };

        case AUTH_USER:
            return { ...state, userData: action.payload };

        case ADD_TO_CART:
            return { ...state };

        default:
            return state;
    }
}
