import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
    getCartItems,
    removeCartItem,
    onSuccessBuy,
} from '../../../_action/user_action';
import UserCardBlock from './Sections/UserCardBlock';
import styled from 'styled-components';
import Paypal from '../../../utils/Paypal';

import { ShoppingCartOutlined } from '@ant-design/icons';
import { Button, Result } from 'antd';

const CartPageContainer = styled.div`
    width: 85%;
    margin: 3rem auto;
`;

const ShoppingCartIcon = styled(ShoppingCartOutlined)`
    font-size: 200px;
`;
const CartPage = ({ user }) => {
    // hoc, auth에서 다 넘겨주는 중

    const [totalPrice, setTotalPrice] = useState(0);
    const [ShowTotal, setShowTotal] = useState(false);

    const [showSuccess, setShowSuccess] = useState(false);

    const dispatch = useDispatch();
    useEffect(() => {
        let cartItemIds = [];
        // 카트에 담긴 상품이있다면
        if (user.userData && user.userData.cart) {
            if (user.userData.cart.length > 0) {
                user.userData.cart.forEach((item) => {
                    cartItemIds.push(item.id);
                });

                // store가 업데이트됐다. cartDetail정보가 추가되었음.
                // 다시 설명하면 cartDetail은 db에 저장되어있던 product정보에
                // user 컬렉션에 저장되어있는 quantity(담은 개수) 정보를 포함한 정보이다.
                dispatch(getCartItems(cartItemIds, user.userData.cart)).then(
                    (res) => {
                        calculateTotal(res.payload);
                    }
                );
            }
        }
    }, [user.userData]);

    // 가격 합 구하기
    let calculateTotal = (cartDetail) => {
        let total = cartDetail.reduce(
            (acc, cur) => acc + +cur.price * +cur.quantity,
            0
        );
        setTotalPrice(total);
        setShowTotal(true);
    };

    let removeFromCart = (productId) => {
        dispatch(removeCartItem(productId)).then((res) => {
            if (res.payload.productInfo.length <= 0) {
                setShowTotal(false);
            }
        });
    };

    const transactionSuccess = (data) => {
        dispatch(
            onSuccessBuy({
                paymentData: data,
                cartDetail: user.cartDetail,
            })
        ).then((res) => {
            if (res.payload.success) {
                setShowTotal(false);
                setShowSuccess(true);
            } else {
            }
        });
    };
    return (
        <CartPageContainer>
            <h1>My Cart</h1>
            <div>
                <UserCardBlock
                    products={user.cartDetail}
                    removeItem={removeFromCart}
                />
            </div>

            {ShowTotal ? (
                <div style={{ marginTop: '3rem' }}>
                    <h2>Total : Amount : {totalPrice}</h2>
                </div>
            ) : showSuccess ? (
                <Result
                    status="success"
                    title="Successfully Purchased Cloud Items"
                />
            ) : (
                <div
                    style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: '20px',
                    }}
                >
                    <ShoppingCartIcon />
                </div>
            )}

            {ShowTotal && (
                <Paypal total={totalPrice} onSuccess={transactionSuccess} />
            )}
        </CartPageContainer>
    );
};

export default CartPage;
