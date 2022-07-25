import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Col, Row, Card } from 'antd';
import {
    RocketOutlined,
    EditOutlined,
    EllipsisOutlined,
    SettingOutlined,
} from '@ant-design/icons';

const { Meta } = Card;

const LandingPage = () => {
    const [products, setProducts] = useState([]);

    const landingProducts = async () => {
        const responce = await axios.post('/api/product/products');
        const data = responce.data;
        setProducts(data.productsInfo);
    };

    useEffect(() => {
        landingProducts();
    }, []);

    const renderCards = products.map((product, index) => {
        return (
            <Col lg={6} md={8} xs={24} key={index}>
                <Card
                    cover={
                        <img
                            style={{ width: '100%', maxHeight: '150px' }}
                            src={`http://localhost:5000/${product.images[0]}`}
                        />
                    }
                    actions={[
                        <SettingOutlined key="setting" />,
                        <EditOutlined key="edit" />,
                        <EllipsisOutlined key="ellipsis" />,
                    ]}
                >
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
                <button>더보기</button>
            </div>
        </div>
    );
};

export default LandingPage;
