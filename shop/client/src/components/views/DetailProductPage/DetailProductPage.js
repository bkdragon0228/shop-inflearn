import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import styled from 'styled-components';
import ProductImage from './Sections/ProductImage';
import ProductInfo from './Sections/ProductInfo';

import { Row, Col } from 'antd';

const DetailProductContainer = styled.div`
    width: 100%;
    padding: 3rem 4rem;
`;

const detailProductHeader = styled.header`
    display: flex;
    justify-content: center;
`;
const DetailProductPage = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState({});

    const getDetailProduct = async () => {
        try {
            // const response = await axios.get(`/api/product/products_by_id?id=${productId}&type=single`);
            // 쿼리와 파라미터를 섞은 uri, 파라미터는 주로 고유한 값에 사용
            const response = await axios.get(`/api/product/products_by_id/${productId}?type=single`);
            setProduct(response.data.productInfo[0]);
        } catch (err) {
            alert('상세 정보 가져오기를 실패했습니다.');
        }
    };
    useEffect(() => {
        getDetailProduct();
    }, []);

    return (
        <DetailProductContainer>
            <detailProductHeader style={{ display: 'flex', justifyContent: 'center' }}>
                <h2>{product.title}</h2>
            </detailProductHeader>
            <br />

            <Row gutter={[16, 16]}>
                <Col lg={12} sm={24}>
                    {/* 상품 이미지 */}
                    <ProductImage />
                </Col>
                <Col lg={12} sm={24}>
                    {/* 상품정보 */}
                    <ProductInfo />
                </Col>
            </Row>
        </DetailProductContainer>
    );
};

export default DetailProductPage;
