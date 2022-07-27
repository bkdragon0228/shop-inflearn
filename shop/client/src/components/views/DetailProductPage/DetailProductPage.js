import axios from 'axios';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const DetailProductPage = () => {
    const { productId } = useParams();

    const getDetailProduct = async () => {
        try {
            // const response = await axios.get(`/api/product/products_by_id?id=${productId}&type=single`);
            // 쿼리와 파라미터를 섞은 uri, 파라미터는 주로 고유한 값에 사용
            const response = await axios.get(`/api/product/products_by_id/${productId}?type=single`);
            console.log(response.data);
        } catch (err) {
            alert('상세 정보 가져오기를 실패했습니다.');
        }
    };
    useEffect(() => {
        getDetailProduct();
    }, []);

    return <div>DetailProductPage</div>;
};

export default DetailProductPage;
