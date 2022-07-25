import React, { useEffect } from 'react';
import axios from 'axios';

const LandingPage = () => {
    const landingProducts = async () => {
        try {
            const responce = await axios.post('/api/product/products');
            const data = responce.data;
            console.log(data);
        } catch (err) {
            alert('상품을 가져오는데 실패했습니다.');
        }
    };
    useEffect(() => {
        landingProducts();
    }, []);
    return <div>LandingPage</div>;
};

export default LandingPage;
