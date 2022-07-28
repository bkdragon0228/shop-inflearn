import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCartItems } from '../../../_action/user_action';

const CartPage = ({ user }) => {
    // hoc, auth에서 다 넘겨주는 중

    const dispatch = useDispatch();
    useEffect(() => {
        let cartItemIds = [];
        // 카트에 담긴 상품이있다면
        if (user.userData && user.userData.cart) {
            if (user.userData.cart.length > 0) {
                user.userData.cart.forEach((item) => {
                    cartItemIds.push(item.id);
                });

                dispatch(getCartItems(cartItemIds, user.userData.cart));
            }
        }
    }, []);
    return <div>CartPage</div>;
};

export default CartPage;
