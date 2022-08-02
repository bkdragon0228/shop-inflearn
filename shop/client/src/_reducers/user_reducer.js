import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    ADD_TO_CART,
    GET_CART_ITEMS,
    REMOVE_CART_ITEM,
    ON_SUCCESS_BUY,
} from '../_action/types';

export default function reducer(state = {}, action) {
    switch (action.type) {
        case LOGIN_USER:
            return { ...state, loginSuccess: action.payload };

        case REGISTER_USER:
            return { ...state, register: action.payload };

        case AUTH_USER:
            return { ...state, userData: action.payload };

        case ADD_TO_CART:
            return {
                ...state,
                userData: { ...state.userData, cart: action.payload }, // add_to_cart는 cart 정보만 업데이트되는 작업!
            };

        case GET_CART_ITEMS:
            return { ...state, cartDetail: action.payload }; // 상품정보에 quantity를 추가한 정보를 cartDetail 이라는곳에 저장

        case REMOVE_CART_ITEM:
            return {
                ...state,
                cartDetail: action.payload.productInfo,
                userData: { ...state.userData, cart: action.payload.cart }, // cartDetail과 userData를 동시에 수정하는 작업!
            };

        case ON_SUCCESS_BUY:
            return {
                ...state,
                cartDetail: action.payload.cartDetail,
                userData: {
                    ...state.userData,
                    cart: action.payload.cart,
                },
            };

        default:
            return state;
    }
}
