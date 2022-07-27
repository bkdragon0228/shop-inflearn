import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Col, Row, Card } from 'antd';
import { RocketOutlined } from '@ant-design/icons';

import { continents, price } from './Sections/Datas';

import ImageSlider from '../../../utils/ImageSlider';
import CheckBox from './Sections/CheckBox';
import RadioBox from './Sections/RadioBox';
import SearchFeature from './Sections/SearchFeature';

const { Meta } = Card;

const LandingPage = () => {
    const [products, setProducts] = useState([]);

    const [skip, setSkip] = useState(0);
    const [limit, setLimit] = useState(8);
    const [postSize, setPostSize] = useState(0); // 더보기 버튼 관련
    const [Filters, setFilters] = useState({
        continents: [],
        price: [],
    });

    const [searchTerm, setSearchTerm] = useState('');

    const landingProducts = async (body) => {
        try {
            const responce = await axios.post('/api/product/products', body);
            if (body.loadMore) {
                setProducts((prev) => [...prev, ...responce.data.productsInfo]);
            } else {
                setProducts(responce.data.productsInfo);
            }
            setPostSize(responce.data.postSize); // 상품 수
        } catch (err) {
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
        // 총 9개의 상품이 있다고 하고, 처음에 8개 그다음에 1개
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

    const handleFrice = (value) => {
        const data = price;
        let arr = [];

        for (let key in data) {
            if (data[key]._id === parseInt(value, 10)) {
                arr = data[key].array;
            }
        }

        return arr;
    };
    const handleFilters = (filters, category) => {
        const newFilters = { ...Filters }; // state를 바로 수정하지 않기 위해
        newFilters[category] = filters;

        if (category === 'price') {
            let priceValues = handleFrice(filters);
            newFilters[category] = priceValues; // 배열값임
        }

        let body = {
            skip: 0,
            limit: limit,
            filters: newFilters,
        };

        landingProducts(body);
        setFilters(newFilters);
        setSkip(0);
    };

    const updateSearchTerm = (newSearchTerm) => {
        setSearchTerm(newSearchTerm);
    };
    return (
        <div style={{ width: '75%', margin: '3rem auto' }}>
            <div style={{ textAlign: 'center' }}>
                <h2>
                    Let's travel anywhere <RocketOutlined />
                </h2>
            </div>

            <Row gutter={[16, 16]}>
                <Col lg={12} xs={24}>
                    <CheckBox
                        list={continents}
                        handleFilters={(filters) =>
                            handleFilters(filters, 'continent')
                        } // 하위 state를 받아오기위해
                    />
                </Col>
                <Col lg={12} xs={24}>
                    {/* radio box */}
                    <RadioBox
                        list={price}
                        handleFilters={(filters) =>
                            handleFilters(filters, 'price')
                        }
                    />
                </Col>
            </Row>
            {/* 검색 바 */}
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    margin: '1rem auto',
                }}
            >
                <SearchFeature
                    refreshFunction={(searchTerm) =>
                        updateSearchTerm(searchTerm)
                    }
                />
            </div>

            <Row gutter={[16, 16]}>{renderCards}</Row>

            <br />
            {postSize >= limit && (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button onClick={loadMoreHandler}>더보기</button>
                </div>
            )}
        </div>
    );
};

export default LandingPage;
