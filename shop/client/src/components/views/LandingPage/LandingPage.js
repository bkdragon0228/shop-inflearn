import React, { useEffect } from 'react';
import axios from 'axios';

const LandingPage = () => {
    useEffect(() => {
        // 상품 필터링을 위해 post로
        axios.post('/api/product/products').then((res) => {
            if (res.data.success) {
                console.log(res.data.productsInfo);
            } else {
                alert('상품을 가져오는데 실패했습니다.');
            }
        });
    }, []);
    return <div>LandingPage</div>;
};

export default LandingPage;
