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
                // store가 업데이트됐다. cartDetail정보가 추가되었음.
                // 다시 설명하면 cartDetail은 db에 저장되어있던 product정보에
                // user 컬렉션에 저장되어있는 quantity(담은 개수)  정보를 포함한 정보이다.
            }
        }
    }, [user.userData]);
    return <div>CartPage</div>;
};

export default CartPage;
