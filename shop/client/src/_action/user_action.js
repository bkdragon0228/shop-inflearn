import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    ADD_TO_CART,
    GET_CART_ITEMS,
    REMOVE_CART_ITEM,
    ON_SUCCESS_BUY,
} from './types';

export function loginUser(dataToSubmit) {
    // 서버에서 받은 데이터를 저장
    const request = axios
        .post('/api/users/login', dataToSubmit)
        .then((res) => res.data);

    // reducer에 넘겨줄 객체
    return {
        type: LOGIN_USER,
        payload: request,
    };
}

export function registerUser(dataToSubmit) {
    const request = axios
        .post('/api/users/register', dataToSubmit)
        .then((res) => res.data);

    return {
        type: REGISTER_USER,
        payload: request,
    };
}

export function auth() {
    const request = axios.get('/api/users/auth').then((res) => res.data);

    return {
        type: AUTH_USER,
        payload: request,
    };
}

export function addToCart(id) {
    let body = {
        productId: id,
    };
    const request = axios
        .post('/api/users/addToCart', body)
        .then((res) => res.data);

    return {
        type: ADD_TO_CART,
        payload: request,
    };
}

export function getCartItems(cartIds, userCart) {
    const request = axios
        .get(`/api/product/products_by_id/${cartIds}?type=array`)
        .then((res) => {
            // cart의 담은 상품 정보를 product 콜렉션에서 가져온 후 quantity정보를 넣어준다.

            userCart.forEach((cartItem) => {
                res.data.forEach((productDetail, index) => {
                    if (cartItem.id === productDetail._id) {
                        res.data[index].quantity = cartItem.quantity; // res에 원래 없던 quantity정보를 추가
                    }
                });
            });

            return res.data;
        });

    return {
        type: GET_CART_ITEMS,
        payload: request,
    };
}

export function removeCartItem(productId) {
    const responce = axios
        .get(`/api/users/removeFromCart/${productId}`)
        .then((res) => {
            // productInfo, cart 정보를 조합해 cartDetail을 새로 만든다.

            res.data.cart.forEach((item) => {
                res.data.productInfo.forEach((product, index) => {
                    if (item.id === product._id) {
                        res.data.productInfo[index].quantity = item.quantity;
                    }
                });
            });
            return res.data;
        });

    return {
        type: REMOVE_CART_ITEM,
        payload: responce,
    };
}

export function onSuccessBuy(data) {
    const responce = axios
        .post(`/api/users/successBuy`, data)
        .then((res) => res.data);

    return {
        type: ON_SUCCESS_BUY,
        payload: responce,
    };
}
