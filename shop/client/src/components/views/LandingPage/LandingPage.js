import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Col, Row, Card, Carousel } from 'antd';
import {
    RocketOutlined,
    EditOutlined,
    EllipsisOutlined,
    SettingOutlined,
} from '@ant-design/icons';

import ImageSlider from '../../../utils/ImageSlider';

const { Meta } = Card;

const LandingPage = () => {
    const [products, setProducts] = useState([]);

    const [skip, setSkip] = useState(0);
    const [limit, setLimit] = useState(8);

    const landingProducts = async (body) => {
        const responce = await axios.post('/api/product/products', body);

        if (responce.data.success) {
            if (body.loadMore) {
                setProducts((prev) => [...prev, ...responce.data.productsInfo]);
            } else {
                setProducts(responce.data.productsInfo);
            }
        } else {
            alert('상품을 가져오는데 실패했습니다.');
        }
    };

    useEffect(() => {
        let body = {
            skip: skip,
            limit: limit,
        };
        landingProducts(body);
    }, []);

    const loadMoreHandler = () => {
        let newSkip = skip + limit;
        let body = {
            skip: newSkip,
            limit: limit,
            loadMore: true,
        };
        landingProducts(body);
        setSkip(newSkip);
    };

    const renderCards = products.map((product, index) => {
        return (
            <Col lg={6} md={8} xs={24} key={index}>
                <Card cover={<ImageSlider images={product.images} />}>
                    <Meta
                        title={product.title}
                        description={`$${product.price}`}
                    />
                </Card>
            </Col>
        );
    });

    return (
        <div style={{ width: '75%', margin: '3rem auto' }}>
            <div style={{ textAlign: 'center' }}>
                <h2>
                    Let's travel anywhere <RocketOutlined />
                </h2>
            </div>

            <Row gutter={[16, 16]}>{renderCards}</Row>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button onClick={loadMoreHandler}>더보기</button>
            </div>
        </div>
    );
};

export default LandingPage;
