import { LOGIN_USER, REGISTER_USER, AUTH_USER, ADD_TO_CART, GET_CART_ITEMS } from '../_action/types';

export default function reducer(state = {}, action) {
    switch (action.type) {
        case LOGIN_USER:
            return { ...state, loginSuccess: action.payload };

        case REGISTER_USER:
            return { ...state, register: action.payload };

        case AUTH_USER:
            return { ...state, userData: action.payload };

        case ADD_TO_CART:
            return { ...state, userData: { ...state.userData, cart: action.payload } };
        // 형태가 조금 바뀐 이후는 서버에서 보내는 데이터를 cart정보만 보냈으니  원래 데이터에 추가하는 형태가된것.

        case GET_CART_ITEMS:
            return { ...state };

        default:
            return state;
    }
}
