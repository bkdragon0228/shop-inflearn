import React from 'react';
import { Descriptions, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../../_action/user_action';
const ProductInfo = ({ detail }) => {
    const dispatch = useDispatch();
    const clickHandler = () => {
        // 필요한 정보를 cart 필드에 넣어준다.
        // cart필드는 user 컬렉션 안에 있음으로 리덕스(유저를 store에서 관리했으니)action 함수를 이용한다.

        dispatch(addToCart(detail._id)).then((res) => {
            if (res.payload.success) {
                alert('장바구니에 추가되었습니다.');
            } else {
                alert('장바구니에 추가하지 못했습니다.');
            }
        });
    };
    return (
        <div>
            <Descriptions title="product Info" bordered>
                <Descriptions.Item label="Price">
                    {detail.price}
                </Descriptions.Item>
                <Descriptions.Item label="Sold">
                    {detail.sold}
                </Descriptions.Item>
                <Descriptions.Item label="View ">
                    {detail.views}
                </Descriptions.Item>
                <Descriptions.Item label="Description">
                    {detail.description}
                </Descriptions.Item>
            </Descriptions>

            <br />
            <br />

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                    size="large"
                    shape="round"
                    type="danger"
                    onClick={clickHandler}
                >
                    Add to Cart
                </Button>
            </div>
        </div>
    );
};

export default ProductInfo;
